"use client";

import FuzzyText from "~/components/FuzzyText/FuzzyText";
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="relative flex min-h-[75dvh] flex-col">
      <h1 className="sr-only">404: Page not found</h1>
      <div className="flex justify-start p-5">
        <Link
          id="not-found-back"
          href="/"
          className="inline-block w-fit max-w-full"
        >
          <span className="sr-only">Back to home</span>
          <FuzzyText
            baseIntensity={0.1}
            hoverIntensity={0.25}
            enableHover={true}
            fontSize="clamp(1rem, 2vw, 1.5rem)"
            fontWeight={600}
          >
            ← Back
          </FuzzyText>
        </Link>
      </div>
      <div className="flex flex-grow flex-col items-center justify-center p-4 text-center">
        <div className="mt-[-2rem] max-w-full overflow-hidden">
          <FuzzyText
            baseIntensity={0.2}
            hoverIntensity={0.5}
            enableHover={true}
            fontSize="clamp(6rem, 15vw, 12rem)"
            fontWeight={900}
          >
            404
          </FuzzyText>
        </div>
        <div className="max-w-full overflow-hidden">
          <FuzzyText
            baseIntensity={0.1}
            hoverIntensity={0.25}
            enableHover={true}
            fontSize="clamp(1.5rem, 5vw, 3rem)"
            fontWeight={700}
          >
            Not Found
          </FuzzyText>
        </div>
      </div>
    </main>
  );
}
