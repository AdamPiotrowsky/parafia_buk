import Image from "next/image";

import { Eyebrow } from "@/components/ornament";

/*
 * Granatowy nagłówek podstrony z logo parafii po prawej.
 */
export function PageHeader({
  eyebrow,
  title,
  lead,
}: {
  eyebrow: string;
  title: string;
  lead?: string;
}) {
  return (
    <section className="lapis-sky relative z-[35]">
      <div className="relative mx-auto max-w-7xl px-5 pb-16 pt-14 sm:py-20 lg:px-8">
        <div className="pr-24 sm:pr-40 lg:pr-52">
          <Eyebrow light>{eyebrow}</Eyebrow>
          <h1 className="mt-4 max-w-4xl font-display text-5xl font-semibold leading-[1.02] text-gold-pale sm:text-6xl">{title}</h1>
          {lead && <p className="mt-5 max-w-2xl text-lg leading-8 text-gold-pale/75">{lead}</p>}
        </div>

        {/* Logo parafii — same złote linie na granacie, w całości w granatowym polu */}
        <Image
          src="/logo/logo-gold.png"
          alt=""
          width={192}
          height={192}
          aria-hidden
          className="pointer-events-none absolute right-5 top-1/2 h-20 w-20 -translate-y-1/2 opacity-90 sm:h-32 sm:w-32 lg:right-8 lg:h-44 lg:w-44"
        />
      </div>
    </section>
  );
}
