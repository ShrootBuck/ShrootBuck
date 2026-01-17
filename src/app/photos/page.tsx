"use client";

import Image from "next/image";

import Masonry from "react-masonry-css";
import BackToHomeLink from "~/components/back-to-home-link";

const NUM_IMAGES = 22;

const images = Array.from(
  { length: NUM_IMAGES },
  (_, i) =>
    `https://nctnabncanovcjnyqiid.supabase.co/storage/v1/object/public/PublicStorage/Photography/${i + 1}.jpeg`,
);

const breakpointColumnsObj = {
  default: 4,
  1100: 3,
  700: 2,
  500: 1,
};

export default function PhotographyPage() {
  return (
    <div>
      <div className="container">
        <BackToHomeLink />
        <header>
          <h1>Photos</h1>
          <h2>A pretty random collection of photos taken over the years.</h2>
        </header>
      </div>
      <div className="px-4">
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="my-masonry-grid"
          columnClassName="my-masonry-grid_column"
        >
          {images
            .slice()
            .reverse()
            .map((src, index) => (
              <div key={index} className="mb-6 cursor-pointer">
                <a href={src} target="_blank" rel="noopener noreferrer">
                  <Image
                    src={src}
                    alt={`Photo ${index + 1}`}
                    width={500}
                    height={500}
                    priority
                    className="h-auto w-full rounded-lg transition-all duration-150 ease-in-out hover:shadow-[0_0_35px_10px_rgba(255,255,255,0.4)]"
                  />
                </a>
              </div>
            ))}
        </Masonry>
      </div>
    </div>
  );
}
