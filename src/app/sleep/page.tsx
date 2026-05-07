import type { Metadata } from "next";
import type { SleepInterval } from "@prisma/client";
import { Moon } from "lucide-react";
import BackToHomeLink from "~/components/back-to-home-link";
import { prisma } from "~/lib/utils";
import SleepChart from "./sleep-chart";
import SleepIntervalsList from "./sleep-intervals-list";

export const metadata: Metadata = {
  title: "Sleep",
};

export const dynamic = "force-dynamic";

function addDays(d: Date, days: number) {
  const result = new Date(d);
  result.setUTCDate(result.getUTCDate() + days);
  return result;
}

/** A "sleep day" runs noon -> noon so typical sleep (10pm-7am)
 *  appears as one continuous bar instead of being split across midnight. */
function startOfSleepDay(d: Date) {
  const result = new Date(d);
  if (result.getUTCHours() >= 12) {
    result.setUTCHours(12, 0, 0, 0);
  } else {
    result.setUTCHours(12, 0, 0, 0);
    result.setUTCDate(result.getUTCDate() - 1);
  }
  return result;
}

function endOfSleepDay(d: Date) {
  return addDays(startOfSleepDay(d), 1);
}

async function getRecentIntervals() {
  const now = new Date();
  // Don't bother mapping to UTC local here because we fetch extra anyway
  const currentSleepDayStart = startOfSleepDay(now);
  // Fetch a bit wider range on the server to account for timezone offset differences
  const oldestSleepDayStart = addDays(currentSleepDayStart, -14);

  const from = oldestSleepDayStart;
  const to = addDays(endOfSleepDay(now), 1);

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
          ) : (
            <SleepIntervalsList intervalsRaw={intervalsForClient} />
          )}
        </section>
      </main>
    </div>
  );
}
