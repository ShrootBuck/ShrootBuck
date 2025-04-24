import "~/styles/globals.css";
import { type Metadata } from "next";
import { ThemeProvider } from "~/components/theme-provider";
import { PostHogProvider } from "~/components/PostHogProvider";

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
        <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta
          name="description"
          content="A programmer from Tucson, AZ. I like to make things."
        />
      </head>
      <body>
        <PostHogProvider>
          <ThemeProvider attribute="class" defaultTheme="dark">
            {children}
          </ThemeProvider>
        </PostHogProvider>
      </body>
    </html>
  );
}
