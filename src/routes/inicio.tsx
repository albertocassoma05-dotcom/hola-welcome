import { createFileRoute, Link } from "@tanstack/react-router";
import { Bell, Briefcase, Building2, House, Search, MapPin } from "lucide-react";

import { BottomNav } from "@/components/app/bottom-nav";
import { CityMap, TaxiMarker, UserPin } from "@/components/app/map";
import { Screen } from "@/components/app/ui";
import { useProfile } from "@/lib/session";
import { TAXIS } from "@/lib/taxis";

export const Route = createFileRoute("/inicio")({
  head: () => ({ meta: [{ title: "Táxis por perto — Taxio" }] }),
  component: Inicio,
});

const SAVED = [
  { label: "Casa", icon: House },
  { label: "Trabalho", icon: Briefcase },
  { label: "Apartamento", icon: Building2 },
];

function initials(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  return (parts[0]?.[0] ?? "") + (parts.length > 1 ? (parts.at(-1)?.[0] ?? "") : "");
}

function Inicio() {
  const { profile } = useProfile();
  const round =
    "grid size-11 place-items-center rounded-full bg-white text-ink shadow-[0_6px_16px_-8px_var(--sun-700)] transition-transform active:scale-95";

  return (
    <Screen className="h-full">
      <div className="relative flex-1">
        <CityMap>
          {TAXIS.map((t, i) => (
            <TaxiMarker key={i} taxi={t} />
          ))}
          <UserPin photo={profile.photo} initials={initials(profile.name).toUpperCase() || "Eu"} />
        </CityMap>

        <div className="absolute inset-x-0 top-0 z-10 flex items-center justify-between px-5 pt-6">
          <p className="rounded-full bg-white px-4 py-2 text-sm font-bold text-ink shadow-[0_6px_16px_-8px_var(--sun-700)]">
            {profile.nickname ? `Olá, ${profile.nickname}` : "5 táxis por perto"}
          </p>
          <div className="flex gap-2.5">
            <Link to="/buscar" aria-label="Pesquisar destino" className={round}>
              <Search className="size-5" />
            </Link>
            <Link to="/notificacoes" aria-label="Notificações" className={round}>
              <Bell className="size-5" />
            </Link>
          </div>
        </div>

        <div className="absolute inset-x-0 bottom-0 z-10 space-y-3 px-5 pb-4">
          <div className="no-scrollbar flex gap-2.5 overflow-x-auto">
            {SAVED.map((s) => (
              <Link
                key={s.label}
                to="/buscar"
                className="flex shrink-0 items-center gap-2 rounded-full border border-sun bg-white px-4 py-2 text-sm font-bold text-sun-700"
              >
                <s.icon className="size-4" />
                {s.label}
              </Link>
            ))}
          </div>
          <Link
            to="/buscar"
            className="flex h-14 items-center gap-3 rounded-2xl bg-white px-4 text-sm font-semibold text-muted-foreground shadow-[0_10px_26px_-12px_var(--sun-700)]"
          >
            <Search className="size-5" />
            Para onde vai?
            <MapPin className="ml-auto size-5 text-sun-700" />
          </Link>
        </div>
      </div>
      <BottomNav />
    </Screen>
  );
}
