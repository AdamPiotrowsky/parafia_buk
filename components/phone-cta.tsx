import { Phone } from "lucide-react";

import { site } from "@/lib/site";

export const tel = `tel:${site.phone.replace(/\s/g, "")}`;

/* „Dzwoń w godzinach pracy biura: wt., czw., pt., sob. 9:00–11:00 · śr. 16:00–18:00” */
export function OfficeHoursNote({ className = "" }: { className?: string }) {
  return (
    <span className={className}>
      Dzwoń w godzinach pracy biura: {site.officeHoursShort}
    </span>
  );
}

/* Duży granatowy pasek z telefonem do biura parafialnego */
export function PhoneCta({ label = "Biuro parafialne", className = "" }: { label?: string; className?: string }) {
  return (
    <a href={tel} className={`flex flex-col items-center justify-center gap-1 rounded-2xl bg-lapis p-6 text-center text-gold-pale hover:bg-lapis-light ${className}`}>
      <span className="flex items-center gap-3">
        <Phone size={20} />
        <span>
          {label}: <strong className="font-display text-2xl">{site.phone}</strong>
        </span>
      </span>
      <OfficeHoursNote className="text-xs text-gold-pale/70" />
    </a>
  );
}
