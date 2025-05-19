import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "image.tmdb.org" },
      { hostname: "kajj8808.com" },
    ],
  },
};

export default nextConfig;
