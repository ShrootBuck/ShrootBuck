"use client";

import { useMemo, useState } from "react";
import {
  addDaysUtc,
  computeDynamicSleepDayOffset,
  formatDuration,
  formatTimeUtc,
  startOfSleepDayUtc,
} from "~/lib/sleep";

type Interval = { id: string; startedAt: string; endedAt: string };

type Segment = {
  key: string;
  startPct: number;
  endPct: number;
  intervalStart: Date;
  intervalEnd: Date;
  durationMs: number;
};

const DAY_MS = 86_400_000;

function formatDayLabel(dayStart: Date) {
  const weekday = new Intl.DateTimeFormat("en-US", { weekday: "long", timeZone: "UTC" }).format(
    dayStart,
  );
  const md = new Intl.DateTimeFormat("en-US", {
    month: "numeric",
    day: "numeric",
    timeZone: "UTC"
  }).format(dayStart);
  return { weekday, md };
}

function formatTickLabel(offsetHrs: number, tick: number) {
  const hour = (offsetHrs + tick * 24) % 24;
  return new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    hour12: true,
    timeZone: "UTC",
  }).format(new Date(Date.UTC(2000, 0, 1, hour)));
}

function buildRows(
  days: Date[],
  intervals: { id: string; startedAt: Date; endedAt: Date }[],
) {
  return days.map((dayStart) => {
    const dayEnd = addDaysUtc(dayStart, 1);
    const dayStartMs = dayStart.getTime();
    const dayEndMs = dayEnd.getTime();

    const segments: Segment[] = [];
    let totalMs = 0;

    for (const int of intervals) {
      const s = int.startedAt.getTime();
      const e = int.endedAt.getTime();
      const segStart = Math.max(s, dayStartMs);
      const segEnd = Math.min(e, dayEndMs);
      if (segStart >= segEnd) continue;

      segments.push({
        key: `${int.id}-${dayStartMs}`,
        startPct: ((segStart - dayStartMs) / DAY_MS) * 100,
        endPct: ((segEnd - dayStartMs) / DAY_MS) * 100,
        intervalStart: int.startedAt,
        intervalEnd: int.endedAt,
        durationMs: e - s,
      });
      totalMs += segEnd - segStart;
    }

    return { dayStart, dayEnd, segments, totalMs };
  });
}

function computeStats(rows: ReturnType<typeof buildRows>) {
  const nightsWithSleep = rows.filter((r) => r.totalMs > 0);
  const totalMs = rows.reduce((acc, r) => acc + r.totalMs, 0);
  const avgMs =
    nightsWithSleep.length > 0 ? totalMs / nightsWithSleep.length : 0;
  const bestMs = rows.reduce((acc, r) => Math.max(acc, r.totalMs), 0);
  const bestNight = rows.find((r) => r.totalMs === bestMs && bestMs > 0);
  return { totalMs, avgMs, bestMs, bestNight, nightsWithSleep };
}

