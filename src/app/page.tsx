/* eslint-disable @next/next/no-img-element */
"use client";

import { TextHoverEffect } from "~/components/ui/text-hover-effect";
import { SocialsDock } from "./socials-dock";
import Link from "next/link";
import LocationComponent from "./location";

export default function Home() {
  return (
    <>
      <h1 className="pt-10 text-center text-3xl sm:text-5xl">
        Hi 👋, I&apos;m <span className="lg:hidden">Zayd Krunz</span>
        <TextHoverEffect text="Zayd Krunz" />
      </h1>
      <h2 className="text-center text-xl">A programmer from Tucson, AZ</h2>

      <LocationComponent />

      <div className="flex justify-center">
        <ul>
          <li className="list-disc text-blue-600 hover:text-blue-500">
            <Link target="_blank" href="https://warden.zaydkrunz.com">
              Warden Anti-Cheat
            </Link>
          </li>
          <li className="list-disc text-blue-600 hover:text-blue-500">
            <Link href="/things">Stuff I Use</Link>
          </li>
          {/* <li className="list-disc text-blue-600 hover:text-blue-500">
            <Link href="/resume">Resume</Link>
          </li> */}
        </ul>
      </div>

      <div className="flex flex-col items-center justify-center p-10 md:flex-row">
        <div className="flex flex-col items-center md:flex-row">
          <img
            src="https://github-readme-stats.vercel.app/api?username=ShrootBuck&hide=stars&hide_title=false&hide_rank=true&show_icons=true&include_all_commits=true&count_private=true&disable_animations=false&theme=dark&locale=en&hide_border=false&order=1"
            alt="stats graph"
            className="mb-5 md:mb-0 md:mr-5"
          />
          <img
            src="https://github-readme-stats.vercel.app/api/top-langs?username=ShrootBuck&locale=en&hide_title=false&layout=compact&card_width=320&langs_count=5&theme=dark&hide_border=false&order=2"
            alt="languages graph"
          />
        </div>
      </div>

      <SocialsDock />
    </>
  );
}
