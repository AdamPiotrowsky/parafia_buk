import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";

import { Divider, Eyebrow } from "@/components/ornament";
import { PageHeader } from "@/components/page-header";
import { SaintPortrait } from "@/components/saint-portrait";
import { Timeline } from "@/components/timeline";
import { legacyUrl } from "@/lib/legacy/assets";

export const metadata: Metadata = {
  title: "Bł. Rafał Chyliński",
  description: "Błogosławiony Rafał Chyliński — franciszkanin urodzony w Wysoczce w parafii Buk, „ojciec biedaków”.",
};

/* Na podstawie strony „Bł. Ojciec Rafał Chyliński” z dotychczasowej witryny parafii */
const life = [
  { year: "6 I 1694", title: "Narodziny w Wysoczce", text: "W rodzinie Jana Arnolfa i Marianny z Kierskich, w parafii Buk. Na chrzcie otrzymał imię Melchior." },
  { year: "młodość", title: "Szkoła i wojsko", text: "Uczył się w szkole jezuitów w Poznaniu, potem kilka lat służył w wojsku." },
  { year: "1715", title: "Franciszkanin", text: "Wstąpił do franciszkanów w Krakowie i przyjął imię Rafał.", major: true },
  { year: "1717", title: "Święcenia kapłańskie", text: "Pracował w klasztorach franciszkańskich w Wielkopolsce, a potem w Warce, Krakowie i Łagiewnikach." },
  { year: "Kraków", title: "Posługa w czasie zarazy", text: "Gorliwie opiekował się chorymi — biednymi, chorymi i nieszczęśliwymi." },
  { year: "2 XII 1741", title: "Śmierć w Łagiewnikach", text: "Tam został pochowany. Wkrótce zasłynął łaskami, a do jego grobu zaczęły przybywać pielgrzymki." },
  { year: "9 VI 1991", title: "Beatyfikacja", text: "W Warszawie Jan Paweł II ogłosił go błogosławionym.", major: true },
];

export default function RafalChylinskiPage() {
  return (
    <>
      <PageHeader
        eyebrow="Błogosławiony z naszej parafii"
        title="Bł. Rafał Chyliński"
        lead="Franciszkanin urodzony w Wysoczce koło Buku, nazywany „ojcem biedaków”. Wspomnienie liturgiczne: 2 grudnia."
      />

      <section className="mx-auto grid max-w-6xl gap-14 px-5 py-20 lg:grid-cols-[18rem_1fr] lg:px-8">
        <div className="space-y-6 lg:sticky lg:top-40 lg:self-start">
          <SaintPortrait slug="rafal-chylinski" name="Bł. Rafał Chyliński" className="mx-auto aspect-[3/4] w-56 lg:w-full" />
          <a
            href={legacyUrl("/uploads/relikwie/IMG_7077_ojciec_chylinski.jpg")}
            target="_blank"
            rel="noopener noreferrer"
            className="relative mx-auto block aspect-square w-56 overflow-hidden rounded-2xl border border-gold/40 lg:w-full"
          >
            <Image src={legacyUrl("/uploads/relikwie/IMG_7077_ojciec_chylinski.jpg")} alt="Relikwie bł. Rafała Chylińskiego w kościele farnym" fill sizes="288px" className="object-cover" />
          </a>
          <p className="text-center text-sm italic text-ink-muted">Relikwie bł. Rafała w kościele farnym</p>
        </div>

        <div>
          <div className="illuminated space-y-5 text-[1.08rem] leading-8 text-ink-soft">
            <p>
              Urodził się 6 stycznia 1694 roku we wsi Wysoczka koło Buku. Wychowany religijnie przez matkę, od dziecka okazywał
              pobożność i miłosierdzie dla biednych. W 1715 roku wstąpił do franciszkanów w Krakowie, a dwa lata później został
              kapłanem.
            </p>
            <p>
              Odznaczał się wielkim współczuciem dla biednych, chorych i nieszczęśliwych. Przebywając w Krakowie, gorliwie
              opiekował się chorymi w czasie zarazy. Kochał Boga, a za przykładem świętego Franciszka z Asyżu umiłował wszystkie
              Jego dzieła. Sława jego świętości jako „ojca biedaków” przetrwała do naszych czasów.
            </p>
          </div>

          <div className="mt-12">
            <Eyebrow>Kalendarium</Eyebrow>
            <h2 className="mt-2 font-display text-4xl font-semibold text-lapis">Droga życia</h2>
            <Timeline events={life} />
          </div>

          <blockquote className="mt-12 rounded-2xl border border-gold/40 bg-vellum p-8">
            <p className="text-[0.72rem] font-bold uppercase tracking-[0.25em] text-gold">Modlitwa</p>
            <p className="mt-3 font-display text-2xl italic leading-snug text-lapis">
              Boże, Tyś serce ojca Rafała, kapłana, wypełnił nadprzyrodzoną miłością dla biednych, chorych i nieszczęśliwych oraz
              głęboką czcią Jezusa Ukrzyżowanego, spraw za jego wstawiennictwem, abyśmy silni w wierze i wzajemnej miłości,
              przyczyniali się do zbawienia bliźnich. Przez Chrystusa, Pana naszego. Amen.
            </p>
          </blockquote>

          <Divider className="my-12" />

          <div className="grid gap-5 md:grid-cols-2">
            <div className="rounded-2xl border border-line bg-vellum p-7">
              <p className="font-display text-2xl font-semibold text-lapis">Pamiątka w Wysoczce</p>
              <p className="mt-2 leading-7 text-ink-soft">
                Dla upamiętnienia beatyfikacji mieszkańcy wznieśli krzyż na skrzyżowaniu dróg Wysoczka – Żegowo, a obok, na
                kamieniu, umieścili pamiątkową tablicę.
              </p>
            </div>
            <div className="rounded-2xl border border-line bg-vellum p-7">
              <p className="font-display text-2xl font-semibold text-lapis">Pielgrzymka 9 czerwca</p>
              <p className="mt-2 leading-7 text-ink-soft">
                Od 1998 roku, w rocznicę beatyfikacji, z bukowskiej fary do Wysoczki wyrusza pielgrzymka z relikwiami
                błogosławionego.
              </p>
            </div>
          </div>

          <Link
            href="/parafia/wspolnoty#rafal-chylinski"
            className="group mt-5 flex items-center justify-between gap-4 rounded-2xl bg-lapis p-6 text-gold-pale hover:bg-lapis-light"
          >
            <span>
              <span className="block font-display text-2xl font-semibold">Grupa modlitewna bł. Ojca Rafała</span>
              <span className="text-sm text-gold-pale/70">Spotkania w trzeci wtorek miesiąca, po wieczornej Mszy Świętej</span>
            </span>
            <ArrowRight size={18} className="shrink-0 text-gold-light transition group-hover:translate-x-1" />
          </Link>

          <Link href="/swieci" className="mt-10 inline-flex items-center gap-2 text-sm font-semibold text-lapis hover:text-gold">
            <ArrowLeft size={15} /> Święci i patroni
          </Link>
        </div>
      </section>
    </>
  );
}
