import type { SleepInterval } from "@prisma/client";

export type SleepIntervalRow = Pick<SleepInterval, "id" | "startedAt" | "endedAt">;

export type SerializedSleepInterval = {
  id: string;
  startedAt: string;
  endedAt: string;
};

export function mergeSleepIntervals(intervals: SleepIntervalRow[]) {
  if (intervals.length === 0) return [];

  const sorted = [...intervals].sort(
    (a, b) =>
      a.startedAt.getTime() - b.startedAt.getTime() ||
      a.endedAt.getTime() - b.endedAt.getTime(),
  );

  const merged: SleepIntervalRow[] = [];

  for (const interval of sorted) {
    const last = merged.at(-1);

    if (!last || interval.startedAt.getTime() > last.endedAt.getTime()) {
      merged.push({ ...interval });
      continue;
    }

    if (interval.endedAt.getTime() > last.endedAt.getTime()) {
      last.endedAt = interval.endedAt;
    }
  }

  return merged;
}

export function serializeMergedSleepIntervals(intervals: SleepIntervalRow[]) {
  return mergeSleepIntervals(intervals)
    .reverse()
    .map((interval) => ({
      id: interval.id,
      startedAt: interval.startedAt.toISOString(),
      endedAt: interval.endedAt.toISOString(),
    }));
}
