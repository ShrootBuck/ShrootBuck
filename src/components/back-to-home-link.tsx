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
      className="mb-6 mt-2 block text-center text-sm text-[var(--text-secondary)] transition-colors hover:text-[var(--text-primary)]"
    >
      &larr; {label}
    </Link>
  );
}
