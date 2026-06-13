import { Expense } from '../types/expense';

const STORAGE_KEY = 'personal_expenses';

export const saveExpenses = (expenses: Expense[]): void => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(expenses));
};

export const loadExpenses = (): Expense[] => {
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : [];
};
