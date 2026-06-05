export const EXPENSE_CATEGORIES = [
  "Food",
  "Transport",
  "Housing",
  "Entertainment",
  "Health",
  "Shopping",
  "Other",
] as const;

export const ALL_CATEGORIES = "All" as const;

export function isAllCategories(category: string): category is typeof ALL_CATEGORIES {
  return category === ALL_CATEGORIES;
}
