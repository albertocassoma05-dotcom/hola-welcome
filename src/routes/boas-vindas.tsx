import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";

import { Screen } from "@/components/app/ui";

export const Route = createFileRoute("/boas-vindas")({
  head: () => ({ meta: [{ title: "Boas-vindas — Taxio" }] }),
  component: Welcome,
});

function Checker() {
  return (
    <div
      aria-hidden
      className="h-6 w-full"
      style={{
        backgroundImage:
          "conic-gradient(var(--ink) 25%, var(--sun) 0 50%, var(--ink) 0 75%, var(--sun) 0)",
        backgroundSize: "1.5rem 1.5rem",
      }}
    />
  );
}

function Welcome() {
  const navigate = useNavigate();
  useEffect(() => {
    const id = window.setTimeout(() => navigate({ to: "/onboarding" }), 3200);
    return () => window.clearTimeout(id);
  }, [navigate]);

  return (
    <Screen className="bg-ink text-white">
      <div className="flex flex-1 flex-col justify-end px-7 pb-10">
        <p className="text-3xl font-bold leading-tight">Bem-vindo ao</p>
        <h1 className="text-[4.5rem] font-extrabold leading-none tracking-tight text-sun">Taxio</h1>
        <p className="mt-4 max-w-[17rem] text-sm font-medium leading-relaxed text-white/70">
          Peça um táxi em segundos e siga o motorista até à sua porta.
        </p>
        <Link
          to="/onboarding"
          className="mt-8 grid h-12 place-items-center rounded-full bg-sun text-[0.9375rem] font-bold text-ink"
        >
          Começar
        </Link>
      </div>
      <Checker />
    </Screen>
  );
}
