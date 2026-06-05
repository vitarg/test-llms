import { useState, useCallback, useMemo } from 'react';
import type { Expense, NewExpense, Category } from '../types';
import { loadExpenses, saveExpenses } from '../utils/storage';
import {
  generateId,
  calculateTotal,
  filterByCategory,
} from '../utils/calculations';

export function useExpenses() {
  const [expenses, setExpenses] = useState<Expense[]>(() => {
    const raw = loadExpenses();
    return raw.map((item) => JSON.parse(item) as Expense);
  });

  const [filterCategory, setFilterCategory] = useState<Category | null>(null);

  const addExpense = useCallback((data: NewExpense) => {
    const newExpense: Expense = {
      ...data,
      id: generateId(),
      date: new Date().toISOString(),
    };
    setExpenses((prev) => {
      const next = [newExpense, ...prev];
      saveExpenses(next.map((e) => JSON.stringify(e)));
      return next;
    });
  }, []);

  const deleteExpense = useCallback((id: string) => {
    setExpenses((prev) => {
      const next = prev.filter((e) => e.id !== id);
      saveExpenses(next.map((e) => JSON.stringify(e)));
      return next;
    });
  }, []);

  const filteredExpenses = useMemo(
    () => filterByCategory(expenses, filterCategory),
    [expenses, filterCategory]
  );

  const total = useMemo(() => calculateTotal(filteredExpenses), [filteredExpenses]);

  return {
    expenses: filteredExpenses,
    total,
    filterCategory,
    setFilterCategory,
    addExpense,
    deleteExpense,
  };
}
