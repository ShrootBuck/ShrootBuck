// A list of my "things"
// Mac model, VSCode/Affine/Freeform, things i use to make software, etc.

type thang = { name: string; url: string };

type stuffs = {
  header: string;
  innerstuffs: thang[];
};

const myStuffs: stuffs[] = [
  {
    header: "Software",
    innerstuffs: [
      { name: "Visual Studio Code", url: "https://code.visualstudio.com" },
    ],
  },
];

export default function MyThings() {
  return (
    <>
      <h1 className="pt-10 text-center text-3xl sm:text-5xl">My Things</h1>
      <h2 className="pb-10 pt-5 text-center text-xl">
        The stuff I use for software development and day-to-day life
      </h2>

      <h2 className="text-center text-2xl underline">Software</h2>
      <div className="flex justify-center">
        <ul>
          <li className="list-disc text-blue-600 hover:text-blue-500">
            <Link href="/things">Stuff I Use</Link>
          </li>
          {/* <li className="list-disc text-blue-600 hover:text-blue-500">
            <Link href="/resume">Resume</Link>
          </li> */}
        </ul>
      </div>
    </>
  );
}
