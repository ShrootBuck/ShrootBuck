import { LucideMapPin } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { prisma } from "~/lib/utils";

export const dynamic = "force-dynamic";

export default async function Home() {
  const currentLocation = await prisma.location.findFirst({
    where: { id: "0" },
  });
  return (
    <div className="container">
      <header>
        <h1>Zayd Krunz</h1>
        <h2>
          Student <span style={{ color: "#ffffff" }}>{"//"}</span> Programmer{" "}
          <span style={{ color: "#ffffff" }}>{"//"}</span> Aspiring Quant
          Researcher
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
            style={{ textDecoration: "none", color: "var(--accent)" }}
          >
            <span>
              <strong>Currently:</strong>{" "}
              {currentLocation?.location ?? "Tucson, AZ"}
            </span>
          </Link>
        </div>
      </header>

      <main>
        <section id="about">
          <h3>About Me</h3>
          <p>
            I&apos;m an 11th grade student at BASIS Tucson North currently
            taking seven AP classes while pursuing my passion for programming
            and quantitative finance. With a goal of becoming a Quant Researcher
            at Citadel, I&apos;m constantly pushing myself to excel in
            mathematics, computer science, and problem-solving.
          </p>
          <p>
            When I&apos;m not grinding through AP slop, I&apos;m{" "}
            <a
              href="https://github.com/ShrootBuck/USACO"
              target="_blank"
              rel="noopener noreferrer"
            >
              working through USACO
            </a>{" "}
            (currently Bronze), preparing for the AMC 12 to qualify for AIME,
            and working on personal programming projects.
          </p>
        </section>

        {/* <section id="projects">
          <h3>Projects</h3>
          <div className="project-grid">
            <div className="card">
              <h4>Lorem Ipsum Project</h4>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation.
              </p>
            </div>
            <div className="card">
              <h4>Dolor Sit Amet</h4>
              <p>
                Duis aute irure dolor in reprehenderit in voluptate velit esse
                cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                cupidatat non proident.
              </p>
            </div>
            <div className="card">
              <h4>Consectetur Adipiscing</h4>
              <p>
                Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
                quae ab illo inventore.
              </p>
            </div>
          </div>
        </section> */}

        <section id="achievements">
          <h3>Achievements & Skills</h3>
          <ul>
            <li>
              <strong>Academic Excellence:</strong> 5s on AP exams (Chemistry,
              Calculus AB, European History, Literature), currently taking AP
              Seminar, AP Calc BC, AP Lang, APUSH, AP French, AP Physics 1, and
              AP Computer Science A.
            </li>
            {/* <li>
              <strong>Standardized Tests:</strong> Targeting 1600 SAT score,
              strong performance on AP exams with consistent 4s and 5s.
            </li> */}
            <li>
              <strong>Competitions:</strong> USACO Bronze Competitor, actively
              preparing for AMC 12 to qualify for AIME.
            </li>
            <li>
              <strong>Programming Languages:</strong> Python, C++, Java,
              JavaScript, TypeScript, Lua, PHP.
            </li>
            <li>
              <strong>Frameworks & Tools:</strong> Next.js, React, Git, Docker,
              TensorFlow, PostgreSQL, Prisma.
            </li>
            <li>
              <strong>Goals:</strong> MIT or Stanford admission, Quant
              Researcher at Citadel, eventually Portfolio Manager.
            </li>
          </ul>
        </section>

        <section id="resume">
          <h3>Resume</h3>
          <p>
            Looking for a more detailed overview of my experience and
            qualifications? You can download my current resume below.
          </p>
          <p>
            <a
              href="https://rxresu.me/shrootbuck/master-resume"
              target="_blank"
              rel="noopener noreferrer"
              id="resume-link"
            >
              View Resume
            </a>
          </p>
        </section>

        <section id="contact">
          <h3>Contact</h3>
          <p>
            The best way to reach me is via{" "}
            <a href="mailto:contact@zaydkrunz.com">email</a>. You can also find
            me on{" "}
            <a
              href="https://github.com/ShrootBuck"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
            ,{" "}
            <a
              href="https://x.com/shrootbuck"
              target="_blank"
              rel="noopener noreferrer"
            >
              Twitter
            </a>
            , and my{" "}
            <del>
              <a
                href="https://tenbyte.org"
                target="_blank"
                rel="noopener noreferrer"
              >
                blog
              </a>
            </del>{" "}
            (currently down for maintenance) where I share my programming
            projects, competitive programming solutions, and thoughts on tech
            and finance.
          </p>
          <p>
            I&apos;m always interested in discussing programming, finance, or
            collaboration opportunities with fellow students and professionals
            in tech.
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
        <a
          href="https://signature.cnrad.dev/shrootbuck"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "inline-block",
            margin: "0 auto",
            maxWidth: "300px",
            width: "60%",
          }}
        >
          <Image
            src="/signature.svg"
            alt="Signature of Zayd Krunz"
            width={300}
            height={100}
            style={{
              display: "block",
              width: "100%",
              opacity: 0.85,
            }}
          />
        </a>
      </div>
    </div>
  );
}
