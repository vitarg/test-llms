import type { Expense } from '../types';

export function calculateTotal(expenses: Expense[]): number {
  return expenses.reduce((sum, e) => sum + e.amount, 0);
}

export function formatCurrency(amount: number): string {
  return `$${amount.toFixed(2)}`;
}

export function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

export function filterByCategory(
  expenses: Expense[],
  category: string | null
): Expense[] {
  if (!category) return expenses;
  return expenses.filter((e) => e.category === category);
}
