import type { Metadata } from "next";

import { HomeSg5 } from "@/components/home/sg5";
import { VariantSwitcher } from "@/components/home/variant-switcher";

export const metadata: Metadata = { title: "Propozycja 5", robots: { index: false } };

export default function Sg5Page() {
  return (
    <>
      <HomeSg5 />
      <VariantSwitcher current={5} />
    </>
  );
}
