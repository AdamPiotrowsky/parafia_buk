import type { Metadata } from "next";

import { HomeSg4 } from "@/components/home/sg4";
import { VariantSwitcher } from "@/components/home/variant-switcher";

export const metadata: Metadata = { title: "Propozycja 4", robots: { index: false } };

export default function Sg4Page() {
  return (
    <>
      <HomeSg4 />
      <VariantSwitcher current={4} />
    </>
  );
}
