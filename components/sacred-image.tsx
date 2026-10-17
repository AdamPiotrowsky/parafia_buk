import fs from "node:fs";
import path from "node:path";
import Image from "next/image";

/*
 * Obraz w złotej, łukowej ramie (jak w ołtarzu).
 * Jeśli pliku nie ma jeszcze w /public, pokazuje elegancki zamiennik —
 * wystarczy wgrać zdjęcie pod wskazaną ścieżkę.
 */
export function SacredImage({
  src,
  alt,
  caption,
  arched = true,
  className = "",
}: {
  src: string;
  alt: string;
  caption?: string;
  arched?: boolean;
  className?: string;
}) {
  const exists = fs.existsSync(path.join(process.cwd(), "public", src));
  const shape = arched ? "rounded-t-[999px]" : "rounded-sm";

  return (
    <figure className={className}>
      <div className={`relative bg-gradient-to-b from-gold-light via-gold to-[#7d5f25] p-[3px] shadow-[0_30px_60px_-25px_rgba(16,29,59,0.55)] ${shape}`}>
        <div className={`relative overflow-hidden border-[6px] border-lapis-deep ${shape}`}>
          <div className={`relative aspect-[3/4] overflow-hidden ${shape}`}>
            {exists ? (
              <Image src={src} alt={alt} fill className="object-cover" sizes="(min-width: 1024px) 420px, 80vw" />
            ) : (
              <div className="lapis-sky flex h-full w-full flex-col items-center justify-center gap-5 px-6 text-center">
                <Image src="/logo/postac-gold.png" alt="" width={220} height={220} className="h-auto w-3/4 opacity-90" />
                <p className="font-display text-2xl italic text-gold-pale">{alt}</p>
              </div>
            )}
          </div>
        </div>
      </div>
      {caption && (
        <figcaption className="mt-4 text-center font-display text-lg italic text-ink-muted">{caption}</figcaption>
      )}
    </figure>
  );
}
