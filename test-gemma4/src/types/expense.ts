export type Category = 'Food' | 'Transport' | 'Entertainment' | 'Utilities' | 'Other';

export interface Expense {
  id: string;
  description: string;
  amount: number;
  category: Category;
  date: string;
}
