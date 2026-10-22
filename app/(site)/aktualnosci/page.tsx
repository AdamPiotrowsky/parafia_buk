import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { PageHeader } from "@/components/page-header";
import { Pagination } from "@/components/pagination";
import { excerpt, formatNewsDate, news, paginate } from "@/lib/legacy";
import { legacyUrl } from "@/lib/legacy/assets";

export const metadata: Metadata = { title: "Aktualności" };

export default async function AktualnosciPage({ searchParams }: { searchParams: Promise<{ strona?: string }> }) {
  const { items, current, pages } = paginate(news, Number((await searchParams).strona), 12);
  const [lead, ...rest] = items;

  return (
    <>
      <PageHeader eyebrow="Z życia parafii" title="Aktualności" lead="Zaproszenia, wydarzenia i komunikaty z Sanktuarium i parafii." />

      <section className="mx-auto max-w-7xl px-5 py-16 lg:px-8">
        {lead && current === 1 && (
          <Link href={`/aktualnosci/${lead.slug}`} className="group mb-10 grid overflow-hidden rounded-2xl border border-line bg-vellum md:grid-cols-[1.1fr_1fr]">
            <div className="relative min-h-64 bg-lapis-deep">
              {lead.images[0] ? (
                <Image src={legacyUrl(lead.images[0])} alt="" fill sizes="(min-width: 768px) 640px, 100vw" className="object-cover transition duration-700 group-hover:scale-105" />
              ) : (
                <div className="lapis-sky absolute inset-0 flex items-center justify-center">
                  <Image src="/logo/logo-gold.png" alt="" width={140} height={140} className="h-32 w-32 opacity-80" />
                </div>
              )}
            </div>
            <div className="flex flex-col justify-center p-8 sm:p-10">
              <p className="text-[0.72rem] font-bold uppercase tracking-[0.25em] text-gold">Najnowsze · {formatNewsDate(lead.date)}</p>
              <h2 className="mt-3 font-display text-4xl font-semibold leading-tight text-lapis group-hover:text-lapis-light">{lead.title}</h2>
              <p className="mt-4 leading-7 text-ink-soft">{excerpt(lead.content, 260)}</p>
              <span className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-lapis">
                Czytaj dalej <ArrowRight size={15} className="transition group-hover:translate-x-1" />
              </span>
            </div>
          </Link>
        )}

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {(current === 1 ? rest : items).map((n) => (
            <Link key={n.slug} href={`/aktualnosci/${n.slug}`} className="group flex flex-col overflow-hidden rounded-2xl border border-line bg-vellum transition hover:-translate-y-1 hover:border-gold/60">
              {n.images[0] && (
                <div className="relative aspect-[16/10] overflow-hidden bg-parchment-deep">
                  <Image src={legacyUrl(n.images[0])} alt="" fill sizes="(min-width: 1024px) 400px, 100vw" className="object-cover transition duration-700 group-hover:scale-105" />
                </div>
              )}
              <div className="flex flex-1 flex-col p-6">
                <p className="text-[0.7rem] font-bold uppercase tracking-[0.2em] text-gold">{formatNewsDate(n.date)}</p>
                <h3 className="mt-2 font-display text-2xl font-semibold leading-tight text-lapis">{n.title}</h3>
                {excerpt(n.content) && <p className="mt-3 flex-1 text-sm leading-6 text-ink-soft">{excerpt(n.content, 140)}</p>}
              </div>
            </Link>
          ))}
        </div>

        <Pagination base="/aktualnosci" current={current} pages={pages} />
      </section>
    </>
  );
}
