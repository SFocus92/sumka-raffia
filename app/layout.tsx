import type { Metadata } from "next";
import { Onest, Playfair_Display } from "next/font/google";
import "./globals.css";

const onest = Onest({
  subsets: ["latin", "cyrillic"],
  variable: "--font-main",
});

const playfair = Playfair_Display({
  subsets: ["latin", "cyrillic"],
  variable: "--font-accent",
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "Raffia Atelier — вязаные сумки ручной работы",
  description:
    "Сумки из натуральной рафии, связанные крючком вручную. Летние и пляжные модели в наличии и под заказ.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className={`${onest.variable} ${playfair.variable}`}>
      <body>{children}</body>
    </html>
  );
}
