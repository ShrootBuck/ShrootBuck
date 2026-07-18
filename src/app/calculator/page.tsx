import type { Metadata } from "next";
import Script from "next/script";
import BackToHomeLink from "~/components/back-to-home-link";

export const metadata: Metadata = {
  title: "Calculator",
  description: "A browser-based NumWorks calculator simulator.",
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
      <div className="flex justify-center">
        <iframe
          src="https://www.numworks.com/simulator/embed/"
          width="368px"
          height="720px"
        />
      </div>
      <Script src="https://www.numworks.com/simulator/embed.js" />
    </div>
  );
}
