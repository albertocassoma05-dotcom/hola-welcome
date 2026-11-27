import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Mail, MessageSquare } from "lucide-react";
import { useState } from "react";

import { PhoneCodeArt } from "@/components/app/art";
import { BackBar, Btn, Screen } from "@/components/app/ui";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/recuperar")({
  head: () => ({ meta: [{ title: "Recuperar palavra-passe — Taxio" }] }),
  component: Recuperar,
});

const METHODS = [
  { id: "sms", label: "Por SMS", value: "+244 9•• ••• •99", icon: MessageSquare },
  { id: "email", label: "Por email", value: "no•••••@exemplo.com", icon: Mail },
] as const;

function Recuperar() {
  const navigate = useNavigate();
  const [method, setMethod] = useState<(typeof METHODS)[number]["id"]>("sms");

  return (
    <Screen>
      <BackBar title="Recuperar palavra-passe" />
      <div className="flex flex-1 flex-col items-center px-6">
        <div className="mt-4">
          <PhoneCodeArt />
        </div>
        <p className="mt-6 self-start text-sm font-semibold text-ink">
          Por onde quer receber o código de confirmação?
        </p>
        <div className="mt-4 w-full space-y-3" role="radiogroup" aria-label="Método de recuperação">
          {METHODS.map((m) => {
            const active = method === m.id;
            return (
              <button
                key={m.id}
                type="button"
                role="radio"
                aria-checked={active}
                onClick={() => setMethod(m.id)}
                className={cn(
                  "flex w-full items-center gap-4 rounded-2xl border-2 p-4 text-left transition-colors",
                  active ? "border-sun bg-sun-50" : "border-border bg-white",
                )}
              >
                <span className="grid size-12 place-items-center rounded-full bg-sun-100">
                  <m.icon className="size-5 text-sun-700" />
                </span>
                <span>
                  <span className="block text-xs font-semibold text-muted-foreground">
                    {m.label}
                  </span>
                  <span className="block text-sm font-bold text-ink">{m.value}</span>
                </span>
              </button>
            );
          })}
        </div>
      </div>
      <div className="px-6 pb-8 pt-6">
        <Btn onClick={() => navigate({ to: "/recuperar-codigo", search: { via: method } })}>
          Continuar
        </Btn>
      </div>
    </Screen>
  );
}
