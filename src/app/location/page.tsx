import type { Metadata } from "next";
import { LucideMapPin } from "lucide-react";
import BackToHomeLink from "~/components/back-to-home-link";

export const metadata: Metadata = {
  title: "Location",
  description: "How Zayd's approximate location and local-time tracker works.",
  alternates: { canonical: "/location" },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/location",
    siteName: "Zayd Krunz",
    title: "Location // Zayd Krunz",
    description:
      "How Zayd's approximate location and local-time tracker works.",
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
    title: "Location // Zayd Krunz",
    description:
      "How Zayd's approximate location and local-time tracker works.",
    images: [
      {
        url: "/opengraph-image",
        alt: "Zayd Krunz — Student, Programmer, Builder",
      },
    ],
  },
};

export default function LocationPage() {
  return (
    <div className="container">
      <BackToHomeLink />

      <header>
        <h1 className="flex items-center justify-center gap-2">
          <LucideMapPin size={32} className="text-[var(--accent)]" />
          Location Tracker
        </h1>
        <h2>How does this work?</h2>
      </header>

      <main>
        <section>
          <h3>The System</h3>
          <p>
            It&apos;s pretty simple. At sunrise and sunset, an iOS Shortcut
            sends my iPhone&apos;s approximate current location to the{" "}
            <code>/api/location</code> route in a POST request. The server then
            stores the data in a database and serves it to visitors.
          </p>
          <p>
            This gives you a rough snapshot of where I am in the world, not a
            live GPS feed, plus the current local time. It&apos;s useful for
            friends and family, and honestly just a fun project.
          </p>

          <p>
            If you&apos;re interested in how this works technically, you can
            find the complete source of this entire website on{" "}
            <a
              href="https://github.com/ShrootBuck/ShrootBuck"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
            . The shortcut file can be downloaded{" "}
            <a href="/UploadLocationToServer.shortcut" download>
              here
            </a>
            .
          </p>
        </section>
      </main>
    </div>
  );
}
