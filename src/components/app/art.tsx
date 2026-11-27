import { CarTaxiFront } from "lucide-react";

/* Ilustrações próprias, desenhadas com as cores da marca. */

export function Logo({ size = 150 }: { size?: number }) {
  return (
    <svg width={size} height={size * 1.12} viewBox="0 0 150 168" role="img" aria-label="Taxio">
      <path d="M75 6a69 69 0 0 1 32 130.2L75 162l-32-25.8A69 69 0 0 1 75 6Z" fill="var(--sun)" />
      <circle cx="75" cy="75" r="46" fill="var(--sun-50)" />
      <foreignObject x="45" y="45" width="60" height="60">
        <div className="grid size-[60px] place-items-center text-ink">
          <CarTaxiFront className="size-11" strokeWidth={1.8} />
        </div>
      </foreignObject>
    </svg>
  );
}

export function TaxiArt() {
  return (
    <svg
      viewBox="0 0 240 190"
      className="w-full max-w-[17rem]"
      role="img"
      aria-label="Táxi de frente"
    >
      <ellipse cx="120" cy="172" rx="92" ry="9" fill="var(--sun-100)" />
      <rect x="88" y="22" width="64" height="20" rx="6" fill="var(--ink)" />
      <text
        x="120"
        y="37"
        textAnchor="middle"
        fontSize="12"
        fontWeight="800"
        fill="var(--sun)"
        letterSpacing="2"
      >
        TÁXI
      </text>
      <path d="M58 118 78 52a12 12 0 0 1 11-8h62a12 12 0 0 1 11 8l20 66Z" fill="var(--sun)" />
      <path
        d="M86 58h68l13 50H73Z"
        fill="var(--sun-50)"
        stroke="var(--ink)"
        strokeWidth="3"
        strokeLinejoin="round"
      />
      <rect
        x="34"
        y="108"
        width="172"
        height="54"
        rx="18"
        fill="var(--sun)"
        stroke="var(--ink)"
        strokeWidth="3"
      />
      <rect x="92" y="126" width="56" height="18" rx="6" fill="var(--ink)" />
      <circle cx="62" cy="128" r="10" fill="var(--sun-50)" stroke="var(--ink)" strokeWidth="3" />
      <circle cx="178" cy="128" r="10" fill="var(--sun-50)" stroke="var(--ink)" strokeWidth="3" />
      <rect x="46" y="156" width="30" height="14" rx="5" fill="var(--ink)" />
      <rect x="164" y="156" width="30" height="14" rx="5" fill="var(--ink)" />
      <path
        d="M34 124h-8a6 6 0 0 0-5 9l6 2h7ZM206 124h8a6 6 0 0 1 5 9l-6 2h-7Z"
        fill="var(--ink)"
      />
    </svg>
  );
}

function Star({ x, y, fill }: { x: number; y: number; fill: string }) {
  return (
    <path
      transform={`translate(${x} ${y})`}
      d="M0-12 3.5-4 12-3 5.8 3.2 7.4 12 0 7.7-7.4 12-5.8 3.2-12-3-3.5-4Z"
      fill={fill}
    />
  );
}

export function RatingArt() {
  return (
    <svg
      viewBox="0 0 240 190"
      className="w-full max-w-[17rem]"
      role="img"
      aria-label="Cartão de avaliação com cinco estrelas"
    >
      <ellipse cx="120" cy="174" rx="88" ry="8" fill="var(--sun-100)" />
      <rect
        x="50"
        y="26"
        width="140"
        height="142"
        rx="22"
        fill="white"
        stroke="var(--ink)"
        strokeWidth="3"
      />
      <circle cx="120" cy="64" r="20" fill="var(--sun)" stroke="var(--ink)" strokeWidth="3" />
      <path d="M108 94q12-14 24 0" fill="none" />
      <circle cx="120" cy="58" r="6" fill="var(--ink)" />
      <path d="M107 76q13-14 26 0" fill="var(--ink)" />
      {[0, 1, 2, 3, 4].map((i) => (
        <Star key={i} x={78 + i * 21} y={118} fill={i < 5 ? "var(--sun)" : "var(--sun-200)"} />
      ))}
      <rect x="76" y="140" width="88" height="8" rx="4" fill="var(--sun-100)" />
      <rect x="92" y="154" width="56" height="8" rx="4" fill="var(--sun-100)" />
    </svg>
  );
}

