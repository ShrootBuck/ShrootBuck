import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Photos",
};

export default function PhotosLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
