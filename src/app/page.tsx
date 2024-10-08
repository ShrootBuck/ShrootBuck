"use client";

import { TextHoverEffect } from "~/components/ui/text-hover-effect";
import { NavBar } from "./navigation-menu";
import { SocialsDock } from "./socials-dock";

export default function Home() {
  return (
    <>
      <NavBar />
      <h1 className="pt-5 text-center text-3xl sm:text-5xl">
        Hi 👋, I&apos;m <span className="lg:hidden">Zayd Krunz</span>
        <TextHoverEffect text="Zayd Krunz" />
      </h1>
      <h2 className="text-center text-xl">
        A Software Engineer from Tucson, AZ
      </h2>
      <SocialsDock />
    </>
  );
}
