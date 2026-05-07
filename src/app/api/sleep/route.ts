import { NextResponse, type NextRequest } from "next/server";
import { revalidatePath } from "next/cache";
import { env } from "~/env";

import { prisma } from "~/lib/utils";
import { serializeMergedSleepIntervals } from "~/lib/sleep";

function startOfDay(d: Date) {
  const result = new Date(d);
  result.setHours(0, 0, 0, 0);
  return result;
}

function endOfDay(d: Date) {
  const result = new Date(d);
  result.setHours(23, 59, 59, 999);
  return result;
}

function addDays(d: Date, days: number) {
  const result = new Date(d);
  result.setDate(result.getDate() + days);
  return result;
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    let from = searchParams.get("from");
    let to = searchParams.get("to");

    if (!from || !to) {
      const now = new Date();
      const sevenDaysAgo = addDays(now, -6);
      from = startOfDay(sevenDaysAgo).toISOString();
      to = endOfDay(now).toISOString();
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
  const formData = await request.formData();

  const secret = formData.get("secret");

  if ((secret as string) !== env.SECRET) {
    return new NextResponse(`Nope!`, {
      status: 401,
    });
  }

  const startedAt = formData.get("startedAt") as string | null;
  const endedAt = formData.get("endedAt") as string | null;

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
