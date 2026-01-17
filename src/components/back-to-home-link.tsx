import Link from "next/link";

type BackToHomeLinkProps = {
  label?: string;
};

export default function BackToHomeLink({
  label = "Back to Home",
}: BackToHomeLinkProps) {
  return (
    <Link
      href="/"
      className="mb-4 block text-center text-gray-400 hover:text-white"
    >
      &larr; {label}
    </Link>
  );
}
