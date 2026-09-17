export interface Expense {
  id: string;
  amount: number;
  category: string;
  description: string;
  date: string;
}

export type Category = string;

export interface ExpenseFormData {
  amount: string;
  category: string;
  description: string;
}

export const AVAILABLE_CATEGORIES = [
  'Food',
  'Transport',
  'Entertainment',
  'Shopping',
  'Bills',
  'Health',
  'Other',
] as const;
