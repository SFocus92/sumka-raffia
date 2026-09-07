import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/sumka-raffia",
  images: { unoptimized: true },
};

export default nextConfig;
