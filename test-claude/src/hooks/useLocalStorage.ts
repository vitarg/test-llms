import { useEffect, useState } from "react";

/**
 * Generic localStorage-backed state. Reusable for any serialisable value,
 * which keeps persistence concerns out of the domain hook (useExpenses).
 *
 * - Lazy initial read so we only touch localStorage once on mount.
 * - Writes are mirrored to storage whenever the value changes.
 */
export function useLocalStorage<T>(
  key: string,
  initialValue: T,
): [T, React.Dispatch<React.SetStateAction<T>>] {
  const [value, setValue] = useState<T>(() => readFromStorage(key, initialValue));

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      // Quota exceeded or storage disabled — fail soft, app still works in-memory.
      console.warn(`Failed to persist "${key}" to localStorage:`, error);
    }
  }, [key, value]);

  return [value, setValue];
}

function readFromStorage<T>(key: string, fallback: T): T {
  try {
    const raw = window.localStorage.getItem(key);
    return raw === null ? fallback : (JSON.parse(raw) as T);
  } catch (error) {
    console.warn(`Failed to read "${key}" from localStorage:`, error);
    return fallback;
  }
}
