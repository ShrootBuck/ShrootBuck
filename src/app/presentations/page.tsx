import type { Metadata } from "next";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

import BackToHomeLink from "~/components/back-to-home-link";
import navierStokesPreview from "../../../public/presentations/navier-stokes.png";
import extropicPreview from "../../../public/presentations/extropic.png";
import proofsPreview from "../../../public/presentations/proofs.png";

const description =
  "Interactive presentations on mathematics, physics, and computing by Zayd Krunz.";

export const metadata: Metadata = {
  title: "Presentations",
  description,
  alternates: { canonical: "/presentations" },
  openGraph: {
    type: "website",
    url: "/presentations",
    siteName: "Zayd Krunz",
    title: "Presentations // Zayd Krunz",
    description,
    images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Presentations // Zayd Krunz",
    description,
    images: ["/opengraph-image"],
  },
};

// Add new decks here, linking directly to their presenter views.
const presentations = [
  {
    slug: "navier-stokes",
    title: "Can AI crack the mathematics of fluid motion?",
    description:
      "The Navier-Stokes problem, what it means for a fluid equation to break down, and the role of AI in mathematical discovery.",
    href: "https://navier-stokes.zaydkrunz.com/presenter",
    preview: navierStokesPreview,
  },
  {
    slug: "extropic",
    title: "Noise Is Not the Enemy",
    description:
      "A look at Extropic and thermodynamic computing: what happens when a chip computes with thermal noise?",
    href: "https://extropic.zaydkrunz.com/presenter",
    preview: extropicPreview,
  },
  {
    slug: "proofs",
    title: "Prove It",
    description:
      "An introduction to mathematical proof, from counterexamples and logic to induction, contradiction, and a live Proof or Bluff game.",
    href: "https://proofs.zaydkrunz.com/#/presenter/1",
    preview: proofsPreview,
  },
] as const;

export default function PresentationsPage() {
  return (
    <div className="presentations-page container">
      <BackToHomeLink />
      <header>
        <h1>Presentations</h1>
        <h2>Ideas worth a few slides.</h2>
      </header>
      <main>
        <section aria-label="Presentation collection">
          <div className="presentation-grid">
            {presentations.map((presentation, index) => (
              <article className="presentation-card" key={presentation.slug}>
                <a
                  className="presentation-main"
                  href={presentation.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`View slides: ${presentation.title} (opens in a new tab)`}
                >
                  <Image
                    src={presentation.preview}
                    alt=""
                    loading={index === 0 ? "eager" : "lazy"}
                    sizes="(max-width: 768px) calc(100vw - 3rem), 772px"
                    className="presentation-preview"
                  />
                  <div className="presentation-copy">
                    <h3>{presentation.title}</h3>
                    <p>{presentation.description}</p>
                    <span className="presentation-action">
                      View slides <ArrowUpRight size={16} aria-hidden="true" />
                    </span>
                  </div>
                </a>
              </article>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
