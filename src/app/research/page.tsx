import type { Metadata } from "next";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import BackToHomeLink from "~/components/back-to-home-link";

export const metadata: Metadata = {
  title: "Research",
  description: "Research posters and papers by Zayd Krunz.",
  alternates: { canonical: "/research" },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/research",
    siteName: "Zayd Krunz",
    title: "Research // Zayd Krunz",
    description: "Research posters and papers by Zayd Krunz.",
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
    title: "Research // Zayd Krunz",
    description: "Research posters and papers by Zayd Krunz.",
    images: [
      {
        url: "/opengraph-image",
        alt: "Zayd Krunz — Student, Programmer, Builder",
      },
    ],
  },
};

const posters = [
  {
    imageUrl: "/Weakly_Supervised_RFI.png",
    alt: "Research poster on weakly supervised radio-frequency interference detection",
  },
  {
    imageUrl:
      "https://raw.githubusercontent.com/ShrootBuck/stanford-predictive-maintenance/refs/heads/main/Poster.png",
    webUrl: "/spcs",
    alt: "Stanford Pre-Collegiate Studies Poster",
  },
];

const papers = [
  {
    type: "AP SEMINAR // INDIVIDUAL WRITTEN ARGUMENT",
    title: "How AI Sycophancy Exacerbates the Crisis of Loneliness",
    href: "/iwa.pdf",
  },
  {
    type: "AP SEMINAR // INDIVIDUAL RESEARCH REPORT",
    title:
      "The Digital Engine of Democracy: How Social Media Algorithms Drive Political Polarization",
    href: "/irr.pdf",
  },
] as const;

export default function ResearchPage() {
  return (
    <div className="container">
      <BackToHomeLink />

      <header>
        <h1>Research</h1>
        <h2>
          Posters
          <span className="nav-separator">{" // "}</span>
          Papers
        </h2>
      </header>

      <main>
        <section id="posters">
          <h3>Posters</h3>

          <div className="poster-grid">
            {posters.map((poster) => (
              <div key={poster.imageUrl}>
                <Image
                  src={poster.imageUrl}
                  alt={poster.alt}
                  width={3840}
                  height={2880}
                  sizes="(max-width: 768px) calc(100vw - 3rem), 600px"
                  className="h-auto w-full rounded-lg"
                />
                <div className="mt-2 flex gap-4 text-sm">
                  <a
                    href={poster.imageUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Fullscreen
                  </a>
                  {poster.webUrl && (
                    <a
                      href={poster.webUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      More details
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="papers">
          <h3>Papers</h3>
          <div className="paper-grid">
            {papers.map((paper) => (
              <a
                key={paper.href}
                href={paper.href}
                target="_blank"
                rel="noopener noreferrer"
                className="paper-card"
              >
                <span>{paper.type}</span>
                <strong>{paper.title}</strong>
                <span className="paper-link">
                  Read paper
                  <ArrowUpRight size={16} aria-hidden="true" />
                </span>
              </a>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
