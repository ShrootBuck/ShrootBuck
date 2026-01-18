import "~/styles/globals.css";
import { type Metadata } from "next";
import { Footer } from "~/components/ui/footer";
import { PostHogProvider } from "./providers";
import PostHogPageView from "./posthog-pageview";

export const metadata: Metadata = {
  title: {
    default: "Zayd Krunz",
    template: "%s // Zayd Krunz",
  },
  description: "Student, Programmer, Builder",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon.png", type: "image/png", sizes: "32x32" },
    ],
    apple: "/apple-touch-icon.png",
    other: [
      {
        rel: "android-chrome",
        url: "/android-chrome-192x192.png",
        sizes: "192x192",
      },
      {
        rel: "android-chrome",
        url: "/android-chrome-512x512.png",
        sizes: "512x512",
      },
    ],
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
