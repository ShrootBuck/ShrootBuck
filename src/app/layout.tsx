import "~/styles/globals.css";

import { GeistSans } from "geist/font/sans";

import { TRPCReactProvider } from "~/trpc/react";
import { NextUIProvider } from "@nextui-org/react";
import CustomNavbar from "./navbar";

export const metadata = {
  title: "Zayd Krunz's Website",
  description: "Zayd Krunz's Website & Portfolio",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${GeistSans.variable} bg-background text-foreground dark`}
    >
      <body>
        <TRPCReactProvider>
          <NextUIProvider>
            <CustomNavbar />

            {children}
          </NextUIProvider>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
