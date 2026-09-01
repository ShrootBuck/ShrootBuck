import Image from "next/image";

import BackToHomeLink from "~/components/back-to-home-link";

const photos: Record<string, { alt: string; width: number; height: number }> = {
  "1.jpeg": {
    alt: "Snow-covered pines and a mountain ridge seen from a chairlift",
    width: 1600,
    height: 1200,
  },
  "2.jpeg": {
    alt: "Parliament Hill in Ottawa beneath towering summer clouds",
    width: 1600,
    height: 1200,
  },
  "3.jpeg": {
    alt: "A glowing hot-air balloon floating between a church and stone tower",
    width: 1600,
    height: 1200,
  },
  "4.jpeg": {
    alt: "Google sign suspended inside a glass campus walkway",
    width: 1600,
    height: 1200,
  },
  "5.jpeg": {
    alt: "Tyrannosaurus rex skeleton sculpture on the Google campus",
    width: 1600,
    height: 1200,
  },
  "6.jpeg": {
    alt: "The Golden Gate Bridge under an overcast sky",
    width: 1600,
    height: 1200,
  },
  "7.jpeg": {
    alt: "Roadside Google sign at the Mountain View campus",
    width: 1600,
    height: 1200,
  },
  "8.jpeg": {
    alt: "Welcome wall inside Google Bay View",
    width: 1600,
    height: 1200,
  },
  "9.jpeg": {
    alt: "Google Bay View's sweeping roof beneath a rippled sky",
    width: 1600,
    height: 1200,
  },
  "10.jpeg": {
    alt: "Blue Intel cube outside the company's Santa Clara campus",
    width: 1600,
    height: 1200,
  },
  "11.jpeg": {
    alt: "Google Bay View entrance with an open-internet message",
    width: 1600,
    height: 1200,
  },
  "12.jpeg": {
    alt: "NASA Ames Research Center hangar behind its perimeter fence",
    width: 1600,
    height: 1200,
  },
  "13.jpeg": {
    alt: "Two budgies perched together beside a window",
    width: 1200,
    height: 1600,
  },
  "14.jpeg": {
    alt: "Large pink flower mural painted across a black brick wall",
    width: 1600,
    height: 1200,
  },
  "15.jpeg": {
    alt: "A grinning smiley-faced Mona Lisa mural",
    width: 1600,
    height: 1200,
  },
  "16.jpeg": {
    alt: "Layered city murals featuring a rooster and a geometric portrait",
    width: 1600,
    height: 1200,
  },
  "17.jpeg": {
    alt: "Two budgies perched in front of a brightly lit Christmas tree",
    width: 1200,
    height: 1500,
  },
  "18.jpeg": {
    alt: "A quiet cabin yard covered in fresh snow",
    width: 1600,
    height: 1200,
  },
  "19.jpeg": {
    alt: "A tree-lined path forming a dense green tunnel",
    width: 1600,
    height: 1200,
  },
  "20.jpeg": {
    alt: "Maman spider sculpture outside the National Gallery of Canada",
    width: 1200,
    height: 1600,
  },
  "21.jpeg": {
    alt: "Purple mural of a woman holding a glowing orb",
    width: 1600,
    height: 1200,
  },
  "22.jpeg": {
    alt: "Colorful street-art mural centered on a roaring tiger",
    width: 1600,
    height: 1200,
  },
};

const imageFiles = JSON.parse(
  process.env.NEXT_PUBLIC_PHOTOS ?? "[]",
) as string[];

export default function PhotographyPage() {
  return (
    <main className="photo-page">
      <div className="container">
        <BackToHomeLink />
        <header>
          <h1>Photos</h1>
          <h2>
            A pretty random roll from mountains, cities, and wherever else.
          </h2>
        </header>
      </div>
      <div className="photo-grid" aria-label="Photo gallery">
        {imageFiles.map((file, index) => {
          const photo = photos[file] ?? {
            alt: "A photograph by Zayd Krunz",
            width: 1600,
            height: 1200,
          };
          const src = `/photos/${file}`;

          return (
            <figure key={file} className="photo-item">
              <a
                href={src}
                target="_blank"
                rel="noopener noreferrer"
                className="photo-link"
              >
                <Image
                  src={src}
                  alt={photo.alt}
                  width={photo.width}
                  height={photo.height}
                  sizes="(max-width: 500px) calc(100vw - 2rem), (max-width: 700px) calc((100vw - 3.25rem) / 2), (max-width: 1100px) calc((100vw - 4.5rem) / 3), calc((100vw - 5.75rem) / 4)"
                  priority={index === 0}
                  className="photo-image"
                />
                <span className="photo-caption">
                  {photo.alt}
                  <span aria-hidden="true">↗</span>
                </span>
              </a>
            </figure>
          );
        })}
      </div>
    </main>
  );
}
