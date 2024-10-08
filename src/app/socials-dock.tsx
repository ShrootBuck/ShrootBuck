import React from "react";
import { FloatingDock } from "~/components/ui/floating-dock";
import Image from "next/image";

export function SocialsDock() {
  const links = [
    {
      title: "X",
      icon: <Image src="/x.svg" width={100} height={100} alt="X" />,
      href: "https://x.com/ShrootBuck",
    },
    {
      title: "Discord",
      icon: <Image src="/discord.svg" width={100} height={100} alt="Discord" />,
      href: "https://discord.gg/X5FdNNJk",
    },
    {
      title: "Github",
      icon: <Image src="/github.svg" width={100} height={100} alt="Github" />,
      href: "https://github.com/ShrootBuck",
    },
    {
      title: "Blog",
      icon: <Image src="/ghost.svg" width={100} height={100} alt="Ghost" />,
      href: "https://tenbyte.org",
    },
  ];
  return (
    <div className="flex h-[35rem] w-full items-center justify-center">
      <FloatingDock items={links} />
    </div>
  );
}
