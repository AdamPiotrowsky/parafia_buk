import type { Metadata } from "next";

import { HomeSg7 } from "@/components/home/sg7";
import { VariantSwitcher } from "@/components/home/variant-switcher";

export const metadata: Metadata = { title: "Propozycja 7", robots: { index: false } };

export default function Sg7Page() {
  return (
    <>
      <HomeSg7 />
      <VariantSwitcher current={7} />
    </>
  );
}
