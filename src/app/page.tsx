import { ExternalLink, MapPin } from "lucide-react";
import Link from "next/link";

import { prisma } from "~/lib/utils";
import { LiveTime } from "~/components/live-time";
import {
  FALLBACK_TIME_ZONE,
  formatCurrentTime,
  isValidTimeZone,
} from "~/lib/time";

interface LocationResponse {
  location: string;
  timezone: string;
}

async function getLocation(): Promise<LocationResponse> {
  try {
    const currentLocation = await prisma.status.findUnique({
      where: { id: "0" },
    });
    return {
      location: currentLocation?.value ?? "Tucson, AZ",
      timezone:
        currentLocation?.timezone && isValidTimeZone(currentLocation.timezone)
          ? currentLocation.timezone
          : FALLBACK_TIME_ZONE,
    };
  } catch {
    return { location: "Tucson, AZ", timezone: FALLBACK_TIME_ZONE };
  }
}

export default async function Home() {
  const { location: currentLocation, timezone } = await getLocation();
  const initialTime = formatCurrentTime(timezone);

  return (
    <div className="container">
      <header className="home-hero">
        <h1>Zayd Krunz</h1>
        <h2>
          Student
          <span className="nav-separator">{" // "}</span>
          Programmer
          <span className="nav-separator">{" // "}</span>
          Builder
        </h2>

        <div className="header-meta">
          <MapPin size={16} className="icon" aria-hidden="true" />
          <Link href="/location">
            <strong>Currently:</strong> {currentLocation}
          </Link>
        </div>

        <LiveTime timezone={timezone} initialTime={initialTime} />

        <nav className="header-nav" aria-label="Primary navigation">
          <Link href="/projects">Projects</Link>
          <span className="nav-separator" aria-hidden="true">
            /
          </span>
          <Link href="/research">Research</Link>
          <span className="nav-separator" aria-hidden="true">
            /
          </span>
          <Link href="/photos">Photos</Link>
        </nav>
      </header>

      <main>
        <section id="about">
          <h3>About Me</h3>
          <p>
            I&apos;m a senior at BASIS Tucson North who likes hard problems and
            shipping useful software. I spend most of my time on mathematics,
            computer science, AI systems, and{" "}
            <a href="/cp" target="_blank" rel="noopener noreferrer">
              competitive programming
            </a>
            .
          </p>
          <p>
            I learn by building, usually somewhere between a research question
            and a product. The code, experiments, and questionable commit
            messages live on my{" "}
            <a href="/github" target="_blank" rel="noopener noreferrer">
              GitHub
            </a>
            .
          </p>
        </section>

        <section id="achievements">
          <h3>Achievements & Skills</h3>
          <ul>
            <li>
              <strong>National Merit:</strong> 2027 National Merit Scholarship
              Semifinalist
            </li>
            <li className="ap-scores-item">
              <strong>AP Scores:</strong>
              <span className="ap-score-line">
                <strong className="ap-score-value">5</strong> in Chemistry,
                Calculus AB, Calculus BC, European History, English Literature,
                English Language, U.S. History, Seminar, Physics 1, and Computer
                Science A
              </span>
              <span className="ap-score-line">
                <strong className="ap-score-value">4</strong> in French and U.S.
                Government
              </span>
            </li>
            <li>
              <strong>Standardized Tests:</strong> 1500 SAT, 1480 PSAT, 34 ACT
              (Math: 36, Science: 36)
            </li>
            <li>
              <strong>Competitions:</strong> Actively competing in USACO (Silver
              division) and{" "}
              <a href="/codeforces" target="_blank" rel="noopener noreferrer">
                Codeforces
              </a>
            </li>
            <li>
              <strong>Programming Languages:</strong> Python, C++, JavaScript,
              TypeScript, Lua, PHP
            </li>
            <li>
              <strong>Frameworks & Tools:</strong> PyTorch, Pandas, NumPy,
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
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              id="resume-link"
              aria-label="View Resume (opens in a new tab)"
            >
              View Resume
              <ExternalLink size={16} aria-hidden="true" />
            </a>
          </p>
        </section>

        <section id="contact">
          <h3>Contact</h3>
          <p>
            The best way to reach me is via{" "}
            <a href="mailto:contact@zaydkrunz.com">email</a>. You can also find
            me on{" "}
            <a href="/github" target="_blank" rel="noopener noreferrer">
              GitHub
            </a>
            ,{" "}
            <a href="/x" target="_blank" rel="noopener noreferrer">
              Twitter
            </a>
            , and{" "}
            <a href="/codeforces" target="_blank" rel="noopener noreferrer">
              Codeforces
            </a>
            . I&apos;m always open to collaborating, so feel free to reach out!
          </p>
        </section>
      </main>
    </div>
  );
}
