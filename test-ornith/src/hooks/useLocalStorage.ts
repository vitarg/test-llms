import { useState, useEffect, useRef } from "react";

export function useLocalStorage<T>(
  key: string,
  initialValue: T,
): [T, React.Dispatch<React.SetStateAction<T>>] {
  const [stored, setStored] = useState<T>(() => {
    try {
      const raw = localStorage.getItem(key);
      return raw ? (JSON.parse(raw) as T) : initialValue;
    } catch {
      return initialValue;
    }
  });

  const mounted = useRef(true);
  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
    };
  }, []);

  useEffect(() => {
    if (!mounted.current) return;
    try {
      localStorage.setItem(key, JSON.stringify(stored));
    } catch {
      /* storage full or unavailable */
    }
  }, [key, stored]);

  return [stored, setStored];
}
