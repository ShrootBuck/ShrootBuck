/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
await import("./src/env.js");

/** @type {import("next").NextConfig} */
const config = {
  images: {
    remotePatterns: [
      {
        hostname: "github-readme-stats.vercel.app",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/resume",
        destination: "https://rxresu.me/shrootbuck/master-resume",
        permanent: true,
      },
      {
        source: "/spcs",
        destination:
          "https://github.com/ShrootBuck/stanford-predictive-maintenance",
        permanent: true,
      },
    ];
  },
};

export default config;
