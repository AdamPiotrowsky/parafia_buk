import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { AdminHeader } from "@/components/admin/admin-header";
import { NewsForm } from "@/components/admin/news-form";
import { ADMIN_PATH } from "@/lib/admin/path";
import { getNews } from "@/lib/content-store";

export const metadata: Metadata = { title: "Aktualności — edycja" };

export default async function NewsEditPage({ params }: { params: Promise<{ id: string }> }) {
  const item = await getNews((await params).id);
  if (!item) notFound();
  return (
    <>
      <AdminHeader title={`Edycja: ${item.title}`} back={{ href: `${ADMIN_PATH}/aktualnosci`, label: "Aktualności" }} />
      <NewsForm item={item} />
    </>
  );
}
