import Image from "next/image";

export function Footer() {
  return (
    <footer>
      <div className="signature-section">
        <Image
          src="/signature.svg"
          alt="Signature of Zayd Krunz"
          width={300}
          height={100}
          draggable={false}
        />
      </div>
      <p>
        Copyright {new Date().getFullYear()} Zayd Krunz. All rights reserved.
      </p>
    </footer>
  );
}
