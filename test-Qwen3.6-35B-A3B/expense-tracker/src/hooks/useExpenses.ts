import { useState, useCallback, useMemo, useEffect } from 'react';
import { Expense, ExpenseFormData, Category } from '../types';
import { loadExpenses, saveExpenses } from '../utils/storage';

function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 9);
}

export function useExpenses() {
  const [expenses, setExpenses] = useState<Expense[]>(() => loadExpenses());

  useEffect(() => {
    saveExpenses(expenses);
  }, [expenses]);

  const addExpense = useCallback(
    (data: ExpenseFormData) => {
      const amount = parseFloat(data.amount);
      if (isNaN(amount) || amount <= 0) return;

      const newExpense: Expense = {
        id: generateId(),
        amount,
        category: data.category,
        description: data.description.trim(),
        date: new Date().toISOString(),
      };

      setExpenses((prev) => [newExpense, ...prev]);
    },
    [],
  );

  const deleteExpense = useCallback((id: string) => {
    setExpenses((prev) => prev.filter((e) => e.id !== id));
  }, []);

  const [filterCategory, setFilterCategory] = useState<Category>('all');

  const filteredExpenses = useMemo(() => {
    if (filterCategory === 'all') return expenses;
    return expenses.filter((e) => e.category === filterCategory);
  }, [expenses, filterCategory]);

  const total = useMemo(() => {
    return filteredExpenses.reduce((sum, e) => sum + e.amount, 0);
  }, [filteredExpenses]);

  const categoryTotals = useMemo(() => {
    const totals: Record<string, number> = {};
    filteredExpenses.forEach((e) => {
      totals[e.category] = (totals[e.category] || 0) + e.amount;
    });
    return totals;
  }, [filteredExpenses]);

  return {
    expenses: filteredExpenses,
    total,
    categoryTotals,
    filterCategory,
    setFilterCategory,
    addExpense,
    deleteExpense,
  };
}
