"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

const images = [
  // Top is oldest, bottom is newest
  "https://8upload.com/image/68c79bb5e1766/b28927f7-e2f1-48ed-90a9-7032780ea3a8.jpeg",
  "https://8upload.com/image/68c79bb3e9e9d/IMG_1901.jpeg",
  "https://8upload.com/image/68c79bb200d18/IMG_1905.jpeg",
  "https://8upload.com/image/68c79bb005ca6/IMG_1899.jpeg",
  "https://8upload.com/image/68c79bae0236f/IMG_1900.jpeg",
  "https://8upload.com/image/68c79bac0fe01/69946216514__1D2758C2-12A0-40AD-B191-E0DB8E5F5039.jpeg",
  "https://8upload.com/image/68c79bab6e158/IMG_0843.jpeg",
  "https://8upload.com/image/68c79ba92714f/IMG_0048.jpeg",
  "https://8upload.com/image/68c79ba7b62d5/IMG_4464.jpeg",
  "https://8upload.com/image/68c79ba5b1494/IMG_1884.jpeg",
];

export default function PhotographyPage() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <div className="py-8">
      <Link
        href="/"
        className="mb-4 block text-center text-gray-400 hover:text-white"
      >
        &larr; Back to Home
      </Link>
      <h1 className="mb-8 text-center text-4xl font-bold">Photos</h1>
      <div className="grid grid-cols-1 gap-6 p-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {images
          .slice()
          .reverse()
          .map((src, index) => (
            <div
              key={index}
              className="mb-6 cursor-pointer"
              onClick={() => setSelectedImage(src)}
            >
              <Image
                src={src}
                alt={`Photo ${index + 1}`}
                width={500}
                height={500}
                priority
                className="h-auto w-full rounded-lg transition-all duration-150 ease-in-out hover:shadow-[0_0_35px_10px_rgba(255,255,255,0.4)]"
              />
            </div>
          ))}
      </div>

      {selectedImage && (
        <div
          className="fixed left-0 top-0 z-50 flex h-full w-full items-center justify-center bg-black bg-opacity-80"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative h-full max-h-full w-full max-w-4xl">
            <Image
              src={selectedImage}
              alt="Selected image"
              layout="fill"
              objectFit="contain"
              className="rounded-lg"
            />
          </div>
        </div>
      )}
    </div>
  );
}
