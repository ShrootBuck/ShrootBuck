import { LucideMapPin, ExternalLink, Sun, Moon } from "lucide-react";
import Link from "next/link";

import { prisma } from "~/lib/utils";
import { LiveTime } from "~/components/live-time";

interface LocationResponse {
  location: string;
  timezone: string;
}

function formatCurrentTime(timezone: string) {
  return new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
    timeZone: timezone,
  }).format(new Date());
}

async function getLocation(): Promise<LocationResponse> {
  try {
    const currentLocation = await prisma.status.findUnique({
      where: { id: "0" },
    });
    return {
      location: currentLocation?.value ?? "Tucson, AZ",
      timezone: currentLocation?.timezone ?? "America/Phoenix",
    };
  } catch {
    return { location: "Tucson, AZ", timezone: "America/Phoenix" };
  }
}

async function getSleep(): Promise<string> {
  try {
    const currentStatus = await prisma.status.findUnique({
      where: { id: "1" },
    });
    return currentStatus?.value ?? "awake";
  } catch {
    return "awake";
  }
}

export default async function Home() {
  const { location: currentLocation, timezone } = await getLocation();
  const initialTime = formatCurrentTime(timezone);
  const sleep = await getSleep();
  const isAwake = sleep === "awake";

  return (
    <div className="container">
      <header>
        <h1>Zayd Krunz</h1>
        <h2>
          Student
          <span className="nav-separator">{" // "}</span>
          Programmer
          <span className="nav-separator">{" // "}</span>
          Builder
        </h2>

        <div className="header-meta">
          <LucideMapPin size={16} className="icon" />
          <Link href="/location">
            <strong>Currently:</strong> {currentLocation ?? "Tucson, AZ"}
          </Link>
        </div>

        <LiveTime timezone={timezone} initialTime={initialTime} />

        {/* <div className="header-meta">
          {isAwake ? (
            <Sun size={16} className="icon" />
          ) : (
            <Moon size={16} className="icon" />
          )}
          <Link href="/sleep">
            Currently {isAwake ? "awake" : "asleep"}
          </Link>
        </div> */}

        <nav className="header-nav">
          <Link href="/research">Research</Link>
          <span className="nav-separator">/</span>
          <Link href="/photos">Photos</Link>
        </nav>
      </header>

      <main>
        <section id="about">
          <h3>About Me</h3>
          <p>
            I&apos;m a junior at BASIS Tucson North currently taking seven AP
            classes while pursuing my passion for programming. I&apos;m always
            pushing myself to excel in mathematics, computer science, and
            problem-solving. Beyond academics, I train for{" "}
            <a href="/cp" target="_blank" rel="noopener">
              competitive programming
            </a>{" "}
            and the AMC 12/AIME. I enjoy building my own software projects
            whenever I get the chance (see my{" "}
            <a href="/github" target="_blank" rel="noopener">
              GitHub
            </a>
            ).
          </p>
          <p>
            My latest project,{" "}
            <a
              href="https://nudge.zaydkrunz.com"
              target="_blank"
              rel="noopener"
            >
              Nudge
            </a>
            , helps competitive programmers learn from Codeforces problems
            through progressive hints, encouraging real problem-solving instead
            of jumping straight to editorials.
          </p>
        </section>

        <section id="achievements">
          <h3>Achievements & Skills</h3>
          <ul>
            <li>
              <strong>Academic Excellence:</strong> 5s on AP exams (Chemistry,
              Calculus AB, European History, Literature), currently taking AP
              Seminar, AP Calc BC, AP Lang, APUSH, AP French, AP Physics 1, and
              AP Computer Science A
            </li>
            <li>
              <strong>Standardized Tests:</strong> 1500 SAT, 1480 PSAT, 34 ACT (Math: 36, Science: 35)
            </li>
            <li>
              <strong>Competitions:</strong> Actively competing in USACO (Silver
              division) and{" "}
              <a href="/codeforces" target="_blank">
                Codeforces
              </a>
            </li>
            <li>
              <strong>Programming Languages:</strong> Python, C++, JavaScript,
              TypeScript, Lua, PHP
            </li>
            <li>
              <strong>Frameworks & Tools:</strong> Pytorch, Pandas, NumPy,
              SciPy, PostgreSQL, Next.js, React
            </li>
          </ul>
        </section>

        <section id="resume">
          <h3>Resume</h3>
          <p>
            Looking for a more detailed overview of my experience and
            qualifications? You can view and download my latest resume below.
          </p>
          <p>
            <a
              href="https://nctnabncanovcjnyqiid.supabase.co/storage/v1/object/public/PublicStorage/master-resume.pdf"
              target="_blank"
              rel="noopener"
              id="resume-link"
              aria-label="View Resume (opens in a new tab)"
            >
              View Resume
              <ExternalLink size={16} />
            </a>
          </p>
        </section>

        <section id="contact">
          <h3>Contact</h3>
          <p>
            The best way to reach me is via{" "}
            <a href="mailto:contact@zaydkrunz.com">email</a>. You can also find
            me on{" "}
            <a href="/github" target="_blank" rel="noopener">
              GitHub
            </a>
            ,{" "}
            <a href="/x" target="_blank" rel="noopener">
              Twitter
            </a>
            , and{" "}
            <a href="/codeforces" target="_blank" rel="noopener">
              Codeforces
            </a>
            . I&apos;m always open to collaborating, so feel free to reach out!
          </p>
        </section>
      </main>
    </div>
  );
}
