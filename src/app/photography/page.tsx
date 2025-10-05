"use client";

import Link from "next/link";
import Image from "next/image";

import Masonry from "react-masonry-css";

const NUM_IMAGES = 21;

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
    <div className="py-8">
      <Link
        href="/"
        className="mb-4 block text-center text-gray-400 hover:text-white"
      >
        &larr; Back to Home
      </Link>
      <h1 className="text-center text-4xl font-bold">Photos</h1>
      <p className="mb-8 text-center text-gray-400">
        A pretty random collection of photos taken over the years.
      </p>
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
