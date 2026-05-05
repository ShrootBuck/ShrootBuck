import type { Metadata } from "next";
import type { SleepInterval } from "@prisma/client";
import { Moon } from "lucide-react";
import BackToHomeLink from "~/components/back-to-home-link";
import { prisma } from "~/lib/utils";
import SleepChart from "./sleep-chart";

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

async function getRecentIntervals() {
  const now = new Date();
  const currentSleepDayStart = startOfSleepDay(now);
  const oldestSleepDayStart = addDays(currentSleepDayStart, -13);

  const from = oldestSleepDayStart;
  const to = endOfSleepDay(now);

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
  const listFrom = addDays(currentSleepDayStart, -6);
  const listTo = endOfSleepDay(now);

  const listIntervals = intervals.filter(
    (i) => i.endedAt >= listFrom && i.startedAt <= listTo,
  );

  // Serialize for the client component
  const intervalsForClient = intervals.map((i) => ({
    id: i.id,
    startedAt: i.startedAt.toISOString(),
    endedAt: i.endedAt.toISOString(),
  }));

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
          {error ? (
            <p className="text-red-500">Failed to load sleep data.</p>
          ) : (
            <SleepChart intervalsRaw={intervalsForClient} />
          )}
        </section>

        <section className="mt-8">
          <h3>Intervals</h3>
          {error ? (
            <p className="text-red-500">Failed to load sleep intervals.</p>
          ) : listIntervals.length === 0 ? (
            <p className="text-[var(--text-secondary)]">No sleep intervals yet.</p>
          ) : (
            <div className="mt-2 space-y-2">
              {listIntervals.map((int) => {
                const dur = int.endedAt.getTime() - int.startedAt.getTime();
                return (
                  <div
                    key={int.id}
                    className="flex items-center justify-between gap-3 border-b border-[var(--border)] py-2 last:border-0"
                  >
                    <span>
                      Slept from <strong>{formatTime(int.startedAt)}</strong>
                      {" "}to <strong>{formatTime(int.endedAt)}</strong>
                      <span className="ml-2 text-sm text-[var(--text-secondary)] opacity-70">
                        ({formatDuration(dur)})
                      </span>
                    </span>
                    <span className="shrink-0 text-sm text-[var(--text-secondary)]">
                      {new Intl.DateTimeFormat("en-US", {
                        month: "short",
                        day: "numeric",
                      }).format(int.startedAt)}
                    </span>
                  </div>
                );
              })}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
