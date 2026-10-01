import type { MetadataRoute } from "next";
import { basePath } from "@/lib/site";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Raffia Atelier — вязаные сумки ручной работы",
    short_name: "Raffia Atelier",
    description: "Сумки из натуральной рафии, связанные крючком вручную.",
    start_url: `${basePath}/`,
    display: "standalone",
    background_color: "#f7f2e8",
    theme_color: "#f7f2e8",
    lang: "ru",
    icons: [{ src: `${basePath}/icon.svg`, sizes: "any", type: "image/svg+xml" }],
  };
}
