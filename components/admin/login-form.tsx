"use client";

import { useActionState } from "react";

import { login } from "@/app/(pl)/zakrystia-7f3k/actions";
import { FormMessage, inputCls, SubmitButton } from "@/components/admin/ui";

export function LoginForm() {
  const [state, action] = useActionState(login, undefined);
  return (
    <form action={action} className="mt-7 space-y-4">
      <label className="block">
        <span className="text-sm font-semibold text-ink">Hasło</span>
        <input name="password" type="password" autoComplete="current-password" autoFocus required className={`${inputCls} mt-1.5`} />
      </label>
      <FormMessage state={state} />
      <div className="flex justify-center pt-1">
        <SubmitButton>Wejdź</SubmitButton>
      </div>
    </form>
  );
}
