import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Check } from "lucide-react";
import { useEffect, useState } from "react";

import { FingerprintArt } from "@/components/app/art";
import { BackBar, Btn, Screen, SuccessSheet } from "@/components/app/ui";

export const Route = createFileRoute("/digital")({
  head: () => ({ meta: [{ title: "Impressão digital — Taxio" }] }),
  component: Digital,
});

function Digital() {
  const navigate = useNavigate();
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!done) return;
    const id = window.setTimeout(() => navigate({ to: "/localizacao" }), 2600);
    return () => window.clearTimeout(id);
  }, [done, navigate]);

  return (
    <Screen>
      <BackBar title="Ative a impressão digital" />
      <div className="flex flex-1 flex-col items-center px-8">
        <p className="mt-8 max-w-[16rem] text-center text-sm font-semibold leading-relaxed text-ink">
          Entre mais depressa e com mais segurança usando a sua impressão digital.
        </p>
        <div className="my-auto">
          <FingerprintArt className="size-48" />
        </div>
        <p className="mb-6 max-w-[15rem] text-center text-sm font-medium text-muted-foreground">
          Pouse o dedo no leitor do telemóvel para começar.
        </p>
      </div>
      <div className="flex gap-3 px-6 pb-8">
        <Btn tone="soft" onClick={() => navigate({ to: "/localizacao" })}>
          Agora não
        </Btn>
        <Btn onClick={() => setDone(true)}>Continuar</Btn>
      </div>
      {done && (
        <SuccessSheet
          icon={Check}
          title="Tudo pronto!"
          text="A sua conta está pronta. Vai ser levado para o mapa dentro de instantes."
        />
      )}
    </Screen>
  );
}
