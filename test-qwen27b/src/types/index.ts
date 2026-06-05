export interface Expense {
  id: string;
  description: string;
  amount: number;
  category: Category;
  date: string;
}

export type Category =
  | 'Food'
  | 'Transport'
  | 'Entertainment'
  | 'Utilities'
  | 'Health'
  | 'Shopping'
  | 'Other';

export const CATEGORIES: Category[] = [
  'Food',
  'Transport',
  'Entertainment',
  'Utilities',
  'Health',
  'Shopping',
  'Other',
];

export interface NewExpense {
  description: string;
  amount: number;
  category: Category;
}
