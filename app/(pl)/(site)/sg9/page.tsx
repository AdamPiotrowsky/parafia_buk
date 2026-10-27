import type { Metadata } from "next";

import { HomeSg9 } from "@/components/home/sg9";
import { VariantSwitcher } from "@/components/home/variant-switcher";

export const metadata: Metadata = { title: "Propozycja 9", robots: { index: false } };

export default function Sg9Page() {
  return (
    <>
      <HomeSg9 />
      <VariantSwitcher current={9} />
    </>
  );
}
