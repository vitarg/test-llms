import { Dispatch, SetStateAction, useEffect, useState } from "react";

type StoredValue<T> = T | (() => T);

function resolveInitialValue<T>(initialValue: StoredValue<T>): T {
  return initialValue instanceof Function ? initialValue() : initialValue;
}

export function useLocalStorage<T>(
  key: string,
  initialValue: StoredValue<T>,
): [T, Dispatch<SetStateAction<T>>] {
  const [value, setValue] = useState<T>(() => {
    if (typeof window === "undefined") {
      return resolveInitialValue(initialValue);
    }

    const storedValue = window.localStorage.getItem(key);
    if (!storedValue) {
      return resolveInitialValue(initialValue);
    }

    try {
      return JSON.parse(storedValue) as T;
    } catch {
      return resolveInitialValue(initialValue);
    }
  });

  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}
