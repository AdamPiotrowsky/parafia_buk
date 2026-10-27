import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Images } from "lucide-react";

import { PageHeader } from "@/components/page-header";
import { Pagination } from "@/components/pagination";
import { albums, paginate } from "@/lib/legacy";
import { legacyUrl } from "@/lib/legacy/assets";

export const metadata: Metadata = { title: "Galeria" };

export default async function GaleriaPage({ searchParams }: { searchParams: Promise<{ strona?: string }> }) {
  const { items, current, pages } = paginate(albums, Number((await searchParams).strona), 24);

  return (
    <>
      <PageHeader
        eyebrow="Z życia parafii"
        title="Galeria"
        lead="Uroczystości, liturgie i wydarzenia z życia parafii."
      />

      <section className="mx-auto max-w-7xl px-5 py-16 lg:px-8">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {items.map((a, i) => (
            <Link key={a.slug} href={`/galeria/${a.slug}`} className="group">
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-parchment-deep">
                {a.photos[0] && (
                  <Image
                    src={legacyUrl(a.photos[0])}
                    alt=""
                    fill
                    sizes="(min-width: 1280px) 300px, (min-width: 640px) 45vw, 100vw"
                    className="object-cover transition duration-700 group-hover:scale-105"
                    priority={current === 1 && i < 4}
                  />
                )}
                <span className="absolute bottom-3 right-3 flex items-center gap-1.5 rounded-full bg-lapis-deep/80 px-3 py-1 text-xs font-semibold text-gold-pale backdrop-blur">
                  <Images size={13} /> {a.photos.length}
                </span>
              </div>
              <p className="mt-3 font-display text-xl font-semibold leading-tight text-lapis group-hover:text-lapis-light">{a.title}</p>
            </Link>
          ))}
        </div>

        <Pagination base="/galeria" current={current} pages={pages} />
      </section>
    </>
  );
}