export function RouteArt() {
  return (
    <svg
      viewBox="0 0 240 190"
      className="w-full max-w-[17rem]"
      role="img"
      aria-label="Rota entre dois pontos no mapa"
    >
      <rect
        x="22"
        y="22"
        width="196"
        height="146"
        rx="26"
        fill="var(--sun-50)"
        stroke="var(--ink)"
        strokeWidth="3"
      />
      <path
        d="M22 78h196M22 124h196M80 22v146M150 22v146"
        stroke="var(--sun-200)"
        strokeWidth="9"
      />
      <path
        d="M52 138C90 138 80 96 116 96s32 42 70-8"
        fill="none"
        stroke="var(--ink)"
        strokeWidth="4"
        strokeDasharray="2 9"
        strokeLinecap="round"
      />
      <circle cx="52" cy="138" r="9" fill="white" stroke="var(--ink)" strokeWidth="3" />
      <path
        d="M186 40a18 18 0 0 1 18 18c0 16-18 32-18 32s-18-16-18-32a18 18 0 0 1 18-18Z"
        fill="var(--sun)"
        stroke="var(--ink)"
        strokeWidth="3"
      />
      <circle cx="186" cy="58" r="6" fill="var(--ink)" />
    </svg>
  );
}

export function PhoneCodeArt() {
  return (
    <svg viewBox="0 0 200 170" className="w-44" role="img" aria-label="Telemóvel com cadeado">
      <ellipse cx="100" cy="158" rx="70" ry="7" fill="var(--sun-100)" />
      <rect
        x="56"
        y="10"
        width="88"
        height="140"
        rx="16"
        fill="white"
        stroke="var(--ink)"
        strokeWidth="3"
      />
      <rect x="86" y="18" width="28" height="5" rx="2.5" fill="var(--ink)" />
      <rect
        x="82"
        y="64"
        width="36"
        height="30"
        rx="7"
        fill="var(--sun)"
        stroke="var(--ink)"
        strokeWidth="3"
      />
      <path d="M89 64v-8a11 11 0 0 1 22 0v8" fill="none" stroke="var(--ink)" strokeWidth="3" />
      <circle cx="100" cy="79" r="4" fill="var(--ink)" />
      <rect x="70" y="108" width="60" height="8" rx="4" fill="var(--sun-100)" />
      <rect x="80" y="122" width="40" height="8" rx="4" fill="var(--sun-100)" />
    </svg>
  );
}

export function KeyArt() {
  return (
    <svg
      viewBox="0 0 200 170"
      className="w-44"
      role="img"
      aria-label="Telemóvel com visto de confirmação"
    >
      <ellipse cx="100" cy="158" rx="70" ry="7" fill="var(--sun-100)" />
      <rect
        x="56"
        y="10"
        width="88"
        height="140"
        rx="16"
        fill="white"
        stroke="var(--ink)"
        strokeWidth="3"
      />
      <rect x="86" y="18" width="28" height="5" rx="2.5" fill="var(--ink)" />
      <circle cx="100" cy="80" r="26" fill="var(--sun)" stroke="var(--ink)" strokeWidth="3" />
      <path
        d="m88 80 9 9 16-18"
        fill="none"
        stroke="var(--ink)"
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function EmptyArt() {
  return (
    <svg viewBox="0 0 200 170" className="w-44" role="img" aria-label="Rosto triste">
      <ellipse cx="100" cy="156" rx="64" ry="7" fill="var(--sun-100)" />
      <circle cx="100" cy="82" r="62" fill="var(--sun)" stroke="var(--ink)" strokeWidth="3" />
      <path
        d="M72 70q8-8 16 0M112 70q8-8 16 0"
        fill="none"
        stroke="var(--ink)"
        strokeWidth="5"
        strokeLinecap="round"
      />
      <path
        d="M78 108q22-20 44 0"
        fill="none"
        stroke="var(--ink)"
        strokeWidth="5"
        strokeLinecap="round"
      />
      <path
        d="M146 96c5 8 9 13 9 18a9 9 0 0 1-18 0c0-5 4-10 9-18Z"
        fill="var(--sun-50)"
        stroke="var(--ink)"
        strokeWidth="3"
      />
    </svg>
  );
}

export function FingerprintArt({ className = "size-44" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 120 120"
      className={className}
      fill="none"
      stroke="var(--sun)"
      strokeWidth="5"
      strokeLinecap="round"
      role="img"
      aria-label="Impressão digital"
    >
      <path d="M26 44a38 38 0 0 1 68 0" />
      <path d="M18 60a46 46 0 0 1 8-12M94 48a46 46 0 0 1 8 12" />
      <path d="M34 62a26 26 0 0 1 52 0c0 14 0 26 7 36" />
      <path d="M44 66a16 16 0 0 1 32 0c0 12 2 24 6 34" />
      <path d="M54 68a6 6 0 0 1 12 0c0 14 2 26 4 36" />
      <path d="M34 66c0 14-2 26-8 38M44 82c0 10-2 18-5 26" />
    </svg>
  );
}
