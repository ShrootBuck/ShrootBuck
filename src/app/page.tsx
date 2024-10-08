import { NavBar } from "./navigation-menu";

export default async function Home() {
  return (
    <>
      <NavBar />
      <h1 className="pt-5 text-center text-3xl sm:text-5xl">
        Hi 👋, I&apos;m Zayd Krunz
      </h1>
      <h2 className="text-center text-opacity-25">
        A Software Engineer from Tucson, AZ
      </h2>
    </>
  );
}
