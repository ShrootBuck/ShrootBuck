import type { Metadata } from "next";
import Image from "next/image";
import {
  ArrowUpRight,
  FileText,
  Presentation,
} from "lucide-react";
import BackToHomeLink from "~/components/back-to-home-link";

export const metadata: Metadata = {
  title: "Tiger Mountain Container Farm",
  description:
    "How I turned an infeasible desert container-farm brief into a measurable pilot plan and credible commercial procurement path for Tiger Mountain Foundation.",
  openGraph: {
    type: "article",
    locale: "en_US",
    url: "/projects/tiger-mountain",
    siteName: "Zayd Krunz",
    title: "Tiger Mountain Container Farm // Zayd Krunz",
    description:
      "A sub-$100-per-unit target met 115°F heat. I redesigned the path forward.",
    images: [
      {
        url: "/tiger-mountain/og.png",
        width: 1200,
        height: 630,
        alt: "Tiger Mountain Container Farm case study",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Tiger Mountain Container Farm // Zayd Krunz",
    description:
      "A sub-$100-per-unit target met 115°F heat. I redesigned the path forward.",
    images: [
      {
        url: "/tiger-mountain/og.png",
        alt: "Tiger Mountain Container Farm case study",
      },
    ],
  },
};

const reportUrl = "/tiger-mountain/container-farm-concept-design.pdf";
const presentationUrl = "/tiger-mountain/container-farm-presentation.pdf";

export default function TigerMountainCaseStudy() {
  return (
    <main className="case-study-container container">
      <nav className="case-study-topbar" aria-label="Case study navigation">
        <BackToHomeLink />
        <span>CLIENT CASE STUDY // 2026</span>
      </nav>

      <article>
        <header className="case-study-hero">
          <p className="case-study-kicker">
            ASU EPICS // TIGER MOUNTAIN FOUNDATION // JUNE 2026
          </p>
          <h1>
            A sub-$100-per-unit target met 115°F heat. I redesigned the path
            forward.
          </h1>
          <p className="case-study-lede">
            Working within a three-person ASU EPICS team, I independently
            developed the project&apos;s research, system concept, technical
            analysis, and final deliverables. When Tiger Mountain
            Foundation&apos;s budget proved insufficient for commercial climate
            control, I split the recommendation into a measurable pilot plan
            and a separately funded procurement path.
          </p>

          <div className="case-study-role">
            <span>MY ROLE</span>
            <p>
              Project lead; independently completed all research, system design,
              technical analysis, report, and presentation development.
            </p>
          </div>

          <div className="case-study-actions" aria-label="Project documents">
            <a
              href={reportUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="case-study-action case-study-action-primary"
            >
              Read the design package
              <ArrowUpRight size={17} aria-hidden="true" />
            </a>
            <a
              href={presentationUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="case-study-action"
            >
              View the recommendation deck
              <ArrowUpRight size={17} aria-hidden="true" />
            </a>
          </div>

          <dl className="case-study-facts" aria-label="Project details">
            <div>
              <dt>Partner</dt>
              <dd>Tiger Mountain Foundation</dd>
            </div>
            <div>
              <dt>Program</dt>
              <dd>ASU EPICS Summer Design</dd>
            </div>
            <div>
              <dt>Team</dt>
              <dd>Zayd Krunz, Jackson Petersen, Ethan Nojaim</dd>
            </div>
          </dl>
        </header>

        <nav className="case-study-index" aria-label="On this page">
          <span>ON THIS PAGE</span>
          <a href="#brief">01 Brief</a>
          <a href="#pivot">02 Strategy</a>
          <a href="#architecture">03 System</a>
          <a href="#deliverables">04 Handoff</a>
        </nav>

        <section className="case-study-section" id="brief">
          <div className="case-study-section-heading">
            <p>01 // THE BRIEF</p>
            <div>
              <h2>One brief. Three demands that could not all be true.</h2>
              <p>
                The target combined prototype-level spending with
                commercial-level performance. Treating those as the same project
                would have produced a flimsy build and worse advice.
              </p>
            </div>
          </div>

          <div className="constraint-grid">
            <div className="constraint-card constraint-card-blue">
              <span>CAPITAL TARGET</span>
              <strong>&lt;$100</strong>
              <p>per unit in the original brief</p>
            </div>
            <div className="constraint-card constraint-card-amber">
              <span>SUMMER HEAT</span>
              <strong>115°F</strong>
              <p>ambient peak conditions</p>
            </div>
            <div className="constraint-card constraint-card-green">
              <span>PRODUCTION GOAL</span>
              <strong>365 days</strong>
              <p>of greens and herb production</p>
            </div>
          </div>
        </section>

        <section className="case-study-section" id="pivot">
          <div className="case-study-section-heading">
            <p>02 // THE STRATEGY</p>
            <div>
              <h2>Separate cheap learning from full-scale production.</h2>
              <p>
                I reframed the work as two connected tracks: one to reduce
                uncertainty on site, and one to fund and procure the system the
                original brief actually described.
              </p>
            </div>
          </div>

          <div className="track-grid">
            <div className="track-card">
              <div className="track-card-topline">
                <span>TRACK A</span>
                <span>PILOT PLAN</span>
              </div>
              <h3>Measurable passive pilot</h3>
              <p>
                Shade the water path, purge hot standing water, buffer the
                reservoir, and log root-zone temperature, pH, EC, power, and
                maintenance on one greens-and-herbs module.
              </p>
              <span className="track-outcome">BUYS SITE EVIDENCE</span>
            </div>

            <div className="track-card">
              <div className="track-card-topline">
                <span>TRACK B</span>
                <span>FUND SEPARATELY</span>
              </div>
              <h3>Commercial procurement</h3>
              <p>
                Use those measurements to scope vendor quotes, utilities,
                warranties, training, and grant applications for a proper
                controlled-environment farm.
              </p>
              <span className="track-outcome">
                BUYS A CREDIBLE CAPITAL PLAN
              </span>
            </div>
          </div>

          <blockquote className="case-study-quote">
            <span>THE REFRAME</span>
            The pilot plan&apos;s job was to reduce uncertainty, not impersonate
            the finished farm.
          </blockquote>
        </section>

        <section className="case-study-section" id="architecture">
          <div className="case-study-section-heading">
            <p>03 // THE SYSTEM</p>
            <div>
              <h2>
                Reduce the heat load first. Refrigerate only if data says to.
              </h2>
              <p>
                The concept separates water intake, hydroponics, cooling, and
                electrical controls so each layer can be tested and upgraded
                independently.
              </p>
            </div>
          </div>

          <figure className="architecture-figure">
            <Image
              src="/tiger-mountain/architecture.jpg"
              alt="Container farm architecture showing water intake, hydroponic loop, cooling envelope, and solar-ready controls"
              width={1800}
              height={980}
              sizes="(max-width: 768px) calc(100vw - 3rem), 1080px"
              priority
            />
            <figcaption>
              The concept architecture I developed for the final design package.
              Each layer can be piloted and upgraded independently.
            </figcaption>
          </figure>

          <div className="decision-steps">
            <div>
              <span>01 // PROTECT</span>
              <h3>Stop avoidable heat gain.</h3>
              <p>Shade lines, flush hot water, and buffer the root zone.</p>
            </div>
            <div>
              <span>02 // MEASURE</span>
              <h3>Instrument the real system.</h3>
              <p>Log temperature, water chemistry, power, and labor.</p>
            </div>
            <div>
              <span>03 // SCALE</span>
              <h3>Spend against evidence.</h3>
              <p>
                Add active cooling and solar only when the data justifies it.
              </p>
            </div>
          </div>
        </section>

        <section className="case-study-section" id="deliverables">
          <div className="case-study-section-heading">
            <p>04 // THE HANDOFF</p>
            <div>
              <h2>Enough detail to act without fake precision.</h2>
              <p>
                I authored the 12-page concept package and seven-slide
                recommendation deck, covering thermal controls, crop modules,
                solar-load logic, procurement gates, phasing, and risk. The
                three-person EPICS team presented the materials to Tiger
                Mountain Foundation. Both documents are explicitly
                concept-level: useful for pilot planning and stakeholder review,
                not construction.
              </p>
            </div>
          </div>

          <div className="deliverable-grid">
            <a
              href={reportUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="deliverable-card"
            >
              <div className="deliverable-preview deliverable-preview-report">
                <Image
                  src="/tiger-mountain/report-cover.webp"
                  alt="Cover of the Tiger Mountain Container Farm concept design package"
                  width={900}
                  height={1165}
                  sizes="(max-width: 768px) calc(100vw - 3rem), 520px"
                />
              </div>
              <div className="deliverable-copy">
                <FileText size={19} aria-hidden="true" />
                <div>
                  <strong>Concept Design Package</strong>
                  <span>12-PAGE REPORT // PDF</span>
                </div>
                <ArrowUpRight size={18} aria-hidden="true" />
              </div>
            </a>

            <a
              href={presentationUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="deliverable-card"
            >
              <div className="deliverable-preview deliverable-preview-deck">
                <Image
                  src="/tiger-mountain/deck-preview.webp"
                  alt="Slide presenting the dual-track container farm framework"
                  width={1200}
                  height={675}
                  sizes="(max-width: 768px) calc(100vw - 3rem), 520px"
                />
              </div>
              <div className="deliverable-copy">
                <Presentation size={19} aria-hidden="true" />
                <div>
                  <strong>Recommendation Deck</strong>
                  <span>7 SLIDES // PDF</span>
                </div>
                <ArrowUpRight size={18} aria-hidden="true" />
              </div>
            </a>
          </div>
        </section>

        <section className="case-study-section case-study-close">
          <div>
            <p>THE TAKEAWAY</p>
            <h2>
              The best engineering answer wasn&apos;t a build. It was a
              sequence.
            </h2>
            <p>
              Protect the system from first-order heat, run a disciplined pilot,
              and let real site data determine the capital plan. Under
              impossible constraints, honest scoping creates more value than a
              doomed prototype ever could.
            </p>
          </div>
        </section>
      </article>
    </main>
  );
}
