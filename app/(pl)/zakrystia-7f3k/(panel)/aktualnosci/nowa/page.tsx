import type { Metadata } from "next";

import { AdminHeader } from "@/components/admin/admin-header";
import { NewsForm } from "@/components/admin/news-form";
import { ADMIN_PATH } from "@/lib/admin/path";

export const metadata: Metadata = { title: "Nowa aktualność" };

export default function NewsNewPage() {
  return (
    <>
      <AdminHeader title="Nowa aktualność" back={{ href: `${ADMIN_PATH}/aktualnosci`, label: "Aktualności" }} />
      <NewsForm />
    </>
  );
}
