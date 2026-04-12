import "~/styles/globals.css";
import { type Metadata } from "next";
import { Footer } from "~/components/ui/footer";
import { PostHogProvider } from "./providers";
import PostHogPageView from "./posthog-pageview";

const nerdFavicon = "https://fav.farm/🤓";

export const metadata: Metadata = {
  title: {
    default: "Zayd Krunz",
    template: "%s // Zayd Krunz",
  },
  description: "Student, Programmer, Builder",
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
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="Student, Programmer, Builder" />
      </head>
      <body>
        <PostHogProvider>
          <PostHogPageView />
          {children}
          <Footer />
        </PostHogProvider>
      </body>
    </html>
  );
}
