import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Lock, ShieldCheck } from "lucide-react";
import { useEffect, useState } from "react";

import { KeyArt } from "@/components/app/art";
import { BackBar, Field, Remember, Screen, SuccessSheet } from "@/components/app/ui";

export const Route = createFileRoute("/nova-senha")({
  head: () => ({ meta: [{ title: "Nova palavra-passe — Taxio" }] }),
  component: NovaSenha,
});

function NovaSenha() {
  const navigate = useNavigate();
  const [a, setA] = useState("");
  const [b, setB] = useState("");
  const [remember, setRemember] = useState(true);
  const [error, setError] = useState<{ a?: string; b?: string }>({});
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!done) return;
    const id = window.setTimeout(() => navigate({ to: "/login" }), 2600);
    return () => window.clearTimeout(id);
  }, [done, navigate]);

  function submit() {
    const next: typeof error = {};
    if (a.length < 8) next.a = "Use pelo menos 8 caracteres.";
    if (b !== a) next.b = "As palavras-passe não coincidem.";
    setError(next);
    if (!next.a && !next.b) setDone(true);
  }

  return (
    <Screen>
      <BackBar title="Nova palavra-passe" />
      <form
        className="flex flex-1 flex-col items-center px-6 pb-8"
        noValidate
        onSubmit={(e) => {
          e.preventDefault();
          submit();
        }}
      >
        <div className="mt-2">
          <KeyArt />
        </div>
        <p className="mt-4 mb-5 self-start text-sm font-semibold text-ink">
          Escolha a sua nova palavra-passe.
        </p>
        <div className="w-full space-y-3.5">
          <Field
            icon={Lock}
            type="password"
            autoComplete="new-password"
            placeholder="Nova palavra-passe"
            value={a}
            onChange={setA}
            error={error.a}
          />
          <Field
            icon={Lock}
            type="password"
            autoComplete="new-password"
            placeholder="Repita a palavra-passe"
            value={b}
            onChange={setB}
            error={error.b}
          />
        </div>
        <div className="mt-6">
          <Remember checked={remember} onChange={setRemember} />
        </div>
        <button
          type="submit"
          className="mt-auto h-12 w-full rounded-full bg-sun text-[0.9375rem] font-bold text-ink shadow-[0_6px_14px_-8px_var(--sun-700)]"
        >
          Guardar palavra-passe
        </button>
      </form>
      {done && (
        <SuccessSheet
          icon={ShieldCheck}
          title="Palavra-passe atualizada"
          text="Já pode entrar com a nova palavra-passe. Vai ser levado ao ecrã de entrada."
        />
      )}
    </Screen>
  );
}
