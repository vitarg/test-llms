export const CATEGORIES = [
  'Food & drinks',
  'Shopping',
  'Transport',
  'Home',
  'Entertainment',
  'Health',
  'Other',
] as const;

export type Category = (typeof CATEGORIES)[number];
export type CategoryFilter = Category | 'All categories';

export interface Expense {
  id: string;
  description: string;
  amountCents: number;
  category: Category;
  date: string; // Local calendar date, formatted as YYYY-MM-DD.
}

export type NewExpense = Omit<Expense, 'id'>;
