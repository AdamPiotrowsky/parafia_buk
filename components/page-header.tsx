import { Eyebrow, MarianStar } from "@/components/ornament";

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
    <section className="lapis-sky relative overflow-hidden">
      <MarianStar className="pointer-events-none absolute -right-16 -top-16 h-72 w-72 text-gold-light/[0.06]" />
      <div className="relative mx-auto max-w-7xl px-5 py-16 sm:py-20 lg:px-8">
        <Eyebrow light>{eyebrow}</Eyebrow>
        <h1 className="mt-4 max-w-4xl font-display text-5xl font-semibold leading-[1.02] text-gold-pale sm:text-6xl">
          {title}
        </h1>
        {lead && <p className="mt-5 max-w-2xl text-lg leading-8 text-gold-pale/75">{lead}</p>}
      </div>
    </section>
  );
}
