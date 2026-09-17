import { Expense } from '../types';

const STORAGE_KEY = 'qwen35b-expense-tracker-data';

export function loadExpenses(): Expense[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (e: unknown): e is Expense =>
        typeof e === 'object' &&
        e !== null &&
        'id' in e &&
        'amount' in e &&
        'category' in e &&
        'date' in e,
    );
  } catch {
    return [];
  }
}

export function saveExpenses(expenses: Expense[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(expenses));
}
