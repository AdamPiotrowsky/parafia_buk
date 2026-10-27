import type { ForeignLocale } from "@/lib/i18n/config";
import { de } from "./de";
import { en } from "./en";
import { es } from "./es";
import type { PageContent } from "./types";

export const content: Record<ForeignLocale, PageContent> = { en, de, es };
