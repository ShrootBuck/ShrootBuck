import type { Metadata } from "next";
import Script from "next/script";
import BackToHomeLink from "~/components/back-to-home-link";

export const metadata: Metadata = {
  title: "Calculator",
};

export default function CalculatorPage() {
  return (
    <div className="container">
      <BackToHomeLink />
      <div className="flex justify-center">
        <iframe
          src="https://www.numworks.com/simulator/embed/"
          width="368px"
          height="720px"
        />
      </div>
      <Script src="https://www.numworks.com/simulator/embed.js" />
    </div>
  );
}
