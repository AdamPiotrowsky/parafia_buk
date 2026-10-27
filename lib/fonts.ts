import { Cormorant_Garamond, Manrope } from "next/font/google";

/* Wspólne dla obu głównych layoutów: polskiego i obcojęzycznych */
export const cormorant = Cormorant_Garamond({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
});

export const manrope = Manrope({
  subsets: ["latin", "latin-ext"],
  variable: "--font-manrope",
});
