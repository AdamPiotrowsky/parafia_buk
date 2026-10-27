import type { Metadata } from "next";

import { Showroom } from "@/components/showroom";
import { variants } from "@/lib/home";

export const metadata: Metadata = { title: "Prezentacja propozycji", robots: { index: false } };

/* Pełnoekranowy pokaz propozycji — bez menu i stopki strony */
export default function PokazPage() {
  return <Showroom variants={variants.map(({ id, href, name, text }) => ({ id, href, name, text }))} />;
}
