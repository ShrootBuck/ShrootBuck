/* eslint-disable @next/next/no-img-element */

import { TextHoverEffect } from "~/components/ui/text-hover-effect";
import { SocialsDock } from "./socials-dock";
import Link from "next/link";
import { LucideMapPin } from "lucide-react";
import { prisma } from "~/lib/utils";
import Image from "next/image";

export const dynamic = "force-dynamic";

type Language = {
  name: string; // Used for SVGs
  url: string; // URL to language home page
};

const languages: Language[] = [
  { name: "go", url: "https://go.dev" },
  { name: "zig", url: "https://ziglang.org" },
  {
    name: "javascript",
    url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
  },
  { name: "lua", url: "https://www.lua.org" },
  { name: "php", url: "https://www.php.net" },
  { name: "python", url: "https://www.python.org" },
  { name: "rust", url: "https://www.rust-lang.org" },
  { name: "typescript", url: "https://www.typescriptlang.org" },
].sort((a, b) => a.name.localeCompare(b.name));

export default async function Home() {
  const currentLocation = await prisma.location.findFirst({
    where: { id: "0" },
  });

  return (
    <>
      <h1 className="pt-10 text-center text-3xl sm:text-5xl">
        Hi 👋, I&apos;m <span className="lg:hidden">Zayd Krunz</span>
        <TextHoverEffect text="Zayd Krunz" />
      </h1>
      <h2 className="text-center text-xl">A programmer from Tucson, AZ</h2>
      <h3 className="flex items-center justify-center gap-2 pt-12 text-center text-lg leading-none">
        <LucideMapPin className="text-blue-600" />
        <span className="whitespace-normal">
          <span className="font-semibold">Location:</span>{" "}
          <span>{currentLocation?.location}</span>
        </span>
      </h3>
      <p className="text-center">
        <Link className="text-blue-600 hover:text-blue-500" href="/location">
          How does this work?
        </Link>
      </p>
      <h3 className="pt-12 text-center text-lg">Programming Languages</h3>
      <div className="flex flex-wrap justify-center">
        {languages.map((lang) => (
          <Link key={lang.name} href={lang.url} target="_blank">
            <Image
              src={`/${lang.name}.svg`}
              alt={lang.name}
              width={48}
              height={48}
              className="m-2"
            />
          </Link>
        ))}
      </div>
      <div className="flex flex-col items-center justify-center p-10 md:flex-row">
        <div className="flex flex-col items-center md:flex-row">
          <img
            src="https://github-readme-stats.vercel.app/api?username=ShrootBuck&hide=stars&hide_title=false&hide_rank=true&show_icons=true&include_all_commits=true&count_private=true&disable_animations=false&theme=dark&locale=en&hide_border=false&order=1"
            alt=""
            className="mb-5 h-[170px] w-[350px] object-contain md:mb-0 md:mr-5"
          />
          <img
            src="https://github-readme-stats.vercel.app/api/top-langs?username=ShrootBuck&locale=en&hide_title=false&layout=compact&card_width=320&langs_count=5&theme=dark&hide_border=false&order=2"
            alt=""
            className="h-[170px] w-[350px] object-contain"
          />
        </div>
      </div>

      <h3 className="text-center text-lg">Other Things</h3>
      <div className="flex justify-center pb-5">
        <ul>
          <li className="list-disc">
            <Link
              className="text-blue-600 hover:text-blue-500"
              target="_blank"
              href="https://warden.zaydkrunz.com"
            >
              Warden Anti-Cheat
            </Link>
          </li>
          <li className="list-disc">
            <Link className="text-blue-600 hover:text-blue-500" href="/things">
              Stuff I Use
            </Link>
          </li>
        </ul>
      </div>
      <SocialsDock />
    </>
  );
}
