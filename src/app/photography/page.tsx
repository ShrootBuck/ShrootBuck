"use client";

import Link from "next/link";
import Image from "next/image";

import Masonry from "react-masonry-css";

const images = [
  // Top is oldest, bottom is newest
  "https://8upload.com/image/68c79bb3e9e9d/IMG_1901.jpeg",
  "https://8upload.com/image/68c79bb200d18/IMG_1905.jpeg",
  "https://8upload.com/image/68c79bb005ca6/IMG_1899.jpeg",
  "https://8upload.com/image/68c79bae0236f/IMG_1900.jpeg",
  "https://8upload.com/image/68c79bac0fe01/69946216514__1D2758C2-12A0-40AD-B191-E0DB8E5F5039.jpeg",
  "https://8upload.com/image/68c79bab6e158/IMG_0843.jpeg",
  "https://8upload.com/image/68c79ba92714f/IMG_0048.jpeg",
  "https://8upload.com/image/68c79ba7b62d5/IMG_4464.jpeg",
  "https://8upload.com/image/68c79ba5b1494/IMG_1884.jpeg",
  "https://8upload.com/image/68c79f53459ce/IMG_1903.jpeg",
  "https://8upload.com/image/68c79f5566476/IMG_1904.jpeg",
  "https://8upload.com/image/68c79f576ae1b/774b1318-c583-4e8c-89cd-f0fec9317e17.jpeg",
  "https://8upload.com/image/68c79f57e7281/IMG_2146.jpeg",
  "https://8upload.com/image/68c79f59e0d80/IMG_2150.jpeg",
  "https://8upload.com/image/68c79f5c0db5e/IMG_3093.jpeg",
];

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
        Once my iPhone 17 Pro arrives, I will hopefully be taking higher quality
        pictures.
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
