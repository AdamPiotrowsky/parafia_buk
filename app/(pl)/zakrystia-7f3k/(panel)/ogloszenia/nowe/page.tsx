import type { Metadata } from "next";

import { BulletinNewPage } from "@/components/admin/bulletin-pages";

export const metadata: Metadata = { title: "Ogłoszenia — nowe" };

export default function OgloszeniaNewPage() {
  return <BulletinNewPage kind="announcements" />;
}
