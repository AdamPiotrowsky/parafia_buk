import type { Metadata } from "next";

import { BulletinNewPage } from "@/components/admin/bulletin-pages";

export const metadata: Metadata = { title: "Intencje — nowe" };

export default function IntencjeNewPage() {
  return <BulletinNewPage kind="intentions" />;
}
