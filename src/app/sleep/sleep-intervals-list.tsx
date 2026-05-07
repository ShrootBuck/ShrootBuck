"use client";

import { useMemo } from "react";

function formatTime(date: Date) {
  return new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
    timeZone: "UTC",
  }).format(date);
}

function formatDuration(ms: number) {
  const totalMin = Math.round(ms / 60000);
  const h = Math.floor(totalMin / 60);
  const m = totalMin % 60;
  if (h === 0) return `${m}m`;
  if (m === 0) return `${h}h`;
  return `${h}h ${m}m`;
}

function addDays(d: Date, days: number) {
  const result = new Date(d);
  result.setUTCDate(result.getUTCDate() + days);
  return result;
}

function startOfSleepDay(d: Date) {
  const result = new Date(d);
  if (result.getUTCHours() >= 18) {
    result.setUTCHours(18, 0, 0, 0);
  } else {
    result.setUTCHours(18, 0, 0, 0);
    result.setUTCDate(result.getUTCDate() - 1);
  }
  return result;
}

function endOfSleepDay(d: Date) {
  return addDays(startOfSleepDay(d), 1);
}

export default function SleepIntervalsList({
  intervalsRaw,
}: {
  intervalsRaw: { id: string; startedAt: string; endedAt: string }[];
}) {
  const listIntervals = useMemo(() => {
    const intervals = intervalsRaw.map((i) => ({
      id: i.id,
      startedAt: new Date(i.startedAt),
      endedAt: new Date(i.endedAt),
    }));

    const nowLocal = new Date();
    const now = new Date(
      Date.UTC(
        nowLocal.getFullYear(),
        nowLocal.getMonth(),
        nowLocal.getDate(),
        nowLocal.getHours(),
        nowLocal.getMinutes(),
        nowLocal.getSeconds(),
      ),
    );
    const currentSleepDayStart = startOfSleepDay(now);
    const listFrom = addDays(currentSleepDayStart, -6);
    const listTo = endOfSleepDay(now);

    return intervals.filter(
      (i) => i.endedAt >= listFrom && i.startedAt <= listTo,
    );
  }, [intervalsRaw]);

  if (listIntervals.length === 0) {
    return <p className="text-[var(--text-secondary)]">No sleep intervals yet.</p>;
  }

  return (
    <div className="mt-2 space-y-2">
      {listIntervals.map((int) => {
        const dur = int.endedAt.getTime() - int.startedAt.getTime();
        return (
          <div
            key={int.id}
            className="flex items-center justify-between gap-3 border-b border-[var(--border)] py-2 last:border-0"
          >
            <span>
              Slept from <strong>{formatTime(int.startedAt)}</strong> to{" "}
              <strong>{formatTime(int.endedAt)}</strong>
              <span className="ml-2 text-sm text-[var(--text-secondary)] opacity-70">
                ({formatDuration(dur)})
              </span>
            </span>
            <span className="shrink-0 text-sm text-[var(--text-secondary)]">
              {new Intl.DateTimeFormat("en-US", {
                month: "short",
                day: "numeric",
                timeZone: "UTC",
              }).format(int.startedAt)}
            </span>
          </div>
        );
      })}
    </div>
  );
}
