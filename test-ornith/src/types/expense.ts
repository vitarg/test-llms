export interface Expense {
  id: string;
  amount: number;
  category: string;
  description: string;
  date: string;
}

export type Category =
  | "food"
  | "transport"
  | "entertainment"
  | "utilities"
  | "health"
  | "other";

export const CATEGORIES: Category[] = [
  "food",
  "transport",
  "entertainment",
  "utilities",
  "health",
  "other",
];

export const CATEGORY_LABELS: Record<Category, string> = {
  food: "Food",
  transport: "Transport",
  entertainment: "Entertainment",
  utilities: "Utilities",
  health: "Health",
  other: "Other",
};
