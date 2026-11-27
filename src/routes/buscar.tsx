import { createFileRoute, Link } from "@tanstack/react-router";
import { History, MapPin, Search, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

import { EmptyArt } from "@/components/app/art";
import { BackBar, Screen } from "@/components/app/ui";
import {
  DEFAULT_ORIGIN,
  PLACES,
  RECENT_IDS,
  distanceKm,
  formatKm,
  readOrigin,
  searchPlaces,
  type Place,
} from "@/lib/places";

export const Route = createFileRoute("/buscar")({
  head: () => ({ meta: [{ title: "Pesquisar destino — Taxio" }] }),
  component: Buscar,
});

function PlaceRow({
  place,
  origin,
  recent,
}: {
  place: Place;
  origin: { lat: number; lng: number };
  recent?: boolean;
}) {
  return (
    <li>
      <Link
        to="/detalhes"
        search={{ id: place.id }}
        className="flex items-center gap-3.5 rounded-2xl px-2 py-3 transition-colors hover:bg-sun-50"
      >
        <span className="grid size-11 shrink-0 place-items-center rounded-full bg-sun-100">
          {recent ? (
            <History className="size-5 text-sun-700" />
          ) : (
            <MapPin className="size-5 text-sun-700" />
          )}
        </span>
        <span className="min-w-0 flex-1">
          <span className="block truncate text-sm font-bold text-ink">{place.name}</span>
          <span className="block truncate text-xs font-medium text-muted-foreground">
            {place.area} · {place.category}
          </span>
        </span>
        <span className="shrink-0 text-xs font-bold text-ink">
          {formatKm(distanceKm(origin, place))}
        </span>
      </Link>
    </li>
  );
}

function Buscar() {
  const [query, setQuery] = useState("");
  const [recentIds, setRecentIds] = useState(RECENT_IDS);
  const [origin, setOrigin] = useState(DEFAULT_ORIGIN);

  useEffect(() => setOrigin(readOrigin()), []);

  const results = useMemo(() => searchPlaces(query), [query]);
  const searching = query.trim().length > 0;
  const recents = recentIds
    .map((id) => PLACES.find((p) => p.id === id))
    .filter((p): p is Place => !!p);

  return (
    <Screen>
      <BackBar />
      <div className="px-5">
        <label className="flex h-[3.25rem] items-center gap-3 rounded-2xl border border-sun bg-sun-50 px-4">
          <Search className="size-5 shrink-0 text-sun-700" />
          <input
            autoFocus
            aria-label="Pesquisar destino"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Para onde vai?"
            className="min-w-0 flex-1 bg-transparent text-sm font-semibold text-ink outline-none placeholder:font-medium placeholder:text-muted-foreground"
          />
          {query && (
            <button type="button" aria-label="Limpar pesquisa" onClick={() => setQuery("")}>
              <X className="size-5 text-muted-foreground" />
            </button>
          )}
        </label>
      </div>

      <div className="flex flex-1 flex-col px-5 pb-6 pt-6">
        {!searching && (
          <>
            <div className="flex items-center justify-between">
              <h2 className="text-base font-extrabold text-ink">Recentes</h2>
              {recents.length > 0 && (
                <button
                  type="button"
                  onClick={() => setRecentIds([])}
                  className="text-sm font-bold text-sun-700"
                >
                  Limpar
                </button>
              )}
            </div>
            {recents.length > 0 ? (
              <ul className="mt-3">
                {recents.map((p) => (
                  <PlaceRow key={p.id} place={p} origin={origin} recent />
                ))}
              </ul>
            ) : (
              <p className="mt-10 text-center text-sm font-medium text-muted-foreground">
                Os destinos que pesquisar aparecem aqui.
              </p>
            )}
          </>
        )}

        {searching && results.length > 0 && (
          <>
            <div className="flex items-baseline justify-between">
              <h2 className="text-base font-extrabold text-ink">
                Resultados para “{query.trim()}”
              </h2>
              <span className="text-xs font-bold text-sun-700">
                {results.length} {results.length === 1 ? "local" : "locais"}
              </span>
            </div>
            <ul className="mt-3">
              {results.map((p) => (
                <PlaceRow key={p.id} place={p} origin={origin} />
              ))}
            </ul>
          </>
        )}

        {searching && results.length === 0 && (
          <div className="my-auto flex flex-col items-center text-center">
            <EmptyArt />
            <h2 className="mt-4 text-xl font-extrabold text-sun-700">Nenhum resultado</h2>
            <p className="mt-2 max-w-[16rem] text-sm font-medium leading-relaxed text-muted-foreground">
              Não encontrámos “{query.trim()}”. Verifique a escrita ou tente o nome de um bairro.
            </p>
          </div>
        )}
      </div>
    </Screen>
  );
}
