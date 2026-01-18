import type { Metadata } from "next";
import Script from "next/script";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Calculator",
};

export default function CalculatorPage() {
  return (
    <>
      <div className="p-5">
        <Link href="/">← Back</Link>
      </div>
      <div className="flex justify-center">
        <iframe
          src="https://www.numworks.com/simulator/embed/"
          width="368px"
          height="720px"
        />
      </div>
      <Script src="https://www.numworks.com/simulator/embed.js" />
    </>
  );
}
