import { readdirSync } from "node:fs";
import path from "node:path";

/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
await import("./src/env.js");

const photoDirectory = path.join(process.cwd(), "public/photos");
const photos = readdirSync(photoDirectory)
  .filter((file) => /\.(avif|jpe?g|png|webp)$/i.test(file))
  .sort((a, b) => b.localeCompare(a, undefined, { numeric: true }));

/** @type {import("next").NextConfig} */
const config = {
  env: {
    NEXT_PUBLIC_PHOTOS: JSON.stringify(photos),
  },
  images: {
    minimumCacheTTL: 31536000, // 1 year (365 days * 24 hours * 60 minutes * 60 seconds)
    remotePatterns: [
      {
        hostname: "raw.githubusercontent.com",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/spcs",
        destination:
          "https://github.com/ShrootBuck/stanford-predictive-maintenance",
        permanent: true,
      },
      {
        source: "/cp",
        destination: "https://github.com/ShrootBuck/CompetitiveProgramming",
        permanent: true,
      },
      {
        source: "/github",
        destination: "https://github.com/ShrootBuck",
        permanent: true,
      },
      {
        source: "/codeforces",
        destination: "https://codeforces.com/profile/ShrootBuck",
        permanent: true,
      },
      {
        source: "/x",
        destination: "https://x.com/ShrootBuck",
        permanent: true,
      },
      {
        source: "/twitter",
        destination: "https://x.com/ShrootBuck",
        permanent: true,
      },
    ];
  },
};

export default config;
