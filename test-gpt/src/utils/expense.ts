import type { Expense, NewExpense } from "../types/expense";
import { createId } from "./id";

export function createExpense(expense: NewExpense): Expense {
  return {
    ...expense,
    id: createId(),
    createdAt: new Date().toISOString(),
  };
}

export function calculateTotalExpenses(expenses: Expense[]): number {
  return expenses.reduce((total, expense) => total + expense.amount, 0);
}
