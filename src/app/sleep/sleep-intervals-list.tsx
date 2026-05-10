"use client";

import { useMemo } from "react";
import {
  addDaysUtc,
  endOfSleepDayUtc,
  formatDuration,
  formatTimeUtc,
  formatDateShortUtc,
  startOfSleepDayUtc,
} from "~/lib/sleep";

export default function SleepIntervalsList({
  intervalsRaw,
  serverNow,
}: {
  intervalsRaw: { id: string; startedAt: string; endedAt: string }[];
  serverNow: string;
}) {
  const listIntervals = useMemo(() => {
    const intervals = intervalsRaw.map((i) => ({
      id: i.id,
      startedAt: new Date(i.startedAt),
      endedAt: new Date(i.endedAt),
    }));

    const now = new Date(serverNow);
    const currentSleepDayStart = startOfSleepDayUtc(now);
    const listFrom = addDaysUtc(currentSleepDayStart, -6);
    const listTo = endOfSleepDayUtc(now);

    return intervals.filter(
      (i) => i.endedAt >= listFrom && i.startedAt <= listTo,
    );
  }, [intervalsRaw, serverNow]);

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
              Slept from <strong>{formatTimeUtc(int.startedAt)}</strong> to{" "}
              <strong>{formatTimeUtc(int.endedAt)}</strong>
              <span className="ml-2 text-sm text-[var(--text-secondary)] opacity-70">
                ({formatDuration(dur)})
              </span>
            </span>
            <span className="shrink-0 text-sm text-[var(--text-secondary)]">
              {formatDateShortUtc(int.startedAt)}
            </span>
          </div>
        );
      })}
    </div>
  );
}
