import "~/styles/globals.css";
import { type Metadata } from "next";
import { ThemeProvider } from "~/components/theme-provider";
import { OpenPanelComponent } from "@openpanel/nextjs";

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
        <OpenPanelComponent
          apiUrl="https://analytics.zaydkrunz.com/api"
          clientId="adb0f65a-136e-4f57-9bbc-2825227814a3"
          clientSecret="sec_666c85968aa766da215e"
          trackScreenViews={true}
          trackOutgoingLinks={true}
        />
        <ThemeProvider attribute="class" defaultTheme="dark">
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
