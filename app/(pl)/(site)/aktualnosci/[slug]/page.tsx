import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";

import { PageHeader } from "@/components/page-header";
import { formatNewsDate } from "@/lib/legacy";
import { allNews } from "@/lib/news";

/* Wpisy dodawane w panelu — zawsze świeże */
export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const slug = decodeURIComponent((await params).slug);
  const item = (await allNews()).find((n) => n.slug === slug);
  return { title: item?.title ?? "Aktualności" };
}

export default async function AktualnoscPage({ params }: { params: Promise<{ slug: string }> }) {
  const slug = decodeURIComponent((await params).slug);
  const news = await allNews();
  const index = news.findIndex((n) => n.slug === slug);
  if (index < 0) notFound();
  const item = news[index];
  const newer = news[index - 1];
  const older = news[index + 1];

  return (
    <>
      <PageHeader eyebrow={`Aktualności · ${formatNewsDate(item.date)}`} title={item.title} />

      <section className="mx-auto max-w-3xl px-5 py-14 lg:px-8">
        <Link href="/aktualnosci" className="inline-flex items-center gap-2 text-sm font-semibold text-lapis hover:text-gold">
          <ArrowLeft size={15} /> Wszystkie aktualności
        </Link>

        {/* Zdjęcie dodane w panelu (stare wpisy mają zdjęcia w treści) */}
        {item.local && item.image && (
          // eslint-disable-next-line @next/next/no-img-element -- zdjęcie już zmniejszone przy zapisie
          <img src={item.image} alt="" className="mt-8 w-full rounded-2xl border border-line object-cover" />
        )}

        <article
          className="document-content news-content mt-8 rounded-2xl border border-line bg-vellum p-6 sm:p-10"
          dangerouslySetInnerHTML={{ __html: item.html }}
        />

        <nav className="mt-10 grid gap-4 sm:grid-cols-2">
          {older && (
            <Link href={`/aktualnosci/${older.slug}`} className="rounded-2xl border border-line p-5 hover:border-gold/60">
              <p className="text-xs uppercase tracking-[0.18em] text-ink-muted">← Starsze</p>
              <p className="mt-1 font-display text-xl font-semibold text-lapis">{older.title}</p>
            </Link>
          )}
          {newer && (
            <Link href={`/aktualnosci/${newer.slug}`} className="rounded-2xl border border-line p-5 text-right hover:border-gold/60 sm:col-start-2">
              <p className="text-xs uppercase tracking-[0.18em] text-ink-muted">Nowsze →</p>
              <p className="mt-1 font-display text-xl font-semibold text-lapis">{newer.title}</p>
            </Link>
          )}
        </nav>
      </section>
    </>
  );
}
