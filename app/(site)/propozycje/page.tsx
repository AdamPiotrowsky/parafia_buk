import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { PageHeader } from "@/components/page-header";
import { variants } from "@/lib/home";

export const metadata: Metadata = { title: "Propozycje strony głównej", robots: { index: false } };

export default function PropozycjePage() {
  return (
    <>
      <PageHeader
        eyebrow="Do wyboru"
        title="Propozycje strony głównej"
        lead="Każda propozycja korzysta z tych samych podstron i tych samych treści — różni się tylko pierwszym wrażeniem."
      />
      <div className="mx-auto max-w-7xl px-5 pt-12 lg:px-8">
        <Link
          href="/pokaz"
          className="inline-flex items-center gap-2 rounded-full bg-lapis px-7 py-3.5 text-sm font-bold text-gold-pale hover:bg-lapis-light"
        >
          Otwórz tryb prezentacji <ArrowRight size={16} />
        </Link>
      </div>
      <section className="mx-auto grid max-w-7xl gap-6 px-5 py-12 md:grid-cols-2 xl:grid-cols-3 lg:px-8">
        {variants.map((v) => (
          <Link
            key={v.id}
            href={v.href}
            className="group overflow-hidden rounded-2xl border border-line bg-vellum transition hover:-translate-y-1 hover:border-gold/60 hover:shadow-[0_30px_60px_-30px_rgba(16,29,59,0.35)]"
          >
            <div className="relative aspect-[16/9] overflow-hidden bg-lapis-deep">
              <Image src={v.image} alt="" fill sizes="(min-width: 768px) 600px, 100vw" className="object-cover opacity-80 transition duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-lapis-deep/90 to-transparent" />
              <p className="absolute bottom-5 left-7 font-display text-6xl font-semibold leading-none text-gold-light">SG{v.id}</p>
            </div>
            <div className="p-7">
              <h2 className="font-display text-3xl font-semibold text-lapis">{v.name}</h2>
              <p className="mt-2 leading-7 text-ink-soft">{v.text}</p>
              <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-lapis group-hover:text-gold">
                Zobacz propozycję <ArrowRight size={15} className="transition group-hover:translate-x-1" />
              </span>
            </div>
          </Link>
        ))}
      </section>
    </>
  );
}
