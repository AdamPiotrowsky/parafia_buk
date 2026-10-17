import type { Metadata } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
});

const manrope = Manrope({
  subsets: ["latin", "latin-ext"],
  variable: "--font-manrope",
});

export const metadata: Metadata = {
  title: {
    default: "Sanktuarium Matki Bożej Bukowskiej Literackiej",
    template: "%s | Sanktuarium w Buku",
  },
  description:
    "Sanktuarium Matki Bożej Bukowskiej Literackiej i Parafia pw. św. Stanisława Biskupa i Męczennika w Buku. Msze Święte, ogłoszenia, intencje i historia.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pl" className={`${cormorant.variable} ${manrope.variable}`}>
      <body>{children}</body>
    </html>
  );
}
