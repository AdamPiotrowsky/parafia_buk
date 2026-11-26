import type { Metadata } from "next";

import { HomeSg10 } from "@/components/home/sg10";
import { VariantSwitcher } from "@/components/home/variant-switcher";

export const metadata: Metadata = { title: "Propozycja 10", robots: { index: false } };

export default function Sg10Page() {
  return (
    <>
      <HomeSg10 />
      <VariantSwitcher current={10} />
    </>
  );
}
