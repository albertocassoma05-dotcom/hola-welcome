import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Apple, Facebook } from "lucide-react";

import { Logo } from "@/components/app/art";
import { BackBar, Divider, LinkBtn, Screen } from "@/components/app/ui";

export const Route = createFileRoute("/entrar")({
  head: () => ({ meta: [{ title: "Entrar — Taxio" }] }),
  component: Entrar,
});

function Entrar() {
  const navigate = useNavigate();
  const go = () => navigate({ to: "/perfil" });
  const options = [
    { label: "Continuar com o Facebook", icon: <Facebook className="size-5 text-[#1877F2]" /> },
    {
      label: "Continuar com o Google",
      icon: <span className="text-lg font-black text-[#EA4335]">G</span>,
    },
    { label: "Continuar com a Apple", icon: <Apple className="size-5 text-ink" /> },
  ];

  return (
    <Screen>
      <BackBar />
      <div className="flex flex-1 flex-col items-center px-6 pb-8">
        <div className="mt-6">
          <Logo size={96} />
        </div>
        <h1 className="mt-6 text-[2rem] font-extrabold text-ink">Vamos começar</h1>

        <div className="mt-8 w-full space-y-3">
          {options.map((o) => (
            <button
              key={o.label}
              type="button"
              onClick={go}
              className="flex h-[3.25rem] w-full items-center justify-center gap-3 rounded-2xl border border-border bg-white text-sm font-bold text-ink transition-colors hover:bg-sun-50"
            >
              {o.icon}
              {o.label}
            </button>
          ))}
        </div>

        <div className="my-6 w-full">
          <Divider>ou</Divider>
        </div>

        <div className="w-full">
          <LinkBtn to="/login">Entrar com palavra-passe</LinkBtn>
        </div>

        <p className="mt-auto pt-8 text-sm font-medium text-muted-foreground">
          Ainda não tem conta?{" "}
          <Link to="/cadastro" className="font-bold text-sun-700">
            Criar conta
          </Link>
        </p>
      </div>
    </Screen>
  );
}
