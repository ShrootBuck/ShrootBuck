"use client";

import FuzzyText from "~/components/FuzzyText/FuzzyText";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="relative flex min-h-screen flex-col">
      <div className="p-5">
        <Link href="/">
          <FuzzyText
            baseIntensity={0.1}
            hoverIntensity={0.25}
            enableHover={true}
            fontSize="clamp(1rem, 2vw, 1.5rem)" // Appropriate size for back button
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
            fontSize="clamp(6rem, 15vw, 12rem)" // Larger size for the 404
            fontWeight={900}
          >
            404
          </FuzzyText>
        </div>
        <div className="mt-2"></div>
        <div className="max-w-full overflow-hidden">
          <FuzzyText
            baseIntensity={0.1}
            hoverIntensity={0.25}
            enableHover={true}
            fontSize="clamp(1.5rem, 5vw, 3rem)" // Smaller size for "Not Found"
            fontWeight={700}
          >
            Not Found
          </FuzzyText>
        </div>
      </div>
    </div>
  );
}
