import type { Expense } from '../types/expense';

const formatter = new Intl.NumberFormat(undefined, {
  style: 'currency',
  currency: 'USD',
});

export function formatCurrency(amount: number): string {
  return formatter.format(amount);
}

export function sumExpenses(expenses: readonly Expense[]): number {
  return expenses.reduce((total, expense) => total + expense.amount, 0);
}
