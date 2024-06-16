import "~/styles/globals.css";

import { TRPCReactProvider } from "~/trpc/react";

export const metadata = {
  title: "ShrootBuck",
  description: "ShrootBuck's personal website.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <TRPCReactProvider>{children}</TRPCReactProvider>
      </body>
    </html>
  );
}
