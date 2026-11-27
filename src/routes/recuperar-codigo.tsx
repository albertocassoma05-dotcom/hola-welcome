import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";

import { BackBar, Btn, CodeBoxes, Keypad, Screen } from "@/components/app/ui";
import { useDigits } from "@/lib/use-digits";

type Search = { via: "sms" | "email" };

export const Route = createFileRoute("/recuperar-codigo")({
  validateSearch: (s: Record<string, unknown>): Search => ({
    via: s["via"] === "email" ? "email" : "sms",
  }),
  head: () => ({ meta: [{ title: "Código de confirmação — Taxio" }] }),
  component: Codigo,
});

function Codigo() {
  const navigate = useNavigate();
  const { via } = Route.useSearch();
  const code = useDigits(4);
  const [left, setLeft] = useState(60);

  useEffect(() => {
    if (left <= 0) return;
    const id = window.setTimeout(() => setLeft((n) => n - 1), 1000);
    return () => window.clearTimeout(id);
  }, [left]);

  return (
    <Screen>
      <BackBar title="Recuperar palavra-passe" />
      <div className="flex flex-1 flex-col">
        <p className="mx-auto mt-10 max-w-[16rem] text-center text-sm font-semibold leading-relaxed text-ink">
          {via === "sms"
            ? "Enviámos um código por SMS para +244 9•• ••• •99."
            : "Enviámos um código para o seu email."}
        </p>
        <div className="mt-10">
          <CodeBoxes value={code.value} />
        </div>
        <p className="mt-8 text-center text-sm font-semibold text-ink">
          {left > 0 ? (
            <>
              Pedir novo código em <span className="text-sun-700">{left} s</span>
            </>
          ) : (
            <button type="button" className="font-bold text-sun-700" onClick={() => setLeft(60)}>
              Reenviar código
            </button>
          )}
        </p>
        <div className="mt-auto px-6 pb-4">
          <Btn disabled={!code.complete} onClick={() => navigate({ to: "/nova-senha" })}>
            Confirmar
          </Btn>
        </div>
        <Keypad onDigit={code.add} onDelete={code.remove} />
      </div>
    </Screen>
  );
}
