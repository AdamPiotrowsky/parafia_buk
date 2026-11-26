import type { Metadata } from "next";

import { BulletinEditPage } from "@/components/admin/bulletin-pages";

export const metadata: Metadata = { title: "Ogłoszenia — edycja" };

export default async function OgloszeniaEditPage({ params }: { params: Promise<{ id: string }> }) {
  return <BulletinEditPage kind="announcements" id={(await params).id} />;
}
