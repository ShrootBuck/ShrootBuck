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

export function toUtcWallClock(d: Date) {
  return new Date(
    Date.UTC(
      d.getFullYear(),
      d.getMonth(),
      d.getDate(),
      d.getHours(),
      d.getMinutes(),
      d.getSeconds(),
      d.getMilliseconds(),
    ),
  );
}

export function nowUtcWallClock() {
  return toUtcWallClock(new Date());
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

/** Merge strictly overlapping intervals. Gaps are kept as-is. */
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

const DAY_MS = 86_400_000;
const HOUR_MS = 3_600_000;
const MINUTES_PER_DAY = 1_440;
const MIN_SLEEP_MS = 2 * HOUR_MS;
const FALLBACK_SLEEP_DAY_OFFSET_HRS = 18;
const TICK_STEP_HRS = 3;

function minutesOfDay(d: Date) {
  return d.getUTCHours() * 60 + d.getUTCMinutes();
}

function roundToNearestTickHour(minutes: number) {
  const tickMinutes = TICK_STEP_HRS * 60;
  const rounded = Math.round(minutes / tickMinutes) * tickMinutes;
  return Math.floor((rounded % MINUTES_PER_DAY) / 60);
}

export function computeDynamicSleepDayOffset(
  intervals: { startedAt: Date; endedAt: Date }[],
) {
  const ranges: { start: number; end: number }[] = [];

  for (const interval of intervals) {
    const duration = interval.endedAt.getTime() - interval.startedAt.getTime();
    if (duration < MIN_SLEEP_MS || duration >= DAY_MS) continue;

    const start = minutesOfDay(interval.startedAt);
    const end = minutesOfDay(interval.endedAt);

    if (start === end) continue;
    if (start < end) {
      ranges.push({ start, end });
    } else {
      ranges.push({ start, end: MINUTES_PER_DAY }, { start: 0, end });
    }
  }

  if (ranges.length === 0) return FALLBACK_SLEEP_DAY_OFFSET_HRS;

  ranges.sort((a, b) => a.start - b.start || a.end - b.end);

  const merged: { start: number; end: number }[] = [];
  for (const range of ranges) {
    const last = merged.at(-1);
    if (!last || range.start > last.end) {
      merged.push({ ...range });
    } else {
      last.end = Math.max(last.end, range.end);
    }
  }

  if (merged.length === 0) return FALLBACK_SLEEP_DAY_OFFSET_HRS;

  const firstRange = merged[0];
  const lastRange = merged[merged.length - 1];
  if (!firstRange || !lastRange) return FALLBACK_SLEEP_DAY_OFFSET_HRS;

  let bestGapStart = lastRange.end;
  let bestGapEnd = firstRange.start + MINUTES_PER_DAY;
  let bestGapSize = bestGapEnd - bestGapStart;

  for (let i = 0; i < merged.length - 1; i++) {
    const currentRange = merged[i];
    const nextRange = merged[i + 1];
    if (!currentRange || !nextRange) continue;

    const gapStart = currentRange.end;
    const gapEnd = nextRange.start;
    const gapSize = gapEnd - gapStart;
    if (gapSize > bestGapSize) {
      bestGapStart = gapStart;
      bestGapEnd = gapEnd;
      bestGapSize = gapSize;
    }
  }

  if (bestGapSize < TICK_STEP_HRS * 60) return FALLBACK_SLEEP_DAY_OFFSET_HRS;

  const midpoint = (bestGapStart + bestGapEnd) / 2;
  return roundToNearestTickHour(midpoint % MINUTES_PER_DAY);
}
