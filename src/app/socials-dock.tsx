import React from "react";
import { FloatingDock } from "~/components/ui/floating-dock";
import Image from "next/image";

export function SocialsDock() {
  const links = [
    {
      title: "Email",
      icon: <Image src="/email.svg" width={100} height={100} alt="Email" />,
      href: "mailto:contact@zaydkrunz.com",
    },
    {
      title: "Twitter",
      icon: <Image src="/x.svg" width={100} height={100} alt="X" />,
      href: "https://x.com/ShrootBuck",
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
    <div className="flex w-full items-center justify-center">
      <FloatingDock items={links} />
    </div>
  );
}
