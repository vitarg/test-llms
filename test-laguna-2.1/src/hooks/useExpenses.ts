import { useState, useMemo, useCallback } from 'react';
import { Expense, FilterCategory, ExpenseFormData } from '../types';
import { generateId } from '../utils/formatters';
import { useLocalStorage } from './useLocalStorage';

const STORAGE_KEY = 'expense-tracker-data';

export function useExpenses() {
  const [expenses, setExpenses] = useLocalStorage<Expense[]>(
    STORAGE_KEY,
    [],
  );
  const [filter, setFilter] = useState<FilterCategory>('all');

  const addExpense = useCallback(
    (data: ExpenseFormData) => {
      const newExpense: Expense = {
        id: generateId(),
        amount: data.amount,
        description: data.description,
        category: data.category,
        date: data.date,
      };
      setExpenses((prev) => [newExpense, ...prev]);
    },
    [setExpenses],
  );

  const deleteExpense = useCallback(
    (id: string) => {
      setExpenses((prev) => prev.filter((e) => e.id !== id));
    },
    [setExpenses],
  );

  const filteredExpenses = useMemo(() => {
    if (filter === 'all') return expenses;
    return expenses.filter((e) => e.category === filter);
  }, [expenses, filter]);

  const totalExpenses = useMemo(
    () =>
      filteredExpenses.reduce(
        (sum, e) => sum + e.amount,
        0,
      ),
    [filteredExpenses],
  );

  return {
    expenses: filteredExpenses,
    allExpenses: expenses,
    filter,
    setFilter,
    totalExpenses,
    addExpense,
    deleteExpense,
  };
}
