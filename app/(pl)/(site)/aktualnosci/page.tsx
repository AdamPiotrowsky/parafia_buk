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
  const { items, current, pages } = paginate(news, Number((await searchParams).strona), 10);

  return (
    <>
      <PageHeader eyebrow="Z życia parafii" title="Aktualności" lead="Zaproszenia, wydarzenia i komunikaty z parafii i sanktuarium." />

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-5 lg:px-8">
        <ul className="space-y-6">
          {items.map((n, i) => {
            const newest = current === 1 && i === 0;
            const text = excerpt(n.content, newest ? 320 : 220);
            return (
              <li key={n.slug}>
                <Link
                  href={`/aktualnosci/${n.slug}`}
                  className="group grid overflow-hidden rounded-2xl border border-line bg-vellum transition hover:-translate-y-0.5 hover:border-gold/60 hover:shadow-[0_24px_50px_-30px_rgba(16,29,59,0.45)] md:grid-cols-[minmax(0,22rem)_1fr]"
                >
                  <div className={`relative bg-lapis-deep md:aspect-auto md:min-h-56 ${n.images[0] ? "aspect-[16/9]" : "h-24"}`}>
                    {n.images[0] ? (
                      <Image
                        src={legacyUrl(n.images[0])}
                        alt=""
                        fill
                        sizes="(min-width: 768px) 352px, 100vw"
                        className="object-cover transition duration-700 group-hover:scale-105"
                        priority={i < 2}
                      />
                    ) : (
                      <div className="lapis-sky absolute inset-0 flex items-center justify-center">
                        <Image src="/logo/logo-gold.png" alt="" width={110} height={110} className="h-16 w-16 opacity-80 md:h-24 md:w-24" />
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col justify-center p-6 sm:p-8">
                    <p className="text-[0.72rem] font-bold uppercase tracking-[0.22em] text-gold">
                      {newest && <span className="mr-2 rounded-full bg-lapis px-2 py-0.5 text-gold-pale">Najnowsze</span>}
                      {formatNewsDate(n.date)}
                    </p>
                    <h2 className="mt-2 font-display text-2xl font-semibold leading-tight text-lapis group-hover:text-lapis-light sm:text-3xl">{n.title}</h2>
                    {text && <p className="mt-3 leading-7 text-ink-soft">{text}</p>}
                    <span className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-lapis">
                      Czytaj dalej <ArrowRight size={15} className="transition group-hover:translate-x-1" />
                    </span>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>

        <Pagination base="/aktualnosci" current={current} pages={pages} />
      </section>
    </>
  );
}
