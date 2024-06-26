"use client";

import React from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
} from "@nextui-org/react";
import { useSelectedLayoutSegment } from "next/navigation";

type NavbarItem = {
  label: string;
  href: string;
};

export default function CustomNavbar() {
  const navbarItems: NavbarItem[] = [
    {
      label: "Mean Reversion",
      href: "mean-reversion",
    },
  ];

  const layoutSegment = useSelectedLayoutSegment();

  return (
    <Navbar>
      <NavbarBrand>
        <Link className="text-inherit" href="/dashboard">
          Joshonomics 0.0.1
        </Link>
      </NavbarBrand>
      <NavbarContent className="hidden gap-4 sm:flex" justify="center">
        {navbarItems.map((item) => (
          <NavbarItem key={item.href} isActive={layoutSegment === item.href}>
            <Link
              color={layoutSegment === item.href ? "primary" : "foreground"}
              href={`/dashboard/${item.href}`}
            >
              {item.label}
            </Link>
          </NavbarItem>
        ))}
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem>Sign Out</NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
