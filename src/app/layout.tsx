import "~/styles/globals.css";
import { type Metadata } from "next";
import { Footer } from "~/components/ui/footer";

export const metadata: Metadata = {
  title: "Zayd Krunz",
  description: "Student, Programmer, Aspiring Quant Researcher",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta
          name="description"
          content="Student, Programmer, Aspiring Quant Researcher"
        />
      </head>
      <body>
        {children}
        <Footer />
      </body>
    </html>
  );
}
