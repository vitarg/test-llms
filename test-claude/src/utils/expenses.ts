import type {
  Category,
  CategoryFilter,
  Expense,
  NewExpense,
} from "../types/expense";

/**
 * Pure, side-effect-free helpers for working with expense lists.
 * Centralising them here avoids duplicating the same reduce/filter
 * logic inside components and the hook.
 */

/** Create a fully-formed Expense from form data, assigning a unique id. */
export function createExpense(input: NewExpense): Expense {
  return { id: generateId(), ...input };
}

/** Sum of all amounts in the list. */
export function calculateTotal(expenses: Expense[]): number {
  return expenses.reduce((sum, expense) => sum + expense.amount, 0);
}

/** Return only expenses matching the filter ("all" returns everything). */
export function filterByCategory(
  expenses: Expense[],
  filter: CategoryFilter,
): Expense[] {
  if (filter === "all") return expenses;
  return expenses.filter((expense) => expense.category === filter);
}

/** Total spend grouped by category — handy for summaries/charts. */
export function totalsByCategory(
  expenses: Expense[],
): Record<Category, number> {
  return expenses.reduce(
    (totals, expense) => {
      totals[expense.category] = (totals[expense.category] ?? 0) + expense.amount;
      return totals;
    },
    {} as Record<Category, number>,
  );
}

function generateId(): string {
  // crypto.randomUUID is available in all modern browsers; fall back for
  // older/test environments so the app never throws.
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}
