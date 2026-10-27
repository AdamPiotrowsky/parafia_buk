import type { Metadata } from "next";

import { cormorant, manrope } from "@/lib/fonts";
import "../globals.css";

export const metadata: Metadata = {
  title: {
    default: "Parafia św. Stanisława w Buku · Sanktuarium Matki Bożej Bukowskiej Literackiej",
    template: "%s | Parafia św. Stanisława w Buku",
  },
  description:
    "Sanktuarium Matki Bożej Bukowskiej Literackiej i Parafia pw. św. Stanisława Biskupa i Męczennika w Buku. Msze Święte, ogłoszenia, intencje i historia.",
  alternates: {
    languages: { pl: "/", en: "/en", de: "/de", es: "/es" },
  },
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
