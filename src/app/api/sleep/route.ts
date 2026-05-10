import { NextResponse, type NextRequest } from "next/server";
import { revalidatePath } from "next/cache";
import { env } from "~/env";

import { prisma } from "~/lib/utils";
import {
  serializeMergedSleepIntervals,
  startOfUtcDay,
  endOfUtcDay,
  addDaysUtc,
} from "~/lib/sleep";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    let from = searchParams.get("from");
    let to = searchParams.get("to");

    if (!from || !to) {
      const now = new Date();
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

    return Response.json({ intervals: serializeMergedSleepIntervals(intervals) });
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
    payload = await request.json();
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

  const parsedStart = new Date(startedAt);
  const parsedEnd = new Date(endedAt);

  if (isNaN(parsedStart.getTime()) || isNaN(parsedEnd.getTime())) {
    return new NextResponse("Invalid date format", { status: 400 });
  }

  if (parsedEnd <= parsedStart) {
    return new NextResponse("endedAt must be after startedAt", { status: 400 });
  }

  const existing = await prisma.sleepInterval.findUnique({
    where: { startedAt: parsedStart },
  });

  const interval = await prisma.sleepInterval.upsert({
    where: { startedAt: parsedStart },
    create: {
      startedAt: parsedStart,
      endedAt: parsedEnd,
    },
    update: {
      endedAt: parsedEnd,
    },
  });

  revalidatePath("/sleep");
  revalidatePath("/api/sleep");

  return Response.json(interval, { status: existing ? 200 : 201 });
}
