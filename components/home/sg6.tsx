import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, HandHeart, Megaphone, Phone, Radio, ScrollText } from "lucide-react";

import { AmbientVideo } from "@/components/ambient-video";
import { NextMassCard, SaintOfDayCard } from "@/components/today-bar";
import { site } from "@/lib/site";

/* Propozycja 6 — „Jasna”: nowoczesna siatka kafelków, wszystko widać od razu */
export function HomeSg6() {
  return (
    <div className="bg-white">
      <section className="mx-auto max-w-7xl px-5 pb-6 pt-12 lg:px-8 lg:pt-16">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="flex items-center gap-2 text-[0.75rem] font-bold uppercase tracking-[0.28em] text-gold">
              <span aria-hidden>✠</span> Archidiecezja Poznańska
            </p>
            <h1 className="mt-3 max-w-4xl font-display text-5xl font-semibold leading-[1] tracking-tight text-ink sm:text-7xl">
              Sanktuarium Matki Bożej <span className="text-lapis">Bukowskiej Literackiej</span>
            </h1>
          </div>
          <p className="max-w-xs text-ink-muted">{site.parish}</p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-20 lg:px-8">
        <div className="grid auto-rows-[13rem] grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-4">
          {/* Ołtarz — duży kafel */}
          <Tile href="/sanktuarium" className="col-span-2 row-span-2" image="/images/fara-oltarz.jpg" position="object-[51%_45%]">
            <TileCaption eyebrow="Sanktuarium" title="Dom Pani Bukowskiej od 1430 roku" />
          </Tile>

          {/* Najbliższa Msza */}
          <div className="rounded-3xl bg-lapis p-6 text-gold-pale">
            <NextMassCard />
          </div>

          {/* Obraz — wysoki kafel */}
          <Tile href="/sanktuarium/historia-obrazu" className="row-span-2" image="/images/obraz-mbbl.jpg" position="object-top">
            <TileCaption eyebrow="Historia obrazu" title="Hodegetria z księgą" />
          </Tile>

          {/* Święty dnia */}
          <div className="overflow-hidden rounded-3xl bg-parchment p-6 [&_p:nth-child(3)]:text-2xl">
            <SaintOfDayCard />
          </div>

          {/* Ogłoszenia, intencje */}
          <IconTile href="/ogloszenia" icon={Megaphone} title="Ogłoszenia" hint="Na ten tydzień" tone="gold" />
          <IconTile href="/intencje" icon={ScrollText} title="Intencje" hint="Msze w intencjach" tone="light" />

          {/* Fara z lotu ptaka */}
          <Link href="/koscioly#fara" className="group relative col-span-2 overflow-hidden rounded-3xl bg-lapis-deep">
            <AmbientVideo
              src="/images/fara-z-lotu.mp4"
              poster="/images/fara-z-lotu.jpg"
              label="Przelot drona nad kościołem farnym"
              className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105"
            />
            <TileCaption eyebrow="Kościół farny" title="Św. Stanisława — z lotu ptaka" />
          </Link>

          <Tile href="/koscioly#swiety-krzyz" image="/images/swiety-krzyz-zewnatrz.jpg">
            <TileCaption eyebrow="1760" title="Kościół św. Krzyża" small />
          </Tile>
          <IconTile href={site.links.live} icon={Radio} title="Na żywo" hint="Transmisja z fary" tone="wine" external />
          <IconTile href={site.links.petitions} icon={HandHeart} title="Prośby" hint="Do Matki Bożej" tone="light" external />
          <IconTile href="/kontakt" icon={Phone} title={site.phone} hint="Kancelaria parafialna" tone="lapis" />
        </div>
      </section>
    </div>
  );
}

function Tile({
  href,
  image,
  position = "object-center",
  className = "",
  children,
}: {
  href: string;
  image: string;
  position?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <Link href={href} className={`group relative overflow-hidden rounded-3xl bg-lapis-deep ${className}`}>
      <Image src={image} alt="" fill sizes="(min-width: 1024px) 640px, 100vw" className={`object-cover ${position} transition duration-700 group-hover:scale-105`} />
      {children}
    </Link>
  );
}

function TileCaption({ eyebrow, title, small = false }: { eyebrow: string; title: string; small?: boolean }) {
  return (
    <>
      <span className="absolute inset-0 bg-gradient-to-t from-lapis-deep/90 via-lapis-deep/20 to-transparent" />
      <span className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-6">
        <span>
          <span className="block text-[0.68rem] font-bold uppercase tracking-[0.22em] text-gold-light">{eyebrow}</span>
          <span className={`mt-1 block font-display font-semibold leading-tight text-white ${small ? "text-xl" : "text-3xl"}`}>{title}</span>
        </span>
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur transition group-hover:bg-gold-light group-hover:text-lapis-deep">
          <ArrowUpRight size={18} />
        </span>
      </span>
    </>
  );
}

const tones = {
  gold: "bg-gold-pale text-lapis hover:bg-gold-light",
  light: "bg-parchment text-lapis hover:bg-parchment-deep",
  wine: "bg-wine text-white hover:bg-[#6a221f]",
  lapis: "bg-lapis-deep text-gold-pale hover:bg-lapis",
};

function IconTile({
  href,
  icon: Icon,
  title,
  hint,
  tone,
  external = false,
}: {
  href: string;
  icon: typeof Phone;
  title: string;
  hint: string;
  tone: keyof typeof tones;
  external?: boolean;
}) {
  const cls = `group flex flex-col justify-between rounded-3xl p-6 transition ${tones[tone]}`;
  const body = (
    <>
      <span className="flex items-start justify-between">
        <Icon size={28} strokeWidth={1.5} />
        <ArrowUpRight size={18} className="opacity-60 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:opacity-100" />
      </span>
      <span>
        <span className="block font-display text-2xl font-semibold leading-tight sm:text-3xl">{title}</span>
        <span className="block text-sm opacity-75">{hint}</span>
      </span>
    </>
  );
  return external ? (
    <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>{body}</a>
  ) : (
    <Link href={href} className={cls}>{body}</Link>
  );
}
