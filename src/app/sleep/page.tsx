import type { Metadata } from "next";
import type { SleepInterval } from "@prisma/client";
import { Moon } from "lucide-react";
import BackToHomeLink from "~/components/back-to-home-link";
import { prisma } from "~/lib/utils";

export const metadata: Metadata = {
  title: "Sleep",
};

export const dynamic = "force-dynamic";

function formatTime(date: Date) {
  return new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  }).format(date);
}

function formatDay(date: Date) {
  return new Intl.DateTimeFormat("en-US", {
    weekday: "short",
    month: "numeric",
    day: "numeric",
  }).format(date);
}

function addDays(d: Date, days: number) {
  const result = new Date(d);
  result.setDate(result.getDate() + days);
  return result;
}

/** A "sleep day" runs noon -> noon so typical sleep (10pm-7am)
 *  appears as one continuous bar instead of being split across midnight. */
function startOfSleepDay(d: Date) {
  const result = new Date(d);
  if (result.getHours() >= 12) {
    result.setHours(12, 0, 0, 0);
  } else {
    result.setHours(12, 0, 0, 0);
    result.setDate(result.getDate() - 1);
  }
  return result;
}

function endOfSleepDay(d: Date) {
  return addDays(startOfSleepDay(d), 1);
}

function segmentToDay(
  interval: { startedAt: Date; endedAt: Date },
  dayStart: Date,
  dayEnd: Date,
) {
  const start = interval.startedAt.getTime();
  const end = interval.endedAt.getTime();

  const segStart = Math.max(start, dayStart.getTime());
  const segEnd = Math.min(end, dayEnd.getTime());

  if (segStart >= segEnd) return null;

  return {
    startPct: ((segStart - dayStart.getTime()) / 86400000) * 100,
    endPct: ((segEnd - dayStart.getTime()) / 86400000) * 100,
  };
}

async function getRecentIntervals() {
  const now = new Date();
  const currentSleepDayStart = startOfSleepDay(now);
  const oldestSleepDayStart = addDays(currentSleepDayStart, -6);

  const from = oldestSleepDayStart;
  const to = endOfSleepDay(now);

  // Find intervals that *overlap* the sleep-day window.
  // Using only `startedAt` misses intervals that began before midnight
  // and continued into the first day of the range.
  return await prisma.sleepInterval.findMany({
    where: {
      startedAt: { lte: to },
      endedAt: { gte: from },
    },
    orderBy: { startedAt: "desc" },
  });
}

export default async function SleepPage() {
  let intervals: SleepInterval[] = [];
  let error = false;

  try {
    intervals = await getRecentIntervals();
  } catch {
    intervals = [];
    error = true;
  }

  const now = new Date();
  const currentSleepDayStart = startOfSleepDay(now);

  const days: Date[] = [];
  for (let i = 6; i >= 0; i--) {
    days.push(addDays(currentSleepDayStart, -i));
  }

  return (
    <div className="container">
      <BackToHomeLink />

      <header>
        <h1 className="flex items-center justify-center gap-2">
          <Moon size={32} className="text-[var(--accent)]" />
          Sleep Log
        </h1>
        <h2>Last 7 days</h2>
      </header>

      <main>
        <section>
          <div className="space-y-2">
            {days.map((day) => {
              const dayStart = day;
              const dayEnd = addDays(day, 1);
              const segments = intervals
                .map((int) => segmentToDay(int, dayStart, dayEnd))
                .filter(Boolean);

              return (
                <div key={day.toISOString()} className="flex items-center gap-3">
                  <div className="w-16 shrink-0 text-sm text-[var(--muted-foreground)]">
                    {formatDay(day)}
                  </div>
                  <div className="relative h-6 flex-1 rounded bg-[var(--muted)]">
                    {segments.map((seg, i) => (
                      <div
                        key={i}
                        className="absolute top-0 h-full rounded bg-[var(--accent)] opacity-80"
                        style={{
                          left: `${seg!.startPct}%`,
                          width: `${seg!.endPct - seg!.startPct}%`,
                        }}
                      />
                    ))}
                    {/* Hour markers: 6p, 12a, 6a */}
                    {[0.25, 0.5, 0.75].map((pct) => (
                      <div
                        key={pct}
                        className="absolute top-0 h-full w-px bg-[var(--border)] opacity-50"
                        style={{ left: `${pct * 100}%` }}
                      />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-2 flex justify-between px-[4.5rem] text-xs text-[var(--muted-foreground)]">
            <span>12 PM</span>
            <span>6 PM</span>
            <span>12 AM</span>
            <span>6 AM</span>
            <span>12 PM</span>
          </div>
        </section>

        <section className="mt-8">
          <h3>Intervals</h3>
          {error ? (
            <p className="text-red-500">Failed to load sleep intervals.</p>
          ) : intervals.length === 0 ? (
            <p className="text-[var(--muted-foreground)]">No sleep intervals yet.</p>
          ) : (
            <div className="mt-2 space-y-2">
              {intervals.map((int) => (
                <div
                  key={int.id}
                  className="flex items-center justify-between border-b border-[var(--border)] py-2 last:border-0"
                >
                  <span>
                    Slept from <strong>{formatTime(int.startedAt)}</strong>
                    {" "}to <strong>{formatTime(int.endedAt)}</strong>
                  </span>
                  <span className="text-sm text-[var(--muted-foreground)]">
                    {new Intl.DateTimeFormat("en-US", {
                      month: "short",
                      day: "numeric",
                    }).format(int.startedAt)}
                  </span>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
