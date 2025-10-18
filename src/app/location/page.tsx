import { LucideMapPin } from "lucide-react";
import Link from "next/link";

export default function LocationPage() {
  return (
    <>
      <div className="p-5">
        <Link href="/">← Back</Link>
      </div>
      <div className="container">
        <header>
          <h1
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "0.5rem",
            }}
          >
            <LucideMapPin size={32} style={{ color: "var(--accent)" }} />
            Location Tracker
          </h1>
          <h2>How does this work?</h2>
        </header>

        <main>
          <section>
            <h3>The System</h3>
            <p>
              It&apos;s pretty simple. At sunrise and sunset, an iOS Shortcut
              sends my iPhone&apos;s current location to the{" "}
              <code>/api/location</code> route in a POST request. The server
              then stores the data in a PostgreSQL database (which is overkill)
              and serves it to visitors.
            </p>
            <p>
              This gives you a real-time view of where I am in the world,
              updated automatically throughout the day. It&apos;s useful for
              friends and family, and honestly just a fun little project.{" "}
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
              .
            </p>
          </section>
        </main>
      </div>
    </>
  );
}
