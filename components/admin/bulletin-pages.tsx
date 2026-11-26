import Link from "next/link";
import { notFound } from "next/navigation";
import { ExternalLink, FileText, Pencil, Upload } from "lucide-react";

import { deleteBulletinAction } from "@/app/(pl)/zakrystia-7f3k/actions";
import { AdminHeader, formatStamp, PrimaryLink, SavedNote } from "@/components/admin/admin-header";
import { BulletinForm } from "@/components/admin/bulletin-form";
import { DeleteButton } from "@/components/admin/ui";
import { bulletinKinds } from "@/lib/admin/kinds";
import { ADMIN_PATH } from "@/lib/admin/path";
import { getBulletin, listBulletins, type BulletinKind } from "@/lib/content-store";

/* Strony panelu wspólne dla ogłoszeń i intencji */

export async function BulletinListPage({ kind, saved }: { kind: BulletinKind; saved: boolean }) {
  const k = bulletinKinds[kind];
  const items = await listBulletins(kind);
  const base = `${ADMIN_PATH}/${k.segment}`;

  return (
    <>
      <AdminHeader
        title={k.label}
        lead="Na stronie zawsze widać najnowszy wpis. Starsze zostają w archiwum."
        action={
          <PrimaryLink href={`${base}/nowe`}>
            <Upload size={16} /> Wgraj nowe z Worda
          </PrimaryLink>
        }
      />
      <SavedNote show={saved} />

      {items.length === 0 ? (
        <Link href={`${base}/nowe`} className="block rounded-2xl border-2 border-dashed border-line bg-white px-6 py-14 text-center hover:border-lapis/50">
          <Upload className="mx-auto text-lapis" size={30} />
          <p className="mt-3 text-lg font-semibold text-lapis">Nie ma jeszcze żadnych wpisów</p>
          <p className="text-sm text-ink-muted">Kliknij, żeby wgrać pierwszy plik Word. Do tego czasu strona pokazuje przykładową treść.</p>
        </Link>
      ) : (
        <ul className="divide-y divide-line overflow-hidden rounded-2xl border border-line bg-vellum">
          {items.map((b, i) => (
            <li key={b.id} className="flex flex-wrap items-center gap-x-6 gap-y-3 px-5 py-4 sm:px-6">
              <FileText size={20} className="shrink-0 text-gold" />
              <div className="min-w-0 flex-1">
                <p className="flex flex-wrap items-center gap-2 font-display text-xl font-semibold text-lapis">
                  {b.title}
                  {i === 0 && <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 font-sans text-xs font-bold text-emerald-800">teraz na stronie</span>}
                </p>
                <p className="text-sm text-ink-muted">
                  {[b.dateLabel, `dodano ${formatStamp(b.createdAt)}`].filter(Boolean).join(" · ")}
                </p>
              </div>
              <div className="flex items-center gap-1">
                <a
                  href={i === 0 ? k.publicPath : `${k.publicPath}?wpis=${b.id}`}
                  target="_blank"
                  className="inline-flex items-center gap-1.5 rounded-full px-3 py-2 text-sm font-semibold text-ink-soft hover:bg-white"
                >
                  <ExternalLink size={15} /> Zobacz
                </a>
                <Link href={`${base}/${b.id}`} className="inline-flex items-center gap-1.5 rounded-full px-3 py-2 text-sm font-semibold text-lapis hover:bg-white">
                  <Pencil size={15} /> Edytuj
                </Link>
                <DeleteButton action={deleteBulletinAction.bind(null, kind, b.id)} what={`„${b.title}”`} />
              </div>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}

export function BulletinNewPage({ kind }: { kind: BulletinKind }) {
  const k = bulletinKinds[kind];
  return (
    <>
      <AdminHeader
        title={k.newLabel}
        lead="Przeciągnij plik Word — treść pojawi się poniżej tak, jak będzie wyglądać na stronie. Sprawdź ją i opublikuj."
        back={{ href: `${ADMIN_PATH}/${k.segment}`, label: k.label }}
      />
      <BulletinForm kind={kind} />
    </>
  );
}

export async function BulletinEditPage({ kind, id }: { kind: BulletinKind; id: string }) {
  const k = bulletinKinds[kind];
  const item = await getBulletin(kind, id);
  if (!item) notFound();
  return (
    <>
      <AdminHeader title={`Edycja: ${item.title}`} back={{ href: `${ADMIN_PATH}/${k.segment}`, label: k.label }} />
      <BulletinForm kind={kind} item={item} />
    </>
  );
}
