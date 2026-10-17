import type { Metadata } from "next";

import { HomeSg2 } from "@/components/home/sg2";
import { VariantSwitcher } from "@/components/home/variant-switcher";

export const metadata: Metadata = { title: "Propozycja 2", robots: { index: false } };

export default function Sg2Page() {
  return (
    <>
      <HomeSg2 />
      <VariantSwitcher current={2} />
    </>
  );
}
