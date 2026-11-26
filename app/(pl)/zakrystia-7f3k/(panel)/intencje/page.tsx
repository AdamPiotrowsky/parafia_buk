import type { Metadata } from "next";

import { BulletinListPage } from "@/components/admin/bulletin-pages";

export const metadata: Metadata = { title: "Intencje" };

export default async function IntencjeAdminPage({ searchParams }: { searchParams: Promise<{ zapisano?: string }> }) {
  return <BulletinListPage kind="intentions" saved={Boolean((await searchParams).zapisano)} />;
}
