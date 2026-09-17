import { useCallback } from "react";
import { useLocalStorage } from "./useLocalStorage";
import { loadExpenses, saveExpenses } from "../utils/storage";
import type { Expense, Category } from "../types/expense";

const EMPTY: Expense[] = [];

export function useExpenses() {
  const [expenses, setExpenses] = useLocalStorage<Expense[]>(
    "expenses",
    loadExpenses(),
  );

  const addExpense = useCallback(
    (expense: Omit<Expense, "id">) => {
      setExpenses((prev) => [
        ...prev,
        { ...expense, id: crypto.randomUUID() },
      ]);
    },
    [setExpenses],
  );

  const deleteExpense = useCallback(
    (id: string) => {
      setExpenses((prev) => prev.filter((e) => e.id !== id));
    },
    [setExpenses],
  );

  const clearAll = useCallback(() => {
    setExpenses(EMPTY);
  }, [setExpenses]);

  return { expenses, addExpense, deleteExpense, clearAll };
}

export function useFilteredExpenses(category: Category | null) {
  const { expenses } = useExpenses();

  return expenses.filter((e) => {
    if (!category) return true;
    return e.category === category;
  });
}
