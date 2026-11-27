export type Place = {
  id: string;
  name: string;
  area: string;
  category: string;
  lat: number;
  lng: number;
};

// Pontos de referência de Luanda. As coordenadas são aproximadas e servem de dados de exemplo.
export const PLACES: Place[] = [
  {
    id: "belas",
    name: "Belas Shopping",
    area: "Talatona",
    category: "Centro comercial",
    lat: -8.9176,
    lng: 13.1799,
  },
  {
    id: "kinaxixi",
    name: "Mercado do Kinaxixi",
    area: "Kinaxixi, Ingombota",
    category: "Mercado",
    lat: -8.8199,
    lng: 13.2326,
  },
  {
    id: "sao-miguel",
    name: "Fortaleza de São Miguel",
    area: "Baixa de Luanda",
    category: "Museu",
    lat: -8.8077,
    lng: 13.229,
  },
  {
    id: "ilha",
    name: "Ilha de Luanda",
    area: "Ilha do Cabo",
    category: "Praia e restaurantes",
    lat: -8.799,
    lng: 13.2297,
  },
  {
    id: "aeroporto",
    name: "Aeroporto 4 de Fevereiro",
    area: "Luanda",
    category: "Aeroporto",
    lat: -8.8584,
    lng: 13.2312,
  },
  {
    id: "boavida",
    name: "Hospital Américo Boavida",
    area: "Maianga",
    category: "Hospital",
    lat: -8.8266,
    lng: 13.2506,
  },
  {
    id: "uan",
    name: "Universidade Agostinho Neto",
    area: "Camama",
    category: "Universidade",
    lat: -8.8855,
    lng: 13.2315,
  },
  {
    id: "marginal",
    name: "Marginal de Luanda",
    area: "Baía de Luanda",
    category: "Passeio",
    lat: -8.81,
    lng: 13.233,
  },
  {
    id: "porto",
    name: "Porto de Luanda",
    area: "Baixa de Luanda",
    category: "Porto",
    lat: -8.797,
    lng: 13.24,
  },
  {
    id: "estadio",
    name: "Estádio 11 de Novembro",
    area: "Kilamba",
    category: "Estádio",
    lat: -8.9487,
    lng: 13.186,
  },
];

export const RECENT_IDS = ["belas", "ilha", "kinaxixi", "aeroporto", "sao-miguel", "uan"];

export const DEFAULT_ORIGIN = { lat: -8.8147, lng: 13.2302 };

export function distanceKm(a: { lat: number; lng: number }, b: { lat: number; lng: number }) {
  const rad = (d: number) => (d * Math.PI) / 180;
  const dLat = rad(b.lat - a.lat);
  const dLng = rad(b.lng - a.lng);
  const h =
    Math.sin(dLat / 2) ** 2 + Math.cos(rad(a.lat)) * Math.cos(rad(b.lat)) * Math.sin(dLng / 2) ** 2;
  return 6371 * 2 * Math.asin(Math.sqrt(h));
}

export function formatKm(km: number) {
  return `${km.toFixed(1).replace(".", ",")} km`;
}

export function normalize(text: string) {
  return text.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
}

export function searchPlaces(query: string) {
  const q = normalize(query.trim());
  if (!q) return [];
  return PLACES.filter((p) => normalize(`${p.name} ${p.area} ${p.category}`).includes(q));
}

const ORIGIN_KEY = "taxio:origin";

export function readOrigin() {
  try {
    const raw = window.localStorage.getItem(ORIGIN_KEY);
    if (raw) {
      const p = JSON.parse(raw);
      if (typeof p.lat === "number" && typeof p.lng === "number")
        return p as { lat: number; lng: number };
    }
  } catch {
    // sem armazenamento: usa o ponto central
  }
  return DEFAULT_ORIGIN;
}

export function saveOrigin(origin: { lat: number; lng: number }) {
  try {
    window.localStorage.setItem(ORIGIN_KEY, JSON.stringify(origin));
  } catch {
    // ignora
  }
}
