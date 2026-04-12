import type { Metadata } from "next";
import Image from "next/image";
import BackToHomeLink from "~/components/back-to-home-link";

export const metadata: Metadata = {
  title: "Research",
};

const posters = [
  {
    imageUrl:
      "https://nctnabncanovcjnyqiid.supabase.co/storage/v1/object/public/PublicStorage/Sharma_Krunz_Weakly_Supervised_RFI_Poster.png",
    alt: "Weakly Supervised RFI Poster",
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
          <span className="nav-separator">{" // "}</span>
          Papers
        </h2>
      </header>

      <main>
        <section id="posters">
          <h3>Posters</h3>

          <div className="poster-grid">
            {posters.map((poster, index) => (
              <div key={index}>
                <Image
                  src={poster.imageUrl}
                  alt={poster.alt}
                  width={3840}
                  height={2880}
                  className="h-auto w-full rounded-lg"
                />
                <div className="mt-2 flex gap-4 text-sm">
                  <a
                    href={poster.imageUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Fullscreen
                  </a>
                  {poster.webUrl && (
                    <a
                      href={poster.webUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      More details
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="papers">
          <h3>Papers</h3>
          <p style={{ fontStyle: "italic" }}>Research coming soon...</p>
        </section>
      </main>
    </div>
  );
}
