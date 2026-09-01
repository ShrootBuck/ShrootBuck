import type { Metadata } from "next";
import BackToHomeLink from "~/components/back-to-home-link";

export const metadata: Metadata = {
  title: "Calculator",
  description: "A browser-based NumWorks calculator simulator.",
  alternates: { canonical: "/calculator" },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/calculator",
    siteName: "Zayd Krunz",
    title: "Calculator // Zayd Krunz",
    description: "A browser-based NumWorks calculator simulator.",
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
    title: "Calculator // Zayd Krunz",
    description: "A browser-based NumWorks calculator simulator.",
    images: [
      {
        url: "/opengraph-image",
        alt: "Zayd Krunz — Student, Programmer, Builder",
      },
    ],
  },
};

export default function CalculatorPage() {
  return (
    <div className="container">
      <BackToHomeLink />
      <header>
        <h1>Calculator</h1>
        <h2>A NumWorks simulator that runs entirely in your browser.</h2>
      </header>
      <section className="calculator-shell" aria-label="Calculator simulator">
        <iframe
          src="https://www.numworks.com/simulator/embed/"
          title="Interactive NumWorks calculator simulator"
          width="368"
          height="720"
          loading="lazy"
          className="calculator-frame"
        />
      </section>
    </div>
  );
}
