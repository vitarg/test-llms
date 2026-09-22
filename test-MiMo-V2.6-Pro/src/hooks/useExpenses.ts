import { useCallback, useEffect, useMemo, useState } from 'react';
import { isExpense, type Expense, type NewExpense } from '../types/expense';
import { calculateTotal } from '../utils/calculate';
import { loadFromStorage, saveToStorage } from '../utils/storage';

const STORAGE_KEY = 'mimo-expense-tracker-data';

function loadExpenses(): Expense[] {
  const stored = loadFromStorage<unknown[]>(STORAGE_KEY, []);
  return Array.isArray(stored) ? stored.filter(isExpense) : [];
}

export function useExpenses() {
  const [expenses, setExpenses] = useState<Expense[]>(loadExpenses);

  useEffect(() => {
    saveToStorage(STORAGE_KEY, expenses);
  }, [expenses]);

  const addExpense = useCallback((draft: NewExpense) => {
    const expense: Expense = { ...draft, id: crypto.randomUUID() };
    setExpenses((prev) => [expense, ...prev]);
  }, []);

  const deleteExpense = useCallback((id: string) => {
    setExpenses((prev) => prev.filter((expense) => expense.id !== id));
  }, []);

  const total = useMemo(() => calculateTotal(expenses), [expenses]);

  return { expenses, addExpense, deleteExpense, total };
}
