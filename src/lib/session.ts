import { useCallback, useEffect, useState } from "react";

export type Profile = {
  name: string;
  nickname: string;
  email: string;
  photo: string;
};

const KEY = "taxio:profile";
const EMPTY: Profile = { name: "", nickname: "", email: "", photo: "" };

function read(): Profile {
  try {
    const raw = window.localStorage.getItem(KEY);
    return raw ? { ...EMPTY, ...JSON.parse(raw) } : EMPTY;
  } catch {
    return EMPTY;
  }
}

export function useProfile() {
  const [profile, setProfile] = useState<Profile>(EMPTY);

  useEffect(() => {
    setProfile(read());
  }, []);

  const save = useCallback((patch: Partial<Profile>) => {
    const next = { ...read(), ...patch };
    try {
      window.localStorage.setItem(KEY, JSON.stringify(next));
    } catch {
      // armazenamento indisponível: o estado em memória continua a funcionar
    }
    setProfile(next);
  }, []);

  return { profile, save };
}

export function isEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value.trim());
}
