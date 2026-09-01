import "@fontsource/commit-mono/400.css";
import "@fontsource/commit-mono/700.css";
import "~/styles/globals.css";
import type { Metadata, Viewport } from "next";
import { Footer } from "~/components/ui/footer";

const nerdFavicon = "https://fav.farm/🤓";

export const metadata: Metadata = {
  metadataBase: new URL("https://zaydkrunz.com"),
  title: {
    default: "Zayd Krunz",
    template: "%s // Zayd Krunz",
  },
  description:
    "Zayd Krunz is a student, programmer, and builder working across AI, competitive programming, and applied research.",
  applicationName: "Zayd Krunz",
  authors: [{ name: "Zayd Krunz", url: "https://zaydkrunz.com" }],
  creator: "Zayd Krunz",
  keywords: [
    "Zayd Krunz",
    "software engineering",
    "competitive programming",
    "artificial intelligence",
    "machine learning",
    "research",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: "Zayd Krunz",
    title: "Zayd Krunz",
    description:
      "Student, programmer, and builder working across AI, competitive programming, and applied research.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Zayd Krunz",
    description:
      "Student, programmer, and builder working across AI, competitive programming, and applied research.",
  },
  icons: {
    icon: nerdFavicon,
    apple: nerdFavicon,
    shortcut: nerdFavicon,
  },
};

export const viewport: Viewport = {
  colorScheme: "dark",
  themeColor: "#000000",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body>
        <div className="site-content">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
