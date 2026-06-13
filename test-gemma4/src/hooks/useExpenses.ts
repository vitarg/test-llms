import { useState, useEffect, useMemo } from 'react';
import { Expense, Category } from '../types/expense';
import { saveExpenses, loadExpenses } from '../utils/storage';

export const useExpenses = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [filterCategory, setFilterCategory] = useState<Category | 'All'>('All');

  // Load initial data
  useEffect(() => {
    setExpenses(loadExpenses());
  }, []);

  // Persist data on change
  useEffect(() => {
    if (expenses.length > 0 || loadExpenses().length > 0) {
      saveExpenses(expenses);
    }
  }, [expenses]);

  const addExpense = (expense: Omit<Expense, 'id' | 'date'>) => {
    const newExpense: Expense = {
      ...expense,
      id: crypto.randomUUID(),
      date: new Date().toISOString(),
    };
    setExpenses((prev) => [...prev, newExpense]);
  };

  const deleteExpense = (id: string) => {
    setExpenses((prev) => prev.filter((e) => e.id !== id));
  };

  const filteredExpenses = useMemo(() => {
    if (filterCategory === 'All') return expenses;
    return expenses.filter((e) => e.category === filterCategory);
  }, [expenses, filterCategory]);

  const totalExpenses = useMemo(() => {
    return expenses.reduce((sum, e) => sum + e.amount, 0);
  }, [expenses]);

  return {
    expenses,
    filteredExpenses,
    addExpense,
    deleteExpense,
    totalExpenses,
    filterCategory,
    setFilterCategory,
  };
};
