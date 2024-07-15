"use client";

import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  NavbarMenuToggle,
  NavbarMenuItem,
  NavbarMenu,
} from "@nextui-org/react";
import { useSelectedLayoutSegment } from "next/navigation";
import { useState } from "react";

type MenuItem = {
  label: string;
  href: string;
};

export default function CustomNavbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems: MenuItem[] = [
    {
      label: "About Me",
      href: "about",
    },
    {
      label: "Projects",
      href: "projects",
    },
    {
      label: "Blog",
      href: "https://blog.zaydkrunz.com",
    },
    {
      label: "Contact",
      href: "contact",
    },
  ];

  const layoutSegment = useSelectedLayoutSegment();

  return (
    <Navbar onMenuOpenChange={setIsMenuOpen}>
      <NavbarMenuToggle
        aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        className="sm:hidden"
      />
      <NavbarBrand>
        <Link className="text-inherit" href="/">
          Zayd Krunz
        </Link>
      </NavbarBrand>
      <NavbarContent className="hidden gap-4 sm:flex" justify="center">
        {menuItems.map((item, index) => (
          <>
            <NavbarItem key={item.href}>
              <Link
                color={layoutSegment === item.href ? "primary" : "foreground"}
                href={`${item.href}`}
              >
                {item.label}
              </Link>
            </NavbarItem>
            {index === menuItems.length - 1 ? null : <span>|</span>}
          </>
        ))}
      </NavbarContent>
      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item.href}-${index}`}>
            <Link
              color={layoutSegment === item.href ? "primary" : "foreground"}
              className="w-full"
              href={item.href}
              size="lg"
            >
              {item.label}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
      <NavbarContent justify="end">
        {/* <NavbarItem>Sign Out</NavbarItem> */}
      </NavbarContent>
    </Navbar>
  );
}
