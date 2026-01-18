import type { Metadata } from "next";
import BackToHomeLink from "~/components/back-to-home-link";

export const metadata: Metadata = {
  title: "Research",
};

const posters = [
  {
    imageUrl:
      "https://nctnabncanovcjnyqiid.supabase.co/storage/v1/object/public/PublicStorage/Sharma_Krunz_Weakly_Supervised_RFI_Poster.png",
  },
  {
    imageUrl:
      "https://raw.githubusercontent.com/ShrootBuck/stanford-predictive-maintenance/refs/heads/main/Poster.png",
    webUrl: "/spcs",
    alt: "Stanford Pre-Collegiate Studies Poster",
  },
];

export default function ResearchPage() {
  return (
    <div className="container">
      <BackToHomeLink />

      <header>
        <h1>Research</h1>
        <h2>
          Posters
          <span style={{ color: "#ffffff", userSelect: "none" }}>{" // "}</span>
          Papers
        </h2>
      </header>

      <main>
        <section id="posters">
          <h3>Posters</h3>
          <p
            style={{
              fontStyle: "italic",
              color: "var(--text-secondary)",
              marginBottom: "1.5rem",
            }}
          >
            Some posters are clickable and have more information.
          </p>
          <div className="poster-grid">
            {posters.map((poster, index) => (
              <div key={index}>
                {poster.webUrl ? (
                  <a
                    href={poster.webUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block"
                  >
                    <img
                      src={poster.imageUrl}
                      alt={poster.alt}
                      className="h-auto w-full rounded-lg transition-all duration-150 ease-in-out hover:shadow-[0_0_35px_10px_rgba(255,255,255,0.4)]"
                    />
                  </a>
                ) : (
                  <img
                    src={poster.imageUrl}
                    alt={poster.alt}
                    className="h-auto w-full rounded-lg"
                  />
                )}
              </div>
            ))}
          </div>
        </section>

        <section id="papers">
          <h3>Papers</h3>
          <p style={{ fontStyle: "italic", color: "var(--text-secondary)" }}>
            Coming soon...
          </p>
        </section>
      </main>
    </div>
  );
}
