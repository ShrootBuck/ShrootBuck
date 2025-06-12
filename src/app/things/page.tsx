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
    header: "Tech & Peripherals",
    innerstuffs: [
      {
        name: "MacBook Pro 13-inch, M2, 2022",
        url: "https://www.apple.com/macbook-pro",
      },
    ],
  },
  {
    header: "Software Development",
    innerstuffs: [
      { name: "Zed", url: "https://zed.dev" },
      { name: "Beekeeper Studio", url: "https://www.beekeeperstudio.io" },
      { name: "Scalar", url: "https://scalar.com" },
      { name: "Plane", url: "https://plane.so" },
      { name: "Ghostty", url: "https://ghostty.org" },
      { name: "OrbStack", url: "https://orbstack.dev" },
    ],
  },
  {
    header: "Everyday Tools",
    innerstuffs: [
      { name: "Proton Suite", url: "https://proton.me" },
      { name: "AFFiNE", url: "https://affine.pro" },
      { name: "Brave", url: "https://brave.com" },
      { name: "TomatoBar", url: "https://github.com/AuroraWright/TomatoBar" },
      { name: "Cobalt", url: "https://cobalt.tools" },
      { name: "Raycast", url: "https://raycast.com" }, // Until macOS 26 lol
    ],
  },
];

// Sort innerstuffs alphabetically by name
const sortedAlphabeticallyStuffs = myStuffs.map((section) => ({
  ...section,
  innerstuffs: [...section.innerstuffs].sort((a, b) =>
    a.name.localeCompare(b.name),
  ),
}));

export default function MyThings() {
  return (
    <>
      <div className="p-5">
        <Link href="/">← Back</Link>
      </div>
      <div className="mx-auto max-w-4xl px-4">
        <h1 className="pt-10 text-center text-3xl sm:text-5xl">My Things</h1>
        <h2 className="pb-10 pt-5 text-center text-xl">
          The stuff I use for programming (or just other work)
        </h2>

        <div className="flex flex-col md:flex-row md:space-x-8">
          {sortedAlphabeticallyStuffs.map((section, index) => (
            <div key={index} className="mb-8 flex-1">
              <div>
                <h2 className="mb-4 text-center text-2xl font-semibold">
                  {section.header}
                </h2>
                <div className="flex justify-center">
                  <ul className="w-full max-w-md space-y-2 text-left">
                    {section.innerstuffs.map((item, itemIndex) => (
                      <li key={itemIndex} className="ml-6 list-disc">
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
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
