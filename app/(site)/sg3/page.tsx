import type { Metadata } from "next";

import { HomeSg3 } from "@/components/home/sg3";
import { VariantSwitcher } from "@/components/home/variant-switcher";

export const metadata: Metadata = { title: "Propozycja 3", robots: { index: false } };

export default function Sg3Page() {
  return (
    <>
      <HomeSg3 />
      <VariantSwitcher current={3} />
    </>
  );
}
