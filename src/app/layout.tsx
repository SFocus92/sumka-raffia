import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { Cormorant_Garamond, Onest } from "next/font/google";
import { OrderProvider } from "@/components/OrderProvider";
import { Cursor, Preloader, ScrollProgress } from "@/components/ui";
import { bags, contacts } from "@/data";
import { siteUrl, withBase } from "@/lib/site";
import "./globals.css";

const serif = Cormorant_Garamond({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-serif",
  display: "swap",
});

const sans = Onest({
  subsets: ["latin", "cyrillic"],
  variable: "--font-sans",
  display: "swap",
});


const title = "Raffia Atelier — вязаные сумки из рафии ручной работы";
const description =
  "Сумки из натуральной рафии, связанные крючком вручную. Летние и пляжные модели в наличии и под заказ, доставка по всей стране.";
const ogImage = `${siteUrl}/images/bag-light.jpg`;

export const metadata: Metadata = {
  metadataBase: new URL(`${siteUrl}/`),
  title,
  description,
  applicationName: "Raffia Atelier",
  keywords: ["сумка из рафии", "вязаная сумка", "сумка ручной работы", "пляжная сумка", "соломенная сумка", "рафия"],
  alternates: { canonical: `${siteUrl}/` },
  icons: { icon: withBase("/icon.svg") },
  openGraph: {
    title,
    description,
    url: `${siteUrl}/`,
    siteName: "Raffia Atelier",
    images: [{ url: ogImage, width: 788, height: 1400, alt: "Светлая мини-сумка из рафии" }],
    locale: "ru_RU",
    type: "website",
  },
  twitter: { card: "summary_large_image", title, description, images: [ogImage] },
  robots: { index: true, follow: true },
  formatDetection: { telephone: false },
};

const priceNum = (p: string) => p.replace(/\D/g, "");

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Store",
  name: "Raffia Atelier",
  description,
  url: `${siteUrl}/`,
  image: ogImage,
  sameAs: [contacts.telegram],
  makesOffer: bags.map((b) => ({
    "@type": "Offer",
    price: priceNum(b.price),
    priceCurrency: "RUB",
    availability: b.available ? "https://schema.org/InStock" : "https://schema.org/PreOrder",
    itemOffered: {
      "@type": "Product",
      name: b.name,
      description: b.description,
      image: `${siteUrl}${b.image}`,
    },
  })),
};

export const viewport: Viewport = {
  themeColor: "#f7f2e8",
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="ru" className={`${serif.variable} ${sans.variable}`}>
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <noscript>
          <style>{`.rv,.photo,.photo-inner,.hero-in,.ln>span{opacity:1!important;transform:none!important;clip-path:none!important;animation:none!important}.preloader{display:none!important}`}</style>
        </noscript>
        <OrderProvider>
          <Preloader />
          <ScrollProgress />
          <Cursor />
          {children}
        </OrderProvider>
      </body>
    </html>
  );
}
