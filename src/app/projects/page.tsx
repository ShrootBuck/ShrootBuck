import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import BackToHomeLink from "~/components/back-to-home-link";

export const metadata: Metadata = {
  title: "Projects",
  description: "Products, experiments, and client work by Zayd Krunz.",
  alternates: { canonical: "/projects" },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/projects",
    siteName: "Zayd Krunz",
    title: "Projects // Zayd Krunz",
    description: "Products, experiments, and client work by Zayd Krunz.",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Zayd Krunz — Student, Programmer, Builder",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Projects // Zayd Krunz",
    description: "Products, experiments, and client work by Zayd Krunz.",
    images: [
      {
        url: "/opengraph-image",
        alt: "Zayd Krunz — Student, Programmer, Builder",
      },
    ],
  },
};

const projects = [
  {
    number: "01",
    title: "TenByte",
    href: "https://tenbyte.org",
    description:
      "An agentic grading platform that turns assignment files and student work into consistent feedback while keeping teachers in control.",
    external: true,
  },
  {
    number: "02",
    title: "Nudge",
    href: "https://nudge.zaydkrunz.com",
    description:
      "Progressive, generated hints for Codeforces problems, backed by sandboxed agents and autonomous grading.",
    external: true,
  },
  {
    number: "03",
    title: "Pickle Balls",
    href: "https://pickle-balls.com",
    description:
      "A private schoolwork accountability app with daily photo-proofed tasks verified by friends before the Phoenix midnight deadline.",
    external: true,
  },
  {
    number: "04",
    title: "Sonora",
    href: "https://sonora.party/",
    description:
      "A browser tool that animates a photo, cuts audio, and exports a 1080 × 1920 video at 60 FPS without uploading your media.",
    external: true,
  },
  {
    number: "05",
    title: "Jackbot",
    href: "https://github.com/ShrootBuck/jackbot",
    description:
      "A Jackaroo bot trained through self-play, with a fast Rust game engine and a Python/PyTorch training stack.",
    external: true,
  },
  {
    number: "06",
    title: "Tiger Mountain Container Farm",
    href: "/projects/tiger-mountain",
    description:
      "A measurable pilot plan and credible procurement path built from an infeasible sub-$100-per-unit brief.",
    external: false,
  },
] as const;

type Project = (typeof projects)[number];

function ProjectList({ projects }: { projects: readonly Project[] }) {
  return (
    <div className="work-grid">
      {projects.map((project) => (
        <Link
          key={project.title}
          href={project.href}
          target={project.external ? "_blank" : undefined}
          rel={project.external ? "noopener noreferrer" : undefined}
          className="work-card"
        >
          <span className="work-number" aria-hidden="true">
            {project.number}
          </span>
          <span className="work-copy">
            <strong>{project.title}</strong>
            <span className="work-description">{project.description}</span>
          </span>
          <ArrowUpRight className="work-arrow" size={19} aria-hidden="true" />
        </Link>
      ))}
    </div>
  );
}

export default function ProjectsPage() {
  return (
    <div className="container">
      <BackToHomeLink />

      <header>
        <h1>Projects</h1>
        <h2>
          Products
          <span className="nav-separator">{" // "}</span>
          Experiments
          <span className="nav-separator">{" // "}</span>
          Client Work
        </h2>
      </header>

      <main>
        <section id="projects">
          <h3>Selected Work</h3>
          <ProjectList projects={projects} />
        </section>
      </main>
    </div>
  );
}
