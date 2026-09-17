import type { Expense, Category } from "../types/expense";

export function totalExpenses(expenses: Expense[]): number {
  return expenses.reduce((sum, e) => sum + e.amount, 0);
}

export function filterByCategory(
  expenses: Expense[],
  category: Category | null,
): Expense[] {
  if (!category) return expenses;
  return expenses.filter((e) => e.category === category);
}

export function expensesByCategory(
  expenses: Expense[],
): Record<string, number> {
  return expenses.reduce<Record<string, number>>((acc, e) => {
    acc[e.category] = (acc[e.category] ?? 0) + e.amount;
    return acc;
  }, {});
}
