import { site } from "@/lib/site";

/*
 * Nazwy w ustalonej kolejności: najpierw parafia, zaraz pod nią — wyraźnie — sanktuarium.
 * tone="dark" na granatowym tle, tone="light" na białym.
 */
export function ParishTitle({
  tone,
  align = "left",
  size = "lg",
}: {
  tone: "dark" | "light";
  align?: "left" | "center";
  size?: "md" | "lg";
}) {
  const dark = tone === "dark";
  return (
    <div className={align === "center" ? "text-center" : ""}>
      <p className={`text-[0.72rem] font-bold uppercase tracking-[0.3em] ${dark ? "text-gold-light" : "text-gold"}`}>{site.diocese}</p>
      <h1
        className={`mt-3 font-display font-semibold leading-[1.02] ${dark ? "text-gold-pale" : "text-lapis"} ${
          size === "lg" ? "text-5xl sm:text-6xl lg:text-7xl" : "text-4xl sm:text-5xl lg:text-6xl"
        }`}
      >
        {site.parishShort}
      </h1>
      <div className={`mt-4 flex items-center gap-4 ${align === "center" ? "justify-center" : ""}`}>
        <span className={`hidden h-px w-12 sm:block ${dark ? "bg-gold-light/60" : "bg-gold"}`} aria-hidden />
        <p
          className={`font-display italic leading-tight ${dark ? "gold-text" : "text-[#8a6a2a]"} ${
            size === "lg" ? "text-3xl sm:text-4xl" : "text-2xl sm:text-3xl"
          }`}
        >
          Sanktuarium Matki Bożej Bukowskiej Literackiej
        </p>
        {align === "center" && <span className={`hidden h-px w-12 sm:block ${dark ? "bg-gold-light/60" : "bg-gold"}`} aria-hidden />}
      </div>
    </div>
  );
}
