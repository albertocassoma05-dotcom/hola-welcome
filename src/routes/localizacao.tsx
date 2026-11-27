import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { MapPin } from "lucide-react";
import { useState } from "react";

import { CityMap } from "@/components/app/map";
import { Btn, Screen, Sheet } from "@/components/app/ui";
import { saveOrigin } from "@/lib/places";

export const Route = createFileRoute("/localizacao")({
  head: () => ({ meta: [{ title: "Ativar localização — Taxio" }] }),
  component: Localizacao,
});

function Localizacao() {
  const navigate = useNavigate();
  const [busy, setBusy] = useState(false);

  function enable() {
    if (!("geolocation" in navigator)) {
      navigate({ to: "/inicio" });
      return;
    }
    setBusy(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        saveOrigin({ lat: pos.coords.latitude, lng: pos.coords.longitude });
        navigate({ to: "/inicio" });
      },
      () => navigate({ to: "/inicio" }),
      { timeout: 8000 },
    );
  }

  return (
    <Screen className="min-h-full">
      <CityMap className="blur-[2px]" />
      <Sheet label="Ativar localização">
        <div className="mx-auto grid size-24 place-items-center rounded-full bg-sun-100">
          <div className="grid size-16 place-items-center rounded-full bg-sun">
            <MapPin className="size-8 text-ink" strokeWidth={2.2} />
          </div>
        </div>
        <h2 className="mt-5 text-xl font-extrabold text-ink">Ative a localização</h2>
        <p className="mt-2 text-sm font-medium leading-relaxed text-muted-foreground">
          Precisamos de saber onde está para mostrar os táxis por perto e calcular distâncias.
        </p>
        <div className="mt-6 space-y-3">
          <Btn onClick={enable} disabled={busy}>
            {busy ? "A procurar…" : "Ativar localização"}
          </Btn>
          <Btn tone="soft" onClick={() => navigate({ to: "/inicio" })}>
            Agora não
          </Btn>
        </div>
      </Sheet>
    </Screen>
  );
}
