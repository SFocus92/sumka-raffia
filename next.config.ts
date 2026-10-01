import type { NextConfig } from "next";

// Сайт публикуется как статический на GitHub Pages: https://sfocus92.github.io/sumka-raffia
// Для своего домена или Vercel задайте NEXT_PUBLIC_BASE_PATH="" при сборке.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "/sumka-raffia";

const nextConfig: NextConfig = {
  output: "export",
  basePath: basePath || undefined,
  trailingSlash: true,
  images: { unoptimized: true },
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
  poweredByHeader: false,
  reactStrictMode: true,
};

export default nextConfig;
