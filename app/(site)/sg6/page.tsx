import type { Metadata } from "next";

import { HomeSg6 } from "@/components/home/sg6";
import { VariantSwitcher } from "@/components/home/variant-switcher";

export const metadata: Metadata = { title: "Propozycja 6", robots: { index: false } };

export default function Sg6Page() {
  return (
    <>
      <HomeSg6 />
      <VariantSwitcher current={6} />
    </>
  );
}
