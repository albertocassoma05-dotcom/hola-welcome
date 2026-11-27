import type { CSSProperties, ReactNode } from "react";

import type { Taxi } from "@/lib/taxis";

import { cn } from "@/lib/utils";

const MAIN_ROADS = [
  "M-30 190 L440 120",
  "M70 -30 L150 840",
  "M-30 560 L440 640",
  "M310 -30 L250 840",
  "M-30 360 C130 330 270 400 440 340",
];
const MINOR_ROADS = [
  "M-30 90 L440 40",
  "M-30 280 L440 250",
  "M-30 470 L440 450",
  "M-30 720 L440 760",
  "M10 -30 L60 840",
  "M210 -30 L180 840",
  "M380 -30 L330 840",
  "M150 120 L260 700",
  "M240 190 C300 260 360 270 440 250",
];

/** Mapa estilizado de ruas. Não usa dados reais: serve de fundo para o fluxo de corridas. */
export function CityMap({ className, children }: { className?: string; children?: ReactNode }) {
  return (
    <div className={cn("absolute inset-0 overflow-hidden bg-[#fbf3d8]", className)}>
      <svg
        viewBox="0 0 400 800"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 size-full"
        aria-hidden
      >
        <rect width="400" height="800" fill="#fbf3d8" />
        <path d="M-10 -10H420V70C340 90 290 40 200 60S60 90-10 60Z" fill="#f0e2a6" />
        <rect x="88" y="410" width="104" height="80" rx="14" fill="#f5e9b8" />
        <rect x="262" y="640" width="120" height="96" rx="14" fill="#f5e9b8" />
        <rect x="20" y="640" width="90" height="70" rx="14" fill="#f5e9b8" />
        {MINOR_ROADS.map((d) => (
          <path key={d} d={d} stroke="#fffdf3" strokeWidth="7" fill="none" />
        ))}
        {MAIN_ROADS.map((d) => (
          <g key={d}>
            <path d={d} stroke="#efdfa0" strokeWidth="17" fill="none" />
            <path d={d} stroke="#fffdf3" strokeWidth="13" fill="none" />
          </g>
        ))}
        <g fontSize="9" fontWeight="700" fill="#b59a45" opacity=".85">
          <text transform="translate(96 330) rotate(-6)">Rua Rainha Ginga</text>
          <text transform="translate(40 600) rotate(5)">Av. 4 de Fevereiro</text>
          <text transform="translate(140 175) rotate(-9)">Av. Marginal</text>
        </g>
      </svg>
      {children}
    </div>
  );
}

export function TaxiMarker({ taxi }: { taxi: Taxi }) {
  const style = {
    left: `${taxi.x}%`,
    top: `${taxi.y}%`,
    "--dx": `${taxi.dx}px`,
    "--dy": `${taxi.dy}px`,
    animation: `taxi-drift ${taxi.t}s ease-in-out infinite alternate`,
  } as CSSProperties;
  return (
    <span className="taxi-marker absolute" style={style} aria-hidden>
      <svg
        width="20"
        height="34"
        viewBox="0 0 20 34"
        style={{ transform: `rotate(${taxi.rot}deg)` }}
      >
        <rect
          x="1.5"
          y="1.5"
          width="17"
          height="31"
          rx="6"
          fill="var(--sun)"
          stroke="var(--ink)"
          strokeWidth="2"
        />
        <rect x="4.5" y="9" width="11" height="6" rx="2" fill="var(--ink)" />
        <rect x="4.5" y="22" width="11" height="5" rx="2" fill="var(--ink)" opacity=".75" />
        <rect x="7" y="3.5" width="6" height="2.5" rx="1" fill="white" />
      </svg>
    </span>
  );
}

export function UserPin({ photo, initials }: { photo?: string; initials: string }) {
  return (
    <div className="absolute left-1/2 top-[44%] -translate-x-1/2 -translate-y-1/2">
      <span className="absolute left-1/2 top-1/2 size-[17rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-sun/25" />
      <span className="absolute left-1/2 top-1/2 size-[9.5rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-sun/35" />
      <span className="relative grid size-14 place-items-center overflow-hidden rounded-full border-[3px] border-white bg-sun text-lg font-extrabold text-ink shadow-md">
        {photo ? <img src={photo} alt="Você" className="size-full object-cover" /> : initials}
      </span>
    </div>
  );
}

export function DestinationPin({ className }: { className?: string }) {
  return (
    <svg width="44" height="54" viewBox="0 0 44 54" className={className} aria-hidden>
      <path
        d="M22 2a20 20 0 0 1 20 20c0 16-20 30-20 30S2 38 2 22A20 20 0 0 1 22 2Z"
        fill="var(--sun)"
        stroke="var(--ink)"
        strokeWidth="2.5"
      />
      <circle cx="22" cy="22" r="8" fill="var(--ink)" />
      <circle cx="22" cy="22" r="3" fill="var(--sun)" />
    </svg>
  );
}
