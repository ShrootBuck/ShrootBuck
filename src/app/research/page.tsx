import type { Metadata } from "next";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import BackToHomeLink from "~/components/back-to-home-link";
import styles from "./research.module.css";

export const metadata: Metadata = {
  title: "Research",
  description: "Research papers and posters by Zayd Krunz.",
  alternates: { canonical: "/research" },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/research",
    siteName: "Zayd Krunz",
    title: "Research // Zayd Krunz",
    description: "Research papers and posters by Zayd Krunz.",
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
    description: "Research papers and posters by Zayd Krunz.",
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
    title:
      "Weakly Supervised Machine Learning for Enhancing RFI Detection in Passive/Active Coexistence Scenarios",
    context: "University of Arizona",
    imageUrl: "/Weakly_Supervised_RFI.png",
    alt: "Research poster on weakly supervised radio-frequency interference detection",
  },
  {
    title: "Forecasting Equipment Failure using Machine Learning",
    context: "Stanford Pre-Collegiate Summer Institutes",
    imageUrl:
      "https://raw.githubusercontent.com/ShrootBuck/stanford-predictive-maintenance/refs/heads/main/Poster.png",
    webUrl: "/spcs",
    alt: "Stanford Pre-Collegiate Studies Poster",
  },
];

const papers = [
  {
    type: "CAPSTONE LAW // CASE STUDY",
    title:
      "Turkish Airlines Flight 981: Causation, Liability, Damages, and Ethical Responsibility",
    href: "/turkish-airlines.pdf",
  },
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
    <div className={`${styles.page} container`}>
      <BackToHomeLink />

      <header className={styles.header}>
        <h1>Research</h1>
      </header>

      <main>
        <section
          id="papers"
          aria-labelledby="papers-heading"
          className={styles.section}
        >
          <div className={styles.sectionHeading}>
            <h2 id="papers-heading">Papers</h2>
            <span>{papers.length} papers</span>
          </div>
          <div className={styles.papers}>
            {papers.map((paper) => (
              <article key={paper.href}>
                <a
                  href={paper.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.paper}
                  aria-label={`Read paper: ${paper.title} (PDF, opens in a new tab)`}
                >
                  <div className={styles.paperCopy}>
                    <p className={styles.paperType}>{paper.type}</p>
                    <h3>{paper.title}</h3>
                  </div>
                  <span className={styles.paperAction}>
                    Read PDF <ArrowUpRight size={17} aria-hidden="true" />
                  </span>
                </a>
              </article>
            ))}
          </div>
        </section>

        <section
          id="posters"
          aria-labelledby="posters-heading"
          className={styles.section}
        >
          <div className={styles.sectionHeading}>
            <h2 id="posters-heading">Posters</h2>
            <span>{posters.length} posters</span>
          </div>
          <div className={styles.posters}>
            {posters.map((poster) => (
              <article key={poster.imageUrl} className={styles.poster}>
                <a
                  href={poster.imageUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.posterMain}
                  aria-label={`View full-size poster: ${poster.title} (opens in a new tab)`}
                >
                  <div className={styles.posterPreview}>
                    <Image
                      src={poster.imageUrl}
                      alt={poster.alt}
                      width={3840}
                      height={2880}
                      sizes="(max-width: 600px) calc(100vw - 40px), (max-width: 960px) calc((100vw - 112px) / 2), 424px"
                    />
                  </div>
                </a>
                <div className={styles.posterCopy}>
                  <p>{poster.context}</p>
                  <h3>{poster.title}</h3>
                </div>
                <div className={styles.posterActions}>
                  <a
                    href={poster.imageUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.posterAction}
                    aria-label={`View full-size poster: ${poster.title} (opens in a new tab)`}
                  >
                    View poster <ArrowUpRight size={15} aria-hidden="true" />
                  </a>
                  {poster.webUrl && (
                    <a
                      href={poster.webUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.posterAction}
                    >
                      Project details{" "}
                      <ArrowUpRight size={15} aria-hidden="true" />
                    </a>
                  )}
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
