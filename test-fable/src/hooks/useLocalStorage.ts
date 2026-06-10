import { useEffect, useState } from 'react';

/**
 * Like useState, but the value is persisted to localStorage under `key`.
 * Falls back to `initialValue` when the key is missing or unreadable
 * (private browsing, corrupted JSON, quota errors).
 */
export function useLocalStorage<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(() => {
    try {
      const stored = window.localStorage.getItem(key);
      return stored !== null ? (JSON.parse(stored) as T) : initialValue;
    } catch {
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // Storage unavailable — keep working with in-memory state only.
    }
  }, [key, value]);

  return [value, setValue] as const;
}
