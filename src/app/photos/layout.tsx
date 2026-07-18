import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Photos",
  description: "A collection of photos Zayd has taken over the years.",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/photos",
    siteName: "Zayd Krunz",
    title: "Photos // Zayd Krunz",
    description: "A collection of photos Zayd has taken over the years.",
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
    title: "Photos // Zayd Krunz",
    description: "A collection of photos Zayd has taken over the years.",
    images: [
      {
        url: "/opengraph-image",
        alt: "Zayd Krunz — Student, Programmer, Builder",
      },
    ],
  },
};

export default function PhotosLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
