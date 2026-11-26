"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { ImagePlus, X } from "lucide-react";

import { saveNewsAction } from "@/app/(pl)/zakrystia-7f3k/actions";
import { RichEditor } from "@/components/admin/rich-editor";
import { Field, FormMessage, inputCls, SubmitButton } from "@/components/admin/ui";
import { WordDrop } from "@/components/admin/word-drop";
import type { StoredNews } from "@/lib/content-store";

const today = () => new Date().toLocaleDateString("sv-SE"); // rrrr-mm-dd w czasie lokalnym

/* Aktualność: tytuł, data, zdjęcie (opcjonalne) i treść — wpisana albo wczytana z Worda */
export function NewsForm({ item }: { item?: StoredNews }) {
  const [state, action] = useActionState(saveNewsAction.bind(null, item?.id), undefined);
  const [title, setTitle] = useState(item?.title ?? "");
  const [date, setDate] = useState(item?.date ?? today());
  const [html, setHtml] = useState(item?.html ?? "");

  return (
    <form action={action} className="space-y-6">
      <section className="grid gap-5 rounded-2xl border border-line bg-vellum p-5 sm:grid-cols-[1fr_12rem] sm:p-6">
        <Field label="Tytuł">
          <input name="title" value={title} onChange={(e) => setTitle(e.target.value)} className={inputCls} placeholder="np. Zaproszenie na Jerycho Różańcowe" required />
        </Field>
        <Field label="Data">
          <input name="date" type="date" value={date} onChange={(e) => setDate(e.target.value)} className={inputCls} required />
        </Field>
      </section>

      <section className="rounded-2xl border border-line bg-vellum p-5 sm:p-6">
        <p className="mb-3 text-sm font-semibold text-ink">
          Zdjęcie <span className="font-normal text-ink-muted">— opcjonalne; bez zdjęcia pokaże się logo parafii</span>
        </p>
        <PhotoDrop current={item?.image ? `/api/zdjecia/${item.image}` : undefined} />
      </section>

      <section>
        <p className="mb-3 text-sm font-semibold text-ink">
          Treść <span className="font-normal text-ink-muted">— wpisz poniżej albo wczytaj z pliku Word</span>
        </p>
        <div className="mb-3">
          <WordDrop
            compact
            onConverted={(doc) => {
              setHtml(doc.html);
              if (doc.title && !title) setTitle(doc.title);
            }}
          />
        </div>
        <RichEditor name="html" defaultHtml={html} minHeight="14rem" />
      </section>

      <FormMessage state={state} />
      <SubmitButton>{item ? "Zapisz zmiany" : "Opublikuj aktualność"}</SubmitButton>
    </form>
  );
}

function PhotoDrop({ current }: { current?: string }) {
  const input = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | undefined>(current);
  const [removed, setRemoved] = useState(false);
  const [over, setOver] = useState(false);

  useEffect(() => () => {
    if (preview?.startsWith("blob:")) URL.revokeObjectURL(preview);
  }, [preview]);

  function pick(file: File | undefined) {
    if (!file || !file.type.startsWith("image/") || !input.current) return;
    // upuszczony plik wkładamy do zwykłego pola formularza
    const dt = new DataTransfer();
    dt.items.add(file);
    input.current.files = dt.files;
    setPreview(URL.createObjectURL(file));
    setRemoved(false);
  }

  return (
    <div>
      <input
        ref={input}
        type="file"
        name="photo"
        accept="image/jpeg,image/png,image/webp"
        className="hidden"
        onChange={(e) => pick(e.target.files?.[0])}
      />
      <input type="hidden" name="removePhoto" value={removed ? "1" : ""} />

      {preview ? (
        <div className="flex flex-wrap items-end gap-4">
          {/* eslint-disable-next-line @next/next/no-img-element -- podgląd wybranego pliku (blob:) */}
          <img src={preview} alt="Podgląd zdjęcia" className="h-44 w-auto max-w-full rounded-xl border border-line object-cover" />
          <div className="flex gap-2">
            <button type="button" onClick={() => input.current?.click()} className="rounded-full border border-line bg-white px-4 py-2 text-sm font-semibold text-lapis hover:border-lapis/40">
              Zmień zdjęcie
            </button>
            <button
              type="button"
              onClick={() => {
                if (input.current) input.current.value = "";
                setPreview(undefined);
                setRemoved(true);
              }}
              className="inline-flex items-center gap-1 rounded-full px-3 py-2 text-sm font-semibold text-wine hover:bg-wine/10"
            >
              <X size={15} /> Usuń
            </button>
          </div>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => input.current?.click()}
          onDragOver={(e) => {
            e.preventDefault();
            setOver(true);
          }}
          onDragLeave={() => setOver(false)}
          onDrop={(e) => {
            e.preventDefault();
            setOver(false);
            pick(e.dataTransfer.files[0]);
          }}
          className={`flex w-full flex-col items-center gap-2 rounded-2xl border-2 border-dashed px-6 py-8 text-center transition ${
            over ? "border-lapis bg-lapis/5" : "border-line bg-white hover:border-lapis/50"
          }`}
        >
          <ImagePlus className="text-lapis" size={26} />
          <span className="font-semibold text-lapis">Przeciągnij tutaj zdjęcie</span>
          <span className="text-sm text-ink-muted">albo kliknij, żeby wybrać (JPG, PNG)</span>
        </button>
      )}
    </div>
  );
}
