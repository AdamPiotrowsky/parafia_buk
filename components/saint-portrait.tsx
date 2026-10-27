import fs from "node:fs";
import path from "node:path";
import Image from "next/image";

/*
 * Wizerunek świętego w łukowej ramce. Plik: public/images/swieci/<slug>.jpg —
 * dopóki go nie ma, pokazujemy granatowy zamiennik z inicjałem.
 */
export function SaintPortrait({ slug, name, className = "" }: { slug: string; name: string; className?: string }) {
  const src = `/images/swieci/${slug}.jpg`;
  const exists = fs.existsSync(path.join(process.cwd(), "public", src));
  const initial = name
    .replace(/^(Św\.|Bł\.|Święta|Święty|St\.|Blessed|Hl\.|Sel\.|San|Santa|Beato|Beata)\s+/, "")
    .replace(/^(ks\.|kard\.|Siostra|Ojciec|Fr\.|Cardinal|Kardinal|Pater|cardenal|familia)\s+/, "")
    .charAt(0);

  return (
    <div className={`relative overflow-hidden rounded-t-[999px] border-[3px] border-gold/70 bg-lapis-deep ${className}`}>
      {exists ? (
        <Image src={src} alt={name} fill sizes="160px" className="object-cover object-top" />
      ) : (
        <div className="lapis-sky flex h-full w-full flex-col items-center justify-center" aria-hidden>
          <span className="font-display text-5xl font-semibold text-gold-light">{initial}</span>
          <span className="mt-1 h-px w-8 bg-gold/60" />
        </div>
      )}
    </div>
  );
}
