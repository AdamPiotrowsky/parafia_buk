import type { Metadata } from "next";
import Link from "next/link";
import { ExternalLink, Pencil, Plus } from "lucide-react";

import { deleteNewsAction } from "@/app/(pl)/zakrystia-7f3k/actions";
import { AdminHeader, PrimaryLink, SavedNote } from "@/components/admin/admin-header";
import { DeleteButton } from "@/components/admin/ui";
import { ADMIN_PATH } from "@/lib/admin/path";
import { listNews } from "@/lib/content-store";
import { formatNewsDate } from "@/lib/legacy";

export const metadata: Metadata = { title: "Aktualności" };

export default async function NewsAdminPage({ searchParams }: { searchParams: Promise<{ zapisano?: string }> }) {
  const items = await listNews();
  const base = `${ADMIN_PATH}/aktualnosci`;

  return (
    <>
      <AdminHeader
        title="Aktualności"
        lead="Zaproszenia, wydarzenia i komunikaty. Najnowsze są na górze listy na stronie."
        action={
          <PrimaryLink href={`${base}/nowa`}>
            <Plus size={16} /> Dodaj aktualność
          </PrimaryLink>
        }
      />
      <SavedNote show={Boolean((await searchParams).zapisano)} />

      {items.length === 0 ? (
        <Link href={`${base}/nowa`} className="block rounded-2xl border-2 border-dashed border-line bg-white px-6 py-14 text-center hover:border-lapis/50">
          <Plus className="mx-auto text-lapis" size={30} />
          <p className="mt-3 text-lg font-semibold text-lapis">Nie dodano jeszcze żadnej aktualności</p>
          <p className="text-sm text-ink-muted">Na stronie widać na razie wpisy przeniesione ze starej strony.</p>
        </Link>
      ) : (
        <ul className="divide-y divide-line overflow-hidden rounded-2xl border border-line bg-vellum">
          {items.map((n) => (
            <li key={n.id} className="flex flex-wrap items-center gap-x-5 gap-y-3 px-5 py-4 sm:px-6">
              <div className="relative h-14 w-20 shrink-0 overflow-hidden rounded-lg bg-lapis-deep">
                {n.image && (
                  // eslint-disable-next-line @next/next/no-img-element -- miniatura z /api/zdjecia
                  <img src={`/api/zdjecia/${n.image}`} alt="" className="h-full w-full object-cover" />
                )}
              </div>
              <div className="min-w-0 flex-1">
                <p className="font-display text-xl font-semibold text-lapis">{n.title}</p>
                <p className="text-sm text-ink-muted">{formatNewsDate(n.date.split("-").reverse().join("."))}</p>
              </div>
              <div className="flex items-center gap-1">
                <a href={`/aktualnosci/${n.slug}`} target="_blank" className="inline-flex items-center gap-1.5 rounded-full px-3 py-2 text-sm font-semibold text-ink-soft hover:bg-white">
                  <ExternalLink size={15} /> Zobacz
                </a>
                <Link href={`${base}/${n.id}`} className="inline-flex items-center gap-1.5 rounded-full px-3 py-2 text-sm font-semibold text-lapis hover:bg-white">
                  <Pencil size={15} /> Edytuj
                </Link>
                <DeleteButton action={deleteNewsAction.bind(null, n.id)} what={`„${n.title}”`} />
              </div>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
