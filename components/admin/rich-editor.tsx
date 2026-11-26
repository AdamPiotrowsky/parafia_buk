"use client";

import { useEffect, useRef } from "react";
import { Bold, Heading2, Italic, Link2, List, ListOrdered, RemoveFormatting, Undo2 } from "lucide-react";

const tools = [
  { id: "bold", icon: Bold, label: "Pogrubienie", command: "bold" },
  { id: "italic", icon: Italic, label: "Kursywa", command: "italic" },
  { id: "h3", icon: Heading2, label: "Śródtytuł", command: "formatBlock", value: "h3" },
  { id: "ul", icon: List, label: "Lista punktowana", command: "insertUnorderedList" },
  { id: "ol", icon: ListOrdered, label: "Lista numerowana", command: "insertOrderedList" },
  { id: "link", icon: Link2, label: "Link", command: "createLink" },
  { id: "plain", icon: RemoveFormatting, label: "Zwykły tekst", command: "removeFormat" },
  { id: "undo", icon: Undo2, label: "Cofnij", command: "undo" },
] as { id: string; icon: typeof Bold; label: string; command: string; value?: string }[];

/*
 * Prosty edytor treści — wygląda od razu tak jak na stronie (te same style .document-content).
 * Przy wysyłaniu formularza treść dopisujemy do danych pod nazwą `name`
 * (zdarzenie formdata — działa też po ponownej wysyłce po błędzie). Serwer i tak czyści HTML.
 * Zmiana `defaultHtml` (np. po wczytaniu Worda) podmienia całą treść edytora.
 */
export function RichEditor({ name, defaultHtml, minHeight = "20rem" }: { name: string; defaultHtml: string; minHeight?: string }) {
  const area = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (area.current) area.current.innerHTML = defaultHtml;
    // Enter tworzy nowy akapit <p>, a nie <div>
    document.execCommand("defaultParagraphSeparator", false, "p");
  }, [defaultHtml]);

  useEffect(() => {
    const form = area.current?.closest("form");
    if (!form) return;
    const add = (e: FormDataEvent) => e.formData.set(name, area.current?.innerHTML ?? "");
    form.addEventListener("formdata", add);
    return () => form.removeEventListener("formdata", add);
  }, [name]);

  const apply = (tool: (typeof tools)[number]) => {
    area.current?.focus();
    if (tool.id === "link") {
      const url = window.prompt("Adres linku (np. https://…)");
      if (url) document.execCommand("createLink", false, url);
    } else if (tool.id === "plain") {
      document.execCommand("removeFormat");
      document.execCommand("formatBlock", false, "p");
    } else {
      document.execCommand(tool.command, false, tool.value);
    }
  };

  return (
    <div className="overflow-hidden rounded-2xl border border-line bg-white focus-within:border-lapis/50">
      <div className="flex flex-wrap gap-1 border-b border-line bg-parchment/60 p-2">
        {tools.map((tool) => (
          <button
            key={tool.id}
            type="button"
            title={tool.label}
            aria-label={tool.label}
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => apply(tool)}
            className="flex h-9 w-9 items-center justify-center rounded-lg text-ink-soft hover:bg-white hover:text-lapis"
          >
            <tool.icon size={17} />
          </button>
        ))}
      </div>
      <div
        ref={area}
        contentEditable
        suppressContentEditableWarning
        className="document-content max-h-[70vh] overflow-y-auto px-6 py-5 outline-none sm:px-8"
        style={{ minHeight }}
      />
    </div>
  );
}
