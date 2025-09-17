/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
await import("./src/env.js");

/** @type {import("next").NextConfig} */
const config = {
  images: {
    minimumCacheTTL: 31536000, // 1 year (365 days * 24 hours * 60 minutes * 60 seconds)
    remotePatterns: [
      {
        hostname: "8upload.com",
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
      {
        source: "/usaco",
        destination: "https://github.com/ShrootBuck/USACO",
        permanent: true,
      },
      {
        source: "/github",
        destination: "https://github.com/ShrootBuck",
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
      {
        source: "/blog",
        destination: "https://tenbyte.org",
        permanent: true,
      },
      {
        source: "/email",
        destination: "mailto:contact@zaydkrunz.com",
        permanent: true,
      },
    ];
  },
};

export default config;
