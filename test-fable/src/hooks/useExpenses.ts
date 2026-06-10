import { useCallback, useMemo, useState } from 'react';
import type { CategoryFilter, Expense, ExpenseDraft } from '../types/expense';
import { sumExpenses } from '../utils/money';
import { useLocalStorage } from './useLocalStorage';

const STORAGE_KEY = 'expense-tracker.expenses';

/**
 * Single source of truth for expense state: persistence, CRUD,
 * category filtering, and totals.
 */
export function useExpenses() {
  const [expenses, setExpenses] = useLocalStorage<Expense[]>(STORAGE_KEY, []);
  const [filter, setFilter] = useState<CategoryFilter>('all');

  const addExpense = useCallback(
    (draft: ExpenseDraft) => {
      setExpenses((prev) => [{ ...draft, id: crypto.randomUUID() }, ...prev]);
    },
    [setExpenses],
  );

  const deleteExpense = useCallback(
    (id: string) => {
      setExpenses((prev) => prev.filter((expense) => expense.id !== id));
    },
    [setExpenses],
  );

  const visibleExpenses = useMemo(
    () =>
      filter === 'all'
        ? expenses
        : expenses.filter((expense) => expense.category === filter),
    [expenses, filter],
  );

  const visibleTotal = useMemo(() => sumExpenses(visibleExpenses), [visibleExpenses]);

  return {
    expenses,
    visibleExpenses,
    visibleTotal,
    filter,
    setFilter,
    addExpense,
    deleteExpense,
  };
}
