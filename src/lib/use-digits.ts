import { useCallback, useEffect, useState } from "react";

/** Guarda um código numérico e aceita tanto o teclado do ecrã como o teclado físico. */
export function useDigits(length: number) {
  const [value, setValue] = useState("");

  const add = useCallback(
    (d: string) => setValue((v) => (v.length < length ? v + d : v)),
    [length],
  );
  const remove = useCallback(() => setValue((v) => v.slice(0, -1)), []);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (/^\d$/.test(e.key)) add(e.key);
      else if (e.key === "Backspace") remove();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [add, remove]);

  return { value, add, remove, complete: value.length === length };
}
