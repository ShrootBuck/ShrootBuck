import Link from "next/link";

type Thang = {
  name: string;
  url?: string;
};

type Stuffs = {
  header: string;
  innerstuffs: Thang[];
};

const myStuffs: Stuffs[] = [
  {
    header: "Tech",
    innerstuffs: [
      { name: "MacBook Pro 13-inch, M2, 2022" },
      {
        name: "Finalmouse UltralightX Competition",
        url: "https://finalmouse.com/products/ulx-competition-overview",
      },
    ],
  },
  {
    header: "Software Development",
    innerstuffs: [
      { name: "Visual Studio Code", url: "https://code.visualstudio.com" },
      { name: "Plane", url: "https://plane.so" },
      { name: "Beekeeper Studio", url: "https://www.beekeeperstudio.io" },
      { name: "Insomnia", url: "https://insomnia.rest" },
    ],
  },
  {
    header: "Productivity",
    innerstuffs: [
      { name: "AFFiNE", url: "https://affine.pro" },
      { name: "Zen", url: "https://zen-browser.app" },
    ],
  },
];

export default function MyThings() {
  return (
    <>
      <div className="p-5">
        <Link href="/">← Back</Link>
      </div>
      <div className="container mx-auto px-4">
        <h1 className="pt-10 text-center text-3xl sm:text-5xl">My Things</h1>
        <h2 className="pb-10 pt-5 text-center text-xl">
          The stuff I use for software development and day-to-day life
        </h2>

        {myStuffs.map((section, index) => (
          <div key={index} className="mb-8">
            <h2 className="mb-4 text-center text-2xl font-semibold">
              {section.header}
            </h2>
            <div className="flex justify-center">
              <ul className="space-y-2">
                {section.innerstuffs.map((item, itemIndex) => (
                  <li key={itemIndex} className="list-disc">
                    {item.url ? (
                      <Link
                        href={item.url}
                        className="text-blue-600 hover:text-blue-500 hover:underline"
                        target="_blank"
                      >
                        {item.name}
                      </Link>
                    ) : (
                      <p>{item.name}</p>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
