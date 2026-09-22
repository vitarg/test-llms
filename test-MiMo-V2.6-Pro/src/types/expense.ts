export const EXPENSE_CATEGORIES = [
  'food',
  'transport',
  'housing',
  'entertainment',
  'health',
  'other',
] as const;

export type ExpenseCategory = (typeof EXPENSE_CATEGORIES)[number];

export const CATEGORY_LABELS: Record<ExpenseCategory, string> = {
  food: 'Food',
  transport: 'Transport',
  housing: 'Housing',
  entertainment: 'Entertainment',
  health: 'Health',
  other: 'Other',
};

export interface Expense {
  id: string;
  description: string;
  amount: number;
  category: ExpenseCategory;
  date: string;
}

export type NewExpense = Omit<Expense, 'id'>;

export type CategoryFilterValue = ExpenseCategory | 'all';

export function isExpenseCategory(value: unknown): value is ExpenseCategory {
  return EXPENSE_CATEGORIES.some((category) => category === value);
}

export function isExpense(value: unknown): value is Expense {
  if (typeof value !== 'object' || value === null) {
    return false;
  }
  const item = value as Record<string, unknown>;
  return (
    typeof item.id === 'string' &&
    typeof item.description === 'string' &&
    typeof item.amount === 'number' &&
    Number.isFinite(item.amount) &&
    isExpenseCategory(item.category) &&
    typeof item.date === 'string'
  );
}
