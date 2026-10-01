/** Префикс пути, под которым сайт опубликован (GitHub Pages: /sumka-raffia). */
export const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

/** Публичный адрес сайта без завершающего слэша. */
export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://sfocus92.github.io/sumka-raffia").replace(/\/$/, "");

/** Добавляет basePath к локальным путям (картинки из /public). */
export const withBase = (src: string) => (src.startsWith("/") && !src.startsWith(basePath + "/") ? `${basePath}${src}` : src);
