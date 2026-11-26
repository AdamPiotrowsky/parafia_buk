"use client";

import { useActionState, useState } from "react";

import { saveBulletinAction } from "@/app/(pl)/zakrystia-7f3k/actions";
import { RichEditor } from "@/components/admin/rich-editor";
import { Field, FormMessage, inputCls, SubmitButton } from "@/components/admin/ui";
import { WordDrop } from "@/components/admin/word-drop";
import { bulletinKinds } from "@/lib/admin/kinds";
import type { BulletinKind, StoredBulletin } from "@/lib/content-store";

/*
 * Ogłoszenia / intencje: przeciągnij Worda → sprawdź i popraw podgląd → zapisz.
 * Edytor pokazuje treść dokładnie tak, jak będzie wyglądała na stronie.
 */
export function BulletinForm({ kind, item }: { kind: BulletinKind; item?: StoredBulletin }) {
  const k = bulletinKinds[kind];
  const [state, action] = useActionState(saveBulletinAction.bind(null, kind, item?.id), undefined);
  const [title, setTitle] = useState(item?.title ?? (kind === "intentions" ? "Intencje mszalne" : ""));
  const [dateLabel, setDateLabel] = useState(item?.dateLabel ?? "");
  const [html, setHtml] = useState(item?.html ?? "");
  const [fileName, setFileName] = useState(item?.fileName ?? "");
  const hasContent = Boolean(html || item);

  return (
    <form action={action} className="space-y-6">
      <section className="rounded-2xl border border-line bg-vellum p-5 sm:p-6">
        <p className="mb-3 text-sm font-semibold text-ink">
          {item ? "Podmień treść nowym plikiem Word (opcjonalnie)" : "1. Wgraj plik Word"}
        </p>
        <WordDrop
          compact={hasContent}
          onConverted={(doc, name) => {
            setHtml(doc.html);
            setFileName(name);
            if (doc.title) setTitle(doc.title);
            if (doc.dateLabel) setDateLabel(doc.dateLabel);
          }}
        />
        {!hasContent && (
          <button type="button" onClick={() => setHtml("<p><br></p>")} className="mt-3 text-sm font-semibold text-lapis underline-offset-4 hover:underline">
            albo wpisz treść ręcznie
          </button>
        )}
      </section>

      {hasContent && (
        <>
          <section className="grid gap-5 rounded-2xl border border-line bg-vellum p-5 sm:grid-cols-2 sm:p-6">
            {!item && <p className="text-sm font-semibold text-ink sm:col-span-2">2. Sprawdź tytuł i datę</p>}
            <Field label="Tytuł" hint={k.titleHint}>
              <input name="title" value={title} onChange={(e) => setTitle(e.target.value)} className={inputCls} required />
            </Field>
            <Field label="Data / okres" hint={k.dateHint}>
              <input name="dateLabel" value={dateLabel} onChange={(e) => setDateLabel(e.target.value)} className={inputCls} />
            </Field>
          </section>

          <section>
            <p className="mb-3 text-sm font-semibold text-ink">
              {item ? "Treść" : "3. Sprawdź treść"}{" "}
              <span className="font-normal text-ink-muted">— tak będzie wyglądać na stronie; możesz tu poprawić literówki</span>
            </p>
            <RichEditor name="html" defaultHtml={html} />
          </section>

          <input type="hidden" name="fileName" value={fileName} />
          <FormMessage state={state} />
          <div className="flex flex-wrap items-center gap-4">
            <SubmitButton>{item ? "Zapisz zmiany" : "Opublikuj na stronie"}</SubmitButton>
            {fileName && <span className="text-sm text-ink-muted">Plik: {fileName}</span>}
          </div>
        </>
      )}
    </form>
  );
}
