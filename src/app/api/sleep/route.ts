import { NextResponse, type NextRequest } from "next/server";
import { revalidatePath } from "next/cache";
import type { SleepInterval } from "@prisma/client";
import { env } from "~/env";

import { prisma } from "~/lib/utils";
import {
  serializeMergedSleepIntervals,
  startOfUtcDay,
  endOfUtcDay,
  addDaysUtc,
  nowUtcWallClock,
} from "~/lib/sleep";

function parseFloatingDateTime(value: string) {
  const match = /^(\d{4})-(\d{2})-(\d{2})[T ](\d{2}):(\d{2}):(\d{2})(?:\.\d+)?(?:Z|[+-]\d{2}:?\d{2})?$/.exec(
    value,
  );

  if (!match) return new Date(NaN);

  const [, year, month, day, hour, minute, second] = match;
  return new Date(
    Date.UTC(
      Number(year),
      Number(month) - 1,
      Number(day),
      Number(hour),
      Number(minute),
      Number(second),
    ),
  );
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    let from = searchParams.get("from");
    let to = searchParams.get("to");

    if (!from || !to) {
      const now = nowUtcWallClock();
      const sevenDaysAgo = addDaysUtc(now, -6);
      from = startOfUtcDay(sevenDaysAgo).toISOString();
      to = endOfUtcDay(now).toISOString();
    }

    const fromDate = new Date(from);
    const toDate = new Date(to);

    if (isNaN(fromDate.getTime()) || isNaN(toDate.getTime())) {
      return Response.json({ error: "Invalid date format" }, { status: 400 });
    }

    const intervals = await prisma.sleepInterval.findMany({
      where: {
        startedAt: { lte: toDate },
        endedAt: { gte: fromDate },
      },
      orderBy: { startedAt: "desc" },
    });

    return Response.json({
      intervals: serializeMergedSleepIntervals(intervals),
    });
  } catch {
    return Response.json(
      { error: "Failed to fetch sleep intervals" },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  let payload: { startedAt?: string; endedAt?: string; secret?: string } = {};

  try {
    const rawPayload: unknown = await request.json();
    if (!rawPayload || typeof rawPayload !== "object") {
      return new NextResponse("Invalid JSON body", { status: 400 });
    }
    payload = rawPayload as typeof payload;
  } catch {
    return new NextResponse("Invalid JSON body", { status: 400 });
  }

  const { secret, startedAt, endedAt } = payload;

  if (secret !== env.SECRET) {
    return new NextResponse(`Nope!`, {
      status: 401,
    });
  }

  if (!startedAt || !endedAt) {
    return new NextResponse("Missing required fields: startedAt, endedAt", {
      status: 400,
    });
  }

  const parsedStart = parseFloatingDateTime(startedAt);
  const parsedEnd = parseFloatingDateTime(endedAt);

  if (isNaN(parsedStart.getTime()) || isNaN(parsedEnd.getTime())) {
    return new NextResponse("Invalid date format", { status: 400 });
  }

  if (parsedEnd <= parsedStart) {
    return new NextResponse("endedAt must be after startedAt", { status: 400 });
  }

  // Find any intervals that overlap with the incoming one.
  const overlapping = await prisma.sleepInterval.findMany({
    where: {
      startedAt: { lte: parsedEnd },
      endedAt: { gte: parsedStart },
    },
  });

  let interval: SleepInterval;

  if (overlapping.length === 0) {
    interval = await prisma.sleepInterval.create({
      data: { startedAt: parsedStart, endedAt: parsedEnd },
    });
  } else {
    const allStarts = [parsedStart, ...overlapping.map((i) => i.startedAt)];
    const allEnds = [parsedEnd, ...overlapping.map((i) => i.endedAt)];
    const mergedStart = new Date(Math.min(...allStarts.map((d) => d.getTime())));
    const mergedEnd = new Date(Math.max(...allEnds.map((d) => d.getTime())));

    const [, created] = await prisma.$transaction([
      prisma.sleepInterval.deleteMany({
        where: { id: { in: overlapping.map((i) => i.id) } },
      }),
      prisma.sleepInterval.create({
        data: { startedAt: mergedStart, endedAt: mergedEnd },
      }),
    ]);

    interval = created;
  }

  revalidatePath("/sleep");
  revalidatePath("/api/sleep");

  return Response.json(interval, { status: 200 });
}
