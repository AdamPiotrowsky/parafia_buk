"use client";

import { useActionState } from "react";

import { changePassword } from "@/app/(pl)/zakrystia-7f3k/actions";
import { Field, FormMessage, inputCls, SubmitButton } from "@/components/admin/ui";

export function PasswordForm() {
  const [state, action] = useActionState(changePassword, undefined);
  return (
    <form action={action} className="max-w-md space-y-5 rounded-2xl border border-line bg-vellum p-6">
      <Field label="Obecne hasło">
        <input name="current" type="password" autoComplete="current-password" required className={inputCls} />
      </Field>
      <Field label="Nowe hasło" hint="min. 10 znaków">
        <input name="next" type="password" autoComplete="new-password" minLength={10} required className={inputCls} />
      </Field>
      <Field label="Powtórz nowe hasło">
        <input name="repeat" type="password" autoComplete="new-password" minLength={10} required className={inputCls} />
      </Field>
      <FormMessage state={state} />
      <SubmitButton>Zmień hasło</SubmitButton>
    </form>
  );
}
