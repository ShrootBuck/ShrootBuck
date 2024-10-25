import "~/styles/globals.css";
import { type Metadata } from "next";
import { ThemeProvider } from "~/components/theme-provider";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Zayd Krunz",
  description: "Zayd Krunz's personal website",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://rsms.me/" />
        <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          {children}
          <Script src="https://unpkg.com/website-carbon-badges@1.1.3/b.min.js" />
        </ThemeProvider>
        <div id="wcb" className="carbonbadge wcb-d pt-24"></div>
      </body>
    </html>
  );
}
