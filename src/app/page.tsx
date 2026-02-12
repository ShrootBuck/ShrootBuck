import { LucideMapPin, ExternalLink } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { prisma } from "~/lib/utils";

export const revalidate = 3600; // Revalidate every hour (3600 seconds)

export default async function Home() {
  const currentLocation = await prisma.location.findFirst({
    where: { id: "0" },
  });
  return (
    <div className="container">
      <header>
        <h1>Zayd Krunz</h1>
        <h2>
          Student
          <span style={{ color: "#ffffff", userSelect: "none" }}>{" // "}</span>
          Programmer
          <span style={{ color: "#ffffff", userSelect: "none" }}>{" // "}</span>
          Builder
        </h2>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "0.5rem",
            marginTop: "1rem",
            color: "var(--text-secondary)",
            fontSize: "0.9rem",
          }}
        >
          <LucideMapPin size={16} style={{ color: "var(--accent)" }} />
          <Link
            href="/location"
            className="text-blue-400 no-underline hover:underline"
            style={{ color: "var(--accent)" }}
          >
            <span>
              <strong>Currently:</strong>{" "}
              {currentLocation?.location ?? "Tucson, AZ"}
            </span>
          </Link>
        </div>

        {/* Navigation */}
        <nav
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "2rem",
            fontSize: "0.9rem",
            gap: "1.5rem",
          }}
        >
          <Link
            href="/research"
            className="text-blue-400 no-underline hover:underline"
            style={{ color: "var(--accent)" }}
          >
            Research
          </Link>
          <span style={{ color: "var(--text-secondary)", userSelect: "none" }}>
            /
          </span>
          <Link
            href="/photos"
            className="text-blue-400 no-underline hover:underline"
            style={{ color: "var(--accent)" }}
          >
            Photos
          </Link>
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
              <strong>Standardized Tests:</strong> 1500 SAT, 1480 PSAT
            </li>
            <li>
              <strong>Competitions:</strong> Actively competing in USACO
              (currently Silver) and preparing for the AMC 12 with the goal of
              qualifying for the AIME
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
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.4rem",
                whiteSpace: "nowrap",
                flexWrap: "nowrap",
              }}
            >
              View Resume
              <ExternalLink
                size={16}
                style={{
                  display: "inline-block",
                  marginLeft: "0.35rem",
                  transform: "translateY(-1px)",
                }}
              />
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
            . I&apos;m always open to discussing tech, philosophy, or working
            together. Feel free to reach out!
          </p>
        </section>
      </main>

      <div
        style={{
          textAlign: "center",
          padding: "2rem",
          borderTop: "1px solid var(--border)",
        }}
      >
        {/* <a
          href="https://signature.cnrad.dev/shrootbuck"
          target="_blank"
          rel="noopener"
          style={{
            display: "inline-block",
            margin: "0 auto",
            maxWidth: "300px",
            width: "60%",
          }}
        > */}
        <Image
          src="/signature.svg"
          alt="Signature of Zayd Krunz"
          width={300}
          height={100}
          draggable={false}
          style={{
            display: "block",
            width: "100%",
            opacity: 0.85,
            margin: "0 auto",
            maxWidth: "300px",
          }}
        />
        {/* </a> */}
      </div>
    </div>
  );
}