export default function SleepChart({
  intervalsRaw,
  serverNow,
}: {
  intervalsRaw: Interval[];
  serverNow: string;
}) {
  const intervals = useMemo(
    () =>
      intervalsRaw.map((i) => ({
        id: i.id,
        startedAt: new Date(i.startedAt),
        endedAt: new Date(i.endedAt),
      })),
    [intervalsRaw],
  );

  const sleepDayOffsetHrs = useMemo(
    () => computeDynamicSleepDayOffset(intervals),
    [intervals],
  );

  const currentSleepDayStart = useMemo(() => {
    return startOfSleepDayUtc(new Date(serverNow), sleepDayOffsetHrs);
  }, [serverNow, sleepDayOffsetHrs]);

  const days = useMemo(() => {
    const out: Date[] = [];
    for (let i = 6; i >= 0; i--) out.push(addDaysUtc(currentSleepDayStart, -i));
    return out;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentSleepDayStart.getTime()]);

  const prevDays = useMemo(() => {
    const out: Date[] = [];
    for (let i = 13; i >= 7; i--) out.push(addDaysUtc(currentSleepDayStart, -i));
    return out;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentSleepDayStart.getTime()]);

  const rows = useMemo(() => buildRows(days, intervals), [days, intervals]);
  const prevRows = useMemo(
    () => buildRows(prevDays, intervals),
    [prevDays, intervals],
  );

  const stats = useMemo(() => computeStats(rows), [rows]);
  const prevStats = useMemo(() => computeStats(prevRows), [prevRows]);

  const [hovered, setHovered] = useState<Segment | null>(null);

  const ticks = [0, 0.125, 0.25, 0.375, 0.5, 0.625, 0.75, 0.875, 1];
  const tickLabels = ticks.map((tick) => formatTickLabel(sleepDayOffsetHrs, tick));

  // Trend vs previous 7 days
  const hasPrevData = prevStats.nightsWithSleep.length > 0;
  const trendMs = stats.avgMs - prevStats.avgMs;
  const trendValue =
    stats.nightsWithSleep.length > 0 && hasPrevData
      ? `${trendMs > 0 ? "↑" : trendMs < 0 ? "↓" : "→"} ${formatDuration(Math.abs(trendMs))}`
      : "—";
  const trendSub = hasPrevData
    ? `vs prev ${prevStats.nightsWithSleep.length} nights`
    : "No prev data";
  const trendColor =
    trendMs > 0 ? "text-green-500" : trendMs < 0 ? "text-red-500" : "";

  return (
    <div>
      {/* Summary stats */}
      <div className="mb-6 grid grid-cols-3 gap-3">
        <StatCard
          label="AVERAGE"
          value={stats.avgMs > 0 ? formatDuration(stats.avgMs) : "—"}
          sub={`${stats.nightsWithSleep.length}/7 nights`}
        />
        <StatCard
          label="Best night"
          value={stats.bestMs > 0 ? formatDuration(stats.bestMs) : "—"}
          sub={
            stats.bestNight
              ? formatDayLabel(stats.bestNight.dayStart).weekday
              : ""
          }
        />
        <StatCard
          label="Trend"
          value={trendValue}
          sub={trendSub}
          valueClassName={trendColor}
        />
      </div>

      {/* Chart */}
      <div className="relative">
        {/* Top axis labels */}
        <div className="mb-3 flex pl-[88px] pr-[68px]">
          <div className="relative h-3 flex-1">
            {ticks.map((t, i) => {
              // On mobile only show every other label (4 total + endpoints)
              const isMajor = i % 2 === 0;
              return (
                <span
                  key={t}
                  className={`absolute top-0 -translate-x-1/2 whitespace-nowrap text-[10px] text-[var(--text-secondary)] opacity-70 ${
                    isMajor ? "" : "hidden sm:inline"
                  }`}
                  style={{ left: `${t * 100}%` }}
                >
                  {tickLabels[i]}
                </span>
              );
            })}
          </div>
        </div>

        <div className="mt-4 space-y-2">
          {rows.map((row) => {
            const label = formatDayLabel(row.dayStart);
            const hasSleep = row.totalMs > 0;

            return (
              <div
                key={row.dayStart.toISOString()}
                className="flex items-center gap-3"
              >
                <div className="w-[76px] shrink-0 text-right">
                  <div className="text-sm font-medium text-[var(--text-primary)]">
                    {label.weekday}
                  </div>
                  <div className="text-[11px] text-[var(--text-secondary)] opacity-70">
                    {label.md}
                  </div>
                </div>

                <div className="relative h-9 flex-1 overflow-hidden rounded-md border border-[var(--border)] bg-[var(--card-bg)]">
                  {/* Grid lines */}
                  {ticks.slice(1, -1).map((t) => (
                    <div
                      key={t}
                      className="pointer-events-none absolute top-0 h-full w-px bg-[var(--border)]"
                      style={{
                        left: `${t * 100}%`,
                        opacity: t === 0.5 ? 0.9 : 0.4,
                      }}
                    />
                  ))}

                  {/* Sleep bars */}
                  {row.segments.map((seg) => {
                    const width = Math.max(seg.endPct - seg.startPct, 1.0);
                    return (
                      <div
                        key={seg.key}
                        onMouseEnter={() => setHovered(seg)}
                        onMouseLeave={() => setHovered(null)}
                        className="absolute top-1 h-[calc(100%-0.5rem)] cursor-pointer rounded-sm bg-[var(--accent)] transition-all hover:brightness-125"
                        style={{
                          left: `${seg.startPct}%`,
                          width: `${width}%`,
                          boxShadow: "0 0 8px var(--accent-glow)",
                        }}
                        title={`${formatTimeUtc(seg.intervalStart)} → ${formatTimeUtc(seg.intervalEnd)} · ${formatDuration(seg.durationMs)}`}
                      />
                    );
                  })}
                </div>

                <div className="w-14 shrink-0 text-right text-xs tabular-nums text-[var(--text-secondary)]">
                  {hasSleep ? formatDuration(row.totalMs) : "—"}
                </div>
              </div>
            );
          })}
        </div>

        {/* Hover detail line */}
        <div className="mt-4 flex min-h-[1.25rem] items-center justify-center text-xs text-[var(--text-secondary)]">
          {hovered ? (
            <span>
              <span className="text-[var(--accent)]">●</span>{" "}
               {formatTimeUtc(hovered.intervalStart)} →{" "}
               {formatTimeUtc(hovered.intervalEnd)}
              <span className="mx-2 opacity-40">|</span>
              <strong className="text-[var(--text-primary)]">
                {formatDuration(hovered.durationMs)}
              </strong>
            </span>
          ) : (
            <span className="opacity-50">Hover a bar for details</span>
          )}
        </div>
      </div>
    </div>
  );
}

function StatCard({
  label,
  value,
  sub,
  valueClassName,
}: {
  label: string;
  value: string;
  sub: string;
  valueClassName?: string;
}) {
  return (
    <div className="rounded-md border border-[var(--border)] bg-[var(--card-bg)] p-3">
      <div className="text-[11px] uppercase tracking-wider text-[var(--text-secondary)] opacity-70">
        {label}
      </div>
      <div
        className={`mt-1 text-xl font-bold tabular-nums ${valueClassName ?? "text-[var(--text-primary)]"}`}
      >
        {value}
      </div>
      {sub && (
        <div className="mt-0.5 text-[11px] text-[var(--text-secondary)] opacity-60">
          {sub}
        </div>
      )}
    </div>
  );
}
