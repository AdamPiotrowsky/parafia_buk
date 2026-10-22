import type { Metadata } from "next";
import Image from "next/image";
import { Phone } from "lucide-react";

import { PageHeader } from "@/components/page-header";
import { legacyUrl } from "@/lib/legacy/assets";
import { site } from "@/lib/site";

export const metadata: Metadata = { title: "Ochrona dzieci i młodzieży" };

/* Skan standardów opublikowany na dotychczasowej stronie (21.09.2024) */
const pages = [
  "/uploads/news/img20240921140600_5e3b029ad57fedb12c4af95a829824b8.jpg",
  "/uploads/news/img20240921140624_aed3cd71550b30ed47c3261508aa3818.jpg",
];

export default function OchronaDzieciPage() {
  return (
    <>
      <PageHeader eyebrow="Parafia" title="Ochrona dzieci i młodzieży" lead="Standardy ochrony małoletnich obowiązujące w naszej parafii." />
      <section className="mx-auto max-w-4xl px-5 py-16 lg:px-8">
        <p className="text-[1.05rem] leading-8 text-ink-soft">
          Bezpieczeństwo dzieci i młodzieży jest dla naszej wspólnoty sprawą najwyższej wagi. Parafia stosuje standardy
          ochrony małoletnich — zasady, które obowiązują duszpasterzy, katechetów, animatorów i wszystkie osoby pracujące z
          dziećmi w parafii. Poniżej publikujemy ich pełny tekst.
        </p>

        <div className="mt-10 space-y-6">
          {pages.map((src, i) => (
            <a key={src} href={legacyUrl(src)} target="_blank" rel="noopener noreferrer" className="block overflow-hidden rounded-2xl border border-line bg-white shadow-sm">
              <Image src={legacyUrl(src)} alt={`Standardy ochrony dzieci — strona ${i + 1}`} width={1200} height={1700} sizes="(min-width: 896px) 832px, 100vw" className="h-auto w-full" />
            </a>
          ))}
        </div>

        <a href={`tel:${site.phone.replace(/\s/g, "")}`} className="mt-10 flex items-center justify-center gap-3 rounded-2xl bg-lapis p-6 text-gold-pale hover:bg-lapis-light">
          <Phone size={20} />
          <span>
            Pytania lub zgłoszenia: biuro parafialne <strong className="font-display text-2xl">{site.phone}</strong>
          </span>
        </a>
      </section>
    </>
  );
}
