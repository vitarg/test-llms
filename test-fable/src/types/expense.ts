export const CATEGORIES = [
  'Food',
  'Transport',
  'Housing',
  'Entertainment',
  'Health',
  'Other',
] as const;

export type Category = (typeof CATEGORIES)[number];

export interface Expense {
  id: string;
  description: string;
  amount: number;
  category: Category;
  /** ISO 8601 date string (e.g. "2026-06-10") */
  date: string;
}

/** Input for creating an expense — id is assigned by the store. */
export type ExpenseDraft = Omit<Expense, 'id'>;

/** 'all' disables category filtering. */
export type CategoryFilter = Category | 'all';
