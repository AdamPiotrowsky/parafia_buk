import type { Metadata } from "next";
import Image from "next/image";

import { AmbientVideo } from "@/components/ambient-video";
import { Eyebrow } from "@/components/ornament";
import { PageHeader } from "@/components/page-header";
import { SacredImage } from "@/components/sacred-image";
import { Timeline } from "@/components/timeline";
import { churches } from "@/lib/history";

export const metadata: Metadata = {
  title: "Kościoły parafii",
  description: "Historia kościoła farnego św. Stanisława i drewnianego kościoła św. Krzyża w Buku.",
};

export default function KosciolyPage() {
  return (
    <>
      <PageHeader
        eyebrow="Dziedzictwo parafii"
        title="Dwa kościoły, osiem wieków"
        lead="Klasycystyczna fara projektu Schinkla i drewniany kościół na miejscu dawnego grodu — świadkowie całej historii Buku."
      />

      {churches.map((c, i) => (
        <section key={c.slug} id={c.slug} className={`scroll-mt-32 ${i % 2 ? "border-y border-line bg-vellum" : ""}`}>
          <div className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
            <div className={`grid gap-14 lg:grid-cols-[1fr_20rem] ${i % 2 ? "lg:grid-cols-[20rem_1fr]" : ""}`}>
              <div className={i % 2 ? "lg:order-2" : ""}>
                <Eyebrow>{c.style} · {c.built}</Eyebrow>
                <h2 className="mt-4 font-display text-5xl font-semibold leading-tight text-lapis sm:text-6xl">{c.name}</h2>
                <p className="text-sm uppercase tracking-[0.2em] text-ink-muted">{c.subtitle}</p>

                <dl className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-4">
                  {c.facts.map((f) => (
                    <div key={f.label} className="bg-parchment p-4">
                      <dt className="text-[0.68rem] font-bold uppercase tracking-[0.15em] text-ink-muted">{f.label}</dt>
                      <dd className="mt-1 font-display text-2xl font-semibold text-lapis">{f.value}</dd>
                    </div>
                  ))}
                </dl>

                <div className="illuminated mt-10 max-w-2xl space-y-5 text-[1.05rem] leading-8 text-ink-soft">
                  {c.paragraphs.map((p) => (
                    <p key={p.slice(0, 20)}>{p}</p>
                  ))}
                </div>
              </div>

              <SacredImage
                src={`/images/kosciol-${c.slug}.jpg`}
                alt={c.name}
                className={`mx-auto w-full max-w-[20rem] lg:sticky lg:top-40 lg:self-start ${i % 2 ? "lg:order-1" : ""}`}
              />
            </div>

            <figure className="mt-16">
              <div className="relative aspect-[16/9] overflow-hidden rounded-2xl border border-gold/40 bg-lapis-deep shadow-[0_30px_60px_-35px_rgba(16,29,59,0.55)]">
                {c.feature.kind === "video" ? (
                  <AmbientVideo
                    src={c.feature.src}
                    poster={c.feature.poster ?? c.cover}
                    label={c.feature.caption}
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                ) : (
                  <Image src={c.feature.src} alt={c.feature.caption} fill sizes="(min-width: 1280px) 1200px, 100vw" className="object-cover" />
                )}
              </div>
              <figcaption className="mt-3 text-center font-display text-lg italic text-ink-muted">{c.feature.caption}</figcaption>
            </figure>

            <div className="mt-16 max-w-4xl">
              <h3 className="mb-2 font-display text-3xl font-semibold text-lapis">Kalendarium</h3>
              <Timeline events={c.timeline} />
            </div>
          </div>
        </section>
      ))}
    </>
  );
}
