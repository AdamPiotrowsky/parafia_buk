import type { Metadata } from "next";

import { BulletinListPage } from "@/components/admin/bulletin-pages";

export const metadata: Metadata = { title: "Ogłoszenia" };

export default async function OgloszeniaAdminPage({ searchParams }: { searchParams: Promise<{ zapisano?: string }> }) {
  return <BulletinListPage kind="announcements" saved={Boolean((await searchParams).zapisano)} />;
}
