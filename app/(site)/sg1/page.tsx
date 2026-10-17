import type { Metadata } from "next";

import { HomeSg1 } from "@/components/home/sg1";
import { VariantSwitcher } from "@/components/home/variant-switcher";

export const metadata: Metadata = { title: "Propozycja 1", robots: { index: false } };

export default function Sg1Page() {
  return (
    <>
      <HomeSg1 />
      <VariantSwitcher current={1} />
    </>
  );
}
