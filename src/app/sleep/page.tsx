import type { Metadata } from "next";
import { Moon } from "lucide-react";
import BackToHomeLink from "~/components/back-to-home-link";

export const metadata: Metadata = {
  title: "Sleep",
};

export default function SleepPage() {
  return (
    <div className="container">
      <BackToHomeLink />

      <header>
        <h1 className="flex items-center justify-center gap-2">
          <Moon size={32} className="text-[var(--accent)]" />
          Sleep Tracker
        </h1>
        <h2>How does this actually work?</h2>
      </header>

      <main>
        <section>
          <h3>The System</h3>
          <p>
            It&apos;s not magic and it&apos;s definitely not real-time. This is
            a small iOS app I wrote that listens to Apple Health sleep-stage
            updates. Apple decides you&apos;re asleep/awake, then (usually 20–30
            minutes later) it writes that result into HealthKit. When that
            happens, my app wakes up in the background and POSTs the result to{" "}
            <code>/api/sleep</code>.
          </p>
          <p>
            So the status you see here is accurate, but delayed. If I&apos;m
            scrolling in bed, Apple doesn&apos;t mark me asleep. If I wake up,
            it still takes a bit before Apple commits it. That&apos;s the
            tradeoff for using Apple&apos;s fancy algorithm instead of me
            guessing with heart rate.
          </p>

          <p>
            If you&apos;re interested in the code, the full site is on{" "}
            <a
              href="https://github.com/ShrootBuck/ShrootBuck"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
            . The iOS app is open-source too (soon...), so you can see the exact
            HealthKit + webhook logic.
          </p>
        </section>
      </main>
    </div>
  );
}
