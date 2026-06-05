import type { EXPENSE_CATEGORIES, ALL_CATEGORIES } from "../utils/categories";

export type ExpenseCategory = (typeof EXPENSE_CATEGORIES)[number];

export type ExpenseCategoryFilter = ExpenseCategory | typeof ALL_CATEGORIES;

export type Expense = {
  id: string;
  title: string;
  amount: number;
  category: ExpenseCategory;
  createdAt: string;
};

export type NewExpense = Omit<Expense, "id" | "createdAt">;
