/**
 * Domain types shared across the app.
 * Categories are a closed union so the compiler catches typos and
 * keeps the filter / form options in sync from a single source.
 */
export const CATEGORIES = [
  "Food",
  "Transport",
  "Housing",
  "Entertainment",
  "Health",
  "Other",
] as const;

export type Category = (typeof CATEGORIES)[number];

export interface Expense {
  id: string;
  description: string;
  /** Stored in major currency units (e.g. dollars), always > 0. */
  amount: number;
  category: Category;
  /** ISO date string (yyyy-mm-dd). */
  date: string;
}

/** Shape of the form before an Expense gets an id assigned. */
export type NewExpense = Omit<Expense, "id">;

/** "all" is a sentinel meaning "no category filter applied". */
export type CategoryFilter = Category | "all";
