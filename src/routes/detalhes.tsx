import { createFileRoute, Link, useRouter } from "@tanstack/react-router";
import { ArrowLeft, Navigation } from "lucide-react";
import { useEffect, useState } from "react";

import { CityMap, DestinationPin } from "@/components/app/map";
import { Screen } from "@/components/app/ui";
import { DEFAULT_ORIGIN, PLACES, distanceKm, formatKm, readOrigin } from "@/lib/places";

export const Route = createFileRoute("/detalhes")({
  validateSearch: (s: Record<string, unknown>) => ({
    id: typeof s["id"] === "string" ? s["id"] : "",
  }),
  head: () => ({ meta: [{ title: "Detalhes do local — Taxio" }] }),
  component: Detalhes,
});

function Detalhes() {
  const router = useRouter();
  const { id } = Route.useSearch();
  const place = PLACES.find((p) => p.id === id);
  const [origin, setOrigin] = useState(DEFAULT_ORIGIN);

  useEffect(() => setOrigin(readOrigin()), []);

  if (!place) {
    return (
      <Screen className="items-center justify-center px-8 text-center">
        <h1 className="text-xl font-extrabold text-ink">Local não encontrado</h1>
        <p className="mt-2 text-sm font-medium text-muted-foreground">
          Volte à pesquisa e escolha outro destino.
        </p>
        <Link
          to="/buscar"
          className="mt-6 rounded-full bg-sun px-6 py-3 text-sm font-bold text-ink"
        >
          Pesquisar destino
        </Link>
      </Screen>
    );
  }

  const km = distanceKm(origin, place);
  const url = `https://www.google.com/maps/dir/?api=1&destination=${place.lat},${place.lng}`;

  return (
    <Screen className="h-full">
      <CityMap>
        <div className="absolute left-1/2 top-[42%] -translate-x-1/2 -translate-y-full">
          <DestinationPin />
        </div>
      </CityMap>
      <header className="relative z-10 px-5 pt-6">
        <button
          type="button"
          aria-label="Voltar"
          onClick={() => router.history.back()}
          className="grid size-11 place-items-center rounded-full bg-white shadow-[0_6px_16px_-8px_var(--sun-700)]"
        >
          <ArrowLeft className="size-5" />
        </button>
      </header>

      <div className="relative z-10 mt-auto px-5 pb-6">
        <div className="rounded-3xl bg-white p-5 shadow-[0_14px_34px_-16px_var(--sun-700)]">
          <h1 className="text-lg font-extrabold text-ink">{place.name}</h1>
          <p className="mt-1 text-sm font-medium text-muted-foreground">
            {place.area} · {place.category}
          </p>
          <p className="mt-3 text-sm font-bold text-sun-700">A {formatKm(km)} em linha reta</p>
          <a
            href={url}
            target="_blank"
            rel="noreferrer"
            className="mt-5 flex h-12 w-full items-center justify-center gap-2 rounded-full bg-sun text-[0.9375rem] font-bold text-ink"
          >
            Ver direções
            <Navigation className="size-4" />
          </a>
        </div>
      </div>
    </Screen>
  );
}
