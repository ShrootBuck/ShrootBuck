import type { Metadata } from "next";
import type { SleepInterval } from "@prisma/client";
import { Moon } from "lucide-react";
import BackToHomeLink from "~/components/back-to-home-link";
import { prisma } from "~/lib/utils";
import {
  serializeMergedSleepIntervals,
  addDaysUtc,
  endOfSleepDayUtc,
  nowUtcWallClock,
  startOfSleepDayUtc,
} from "~/lib/sleep";
import SleepChart from "./sleep-chart";
import SleepIntervalsList from "./sleep-intervals-list";

export const metadata: Metadata = {
  title: "Sleep",
};

export const dynamic = "force-dynamic";

async function getRecentIntervals() {
  const now = nowUtcWallClock();
  // Don't bother mapping to UTC local here because we fetch extra anyway
  const currentSleepDayStart = startOfSleepDayUtc(now);
  // Fetch a bit wider range on the server to account for timezone offset differences
  const oldestSleepDayStart = addDaysUtc(currentSleepDayStart, -14);

  const from = oldestSleepDayStart;
  const to = addDaysUtc(endOfSleepDayUtc(now), 1);

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

  const serverNow = nowUtcWallClock();
  const intervalsForClient = serializeMergedSleepIntervals(intervals);

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
            <SleepChart intervalsRaw={intervalsForClient} serverNow={serverNow.toISOString()} />
          )}
        </section>

        <section className="mt-8">
          <h3>Intervals</h3>
          {error ? (
            <p className="text-red-500">Failed to load sleep intervals.</p>
          ) : (
            <SleepIntervalsList intervalsRaw={intervalsForClient} serverNow={serverNow.toISOString()} />
          )}
        </section>
      </main>
    </div>
  );
}
