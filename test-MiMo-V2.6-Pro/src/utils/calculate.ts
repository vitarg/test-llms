import type { CategoryFilterValue, Expense } from '../types/expense';

export function calculateTotal(expenses: readonly Expense[]): number {
  const sum = expenses.reduce((total, expense) => total + expense.amount, 0);
  return Math.round(sum * 100) / 100;
}

export function filterByCategory(
  expenses: readonly Expense[],
  category: CategoryFilterValue,
): Expense[] {
  if (category === 'all') {
    return [...expenses];
  }
  return expenses.filter((expense) => expense.category === category);
}
