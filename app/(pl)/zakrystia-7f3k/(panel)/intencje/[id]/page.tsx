import type { Metadata } from "next";

import { BulletinEditPage } from "@/components/admin/bulletin-pages";

export const metadata: Metadata = { title: "Intencje — edycja" };

export default async function IntencjeEditPage({ params }: { params: Promise<{ id: string }> }) {
  return <BulletinEditPage kind="intentions" id={(await params).id} />;
}
