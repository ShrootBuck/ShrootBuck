import { LucideMapPin } from "lucide-react";
import Link from "next/link";

export default function MyThings() {
  return (
    <>
      <div className="p-5">
        <Link href="/">← Back</Link>
      </div>
      <div className="container mx-auto px-4">
        <h1 className="pt-10 text-center text-3xl sm:text-5xl">
          <span className="inline-flex items-center gap-2">
            <LucideMapPin size={32} className="text-blue-600" />
            Location Tracker?
          </span>
        </h1>

        <div className="m-auto lg:w-1/2">
          <h2 className="pb-10 pt-5 text-xl">
            It&apos;s pretty simple. Every hour, an iOS Shortcut sends my
            iPhone&apos;s current location to the /api/location route in a POST
            request. The server then stores the data in a PostgreSQL database
            (which is overkill) and served to visitors.
            <br />
            <br />
            If you&apos;re interested in the code, you can find it on{" "}
            <Link
              className="text-blue-600 hover:text-blue-500"
              href={"https://github.com/ShrootBuck/ShrootBuck"}
            >
              GitHub
            </Link>
            .
          </h2>
        </div>
      </div>
    </>
  );
}
