import { useCallback, useMemo, useState } from "react";
import type { CategoryFilter, Expense, NewExpense } from "../types/expense";
import {
  calculateTotal,
  createExpense,
  filterByCategory,
} from "../utils/expenses";
import { useLocalStorage } from "./useLocalStorage";

const STORAGE_KEY = "expense-tracker:expenses";

export interface UseExpenses {
  /** Expenses after the active category filter is applied. */
  expenses: Expense[];
  filter: CategoryFilter;
  setFilter: (filter: CategoryFilter) => void;
  /** Total of the currently visible (filtered) expenses. */
  total: number;
  addExpense: (input: NewExpense) => void;
  deleteExpense: (id: string) => void;
}

/**
 * Single owner of expense state. Components stay presentational and read
 * everything they need from this hook, so the add/delete/filter/total logic
 * lives in exactly one place.
 */
export function useExpenses(): UseExpenses {
  const [allExpenses, setAllExpenses] = useLocalStorage<Expense[]>(
    STORAGE_KEY,
    [],
  );
  const [filter, setFilter] = useState<CategoryFilter>("all");

  const addExpense = useCallback(
    (input: NewExpense) => {
      setAllExpenses((current) => [createExpense(input), ...current]);
    },
    [setAllExpenses],
  );

  const deleteExpense = useCallback(
    (id: string) => {
      setAllExpenses((current) => current.filter((e) => e.id !== id));
    },
    [setAllExpenses],
  );

  // Derived state is memoised so we don't re-filter/re-sum on every render.
  const expenses = useMemo(
    () => filterByCategory(allExpenses, filter),
    [allExpenses, filter],
  );
  const total = useMemo(() => calculateTotal(expenses), [expenses]);

  return { expenses, filter, setFilter, total, addExpense, deleteExpense };
}
