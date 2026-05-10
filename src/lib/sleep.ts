import type { SleepInterval } from "@prisma/client";

export type SleepIntervalRow = Pick<SleepInterval, "id" | "startedAt" | "endedAt">;

export type SerializedSleepInterval = {
  id: string;
  startedAt: string;
  endedAt: string;
};

export const DEFAULT_SLEEP_DAY_START_HOUR_UTC = 18;

export function addDaysUtc(d: Date, days: number) {
  const result = new Date(d);
  result.setUTCDate(result.getUTCDate() + days);
  return result;
}

export function startOfUtcDay(d: Date) {
  const result = new Date(d);
  result.setUTCHours(0, 0, 0, 0);
  return result;
}

export function endOfUtcDay(d: Date) {
  const result = new Date(d);
  result.setUTCHours(23, 59, 59, 999);
  return result;
}

export function startOfSleepDayUtc(
  d: Date,
  offsetHours: number = DEFAULT_SLEEP_DAY_START_HOUR_UTC,
) {
  const result = new Date(d);
  if (result.getUTCHours() >= offsetHours) {
    result.setUTCHours(offsetHours, 0, 0, 0);
  } else {
    result.setUTCHours(offsetHours, 0, 0, 0);
    result.setUTCDate(result.getUTCDate() - 1);
  }
  return result;
}

export function endOfSleepDayUtc(
  d: Date,
  offsetHours: number = DEFAULT_SLEEP_DAY_START_HOUR_UTC,
) {
  return addDaysUtc(startOfSleepDayUtc(d, offsetHours), 1);
}

export function formatTimeUtc(d: Date) {
  return new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
    timeZone: "UTC",
  }).format(d);
}

export function formatDateShortUtc(d: Date) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  }).format(d);
}

export function formatDuration(ms: number) {
  const totalMin = Math.round(ms / 60000);
  const h = Math.floor(totalMin / 60);
  const m = totalMin % 60;
  if (h === 0) return `${m}m`;
  if (m === 0) return `${h}h`;
  return `${h}h ${m}m`;
}

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
