import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geist = Geist({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Sanktuarium Matki Bożej Bukowskiej Literackiej",
    template: "%s | Sanktuarium w Buku",
  },
  description:
    "Oficjalna strona Sanktuarium Matki Bożej Bukowskiej Literackiej i Parafii pw. św. Stanisława Biskupa w Buku.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pl">
      <body className={geist.className}>
        {children}
      </body>
    </html>
  );
}