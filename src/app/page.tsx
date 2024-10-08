"use client";

import { TextHoverEffect } from "~/components/ui/text-hover-effect";
import { NavBar } from "./navigation-menu";
import Test from "./test";

export default function Home() {
  return (
    <>
      <NavBar />
      <h1 className="pt-5 text-center text-3xl sm:text-5xl">
        Hi 👋, I&apos;m <TextHoverEffect text="Zayd Krunz" />
      </h1>
      <h2 className="text-center">A Software Engineer from Tucson, AZ</h2>
    </>
  );
}
