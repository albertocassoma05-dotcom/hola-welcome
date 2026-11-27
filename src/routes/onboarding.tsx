import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";

import { RatingArt, RouteArt, TaxiArt } from "@/components/app/art";
import { Btn, Screen } from "@/components/app/ui";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/onboarding")({
  head: () => ({ meta: [{ title: "Como funciona — Taxio" }] }),
  component: Onboarding,
});

const SLIDES = [
  { art: <TaxiArt />, title: "Táxis profissionais, sempre por perto" },
  { art: <RatingArt />, title: "A sua satisfação vem em primeiro lugar" },
  { art: <RouteArt />, title: "Escolha o destino e siga a viagem no mapa" },
];

function Onboarding() {
  const navigate = useNavigate();
  const [i, setI] = useState(0);
  const last = i === SLIDES.length - 1;
  const slide = SLIDES[i] ?? SLIDES[0]!;

  return (
    <Screen>
      <div className="flex justify-end px-6 pt-8">
        <button
          type="button"
          onClick={() => navigate({ to: "/entrar" })}
          className="text-sm font-bold text-muted-foreground"
        >
          Saltar
        </button>
      </div>
      <div className="flex flex-1 flex-col items-center justify-center px-8" key={i}>
        {slide.art}
        <h1 className="mt-10 max-w-[18rem] text-center text-[1.75rem] font-extrabold leading-tight text-ink">
          {slide.title}
        </h1>
      </div>
      <div className="px-6 pb-8">
        <div
          className="mb-6 flex justify-center gap-2"
          aria-label={`Passo ${i + 1} de ${SLIDES.length}`}
        >
          {SLIDES.map((_, n) => (
            <span
              key={n}
              className={cn(
                "h-2 rounded-full transition-all",
                n === i ? "w-6 bg-sun" : "w-2 bg-sun-200",
              )}
            />
          ))}
        </div>
        <Btn onClick={() => (last ? navigate({ to: "/entrar" }) : setI(i + 1))}>
          {last ? "Começar" : "Seguinte"}
        </Btn>
      </div>
    </Screen>
  );
}
