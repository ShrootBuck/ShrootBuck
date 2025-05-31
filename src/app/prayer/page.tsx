import Link from "next/link";

export default function Prayer() {
  return (
    <>
      <div className="p-5">
        <Link href="/">← Back</Link>
      </div>
      <div className="container mx-auto px-4">
        <h1 className="pt-10 text-center text-3xl sm:text-5xl">Prayer Times</h1>

        <div className="flex justify-center pt-10">
          <iframe
            style={{
              width: "250px",
              height: "375px",
              border: "1px solid #ddd",
            }}
            src="https://www.islamicfinder.org/prayer-widget/"
          />
        </div>
      </div>
    </>
  );
}
