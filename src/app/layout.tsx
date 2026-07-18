import "~/styles/globals.css";
import { type Metadata } from "next";
import { Footer } from "~/components/ui/footer";

const nerdFavicon = "https://fav.farm/🤓";

export const metadata: Metadata = {
  metadataBase: new URL("https://zaydkrunz.com"),
  title: {
    default: "Zayd Krunz",
    template: "%s // Zayd Krunz",
  },
  description: "Student, Programmer, Builder",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: "Zayd Krunz",
    title: "Zayd Krunz",
    description: "Student, Programmer, Builder",
  },
  twitter: {
    card: "summary_large_image",
    title: "Zayd Krunz",
    description: "Student, Programmer, Builder",
  },
  icons: {
    icon: nerdFavicon,
    apple: nerdFavicon,
    shortcut: nerdFavicon,
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        {children}
        <Footer />
      </body>
    </html>
  );
}
