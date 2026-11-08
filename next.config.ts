import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // thinkygraph is a prebuilt static app in public/thinkygraphs/, canonical at
  // /thinkygraphs/. Next's built-in redirect would strip that slash, so it's
  // turned off and replaced by the same redirect with thinkygraphs left out.
  skipTrailingSlashRedirect: true,
  async redirects() {
    return [
      {
        source: "/:path((?!thinkygraphs/?$)(?:[^/]+/)*[^/]+)/",
        destination: "/:path",
        permanent: true,
      },
      // Next lets every source match with or without a trailing slash; the
      // lookahead limits this one to the slashless form.
      { source: "/:app(thinkygraphs(?!/))", destination: "/:app/", permanent: true },
    ];
  },
  async rewrites() {
    return [
      { source: "/thinkygraphs/", destination: "/thinkygraphs/index.html" },
    ];
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Content-Security-Policy",
            value: "frame-ancestors https://www.devrank.app",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          }
        ]
      },
      {
        source: "/thinkygraphs/assets/:file*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
      {
        // pdf.js worker is a module worker; with nosniff it must be served as JS
        source: "/thinkygraphs/assets/:file(.*\\.mjs)",
        headers: [{ key: "Content-Type", value: "text/javascript" }],
      },
      ...["/thinkygraphs/", "/thinkygraphs/index.html"].map((source) => ({
        source,
        headers: [{ key: "Cache-Control", value: "no-cache" }],
      })),
    ]
  },
};

export default nextConfig;
