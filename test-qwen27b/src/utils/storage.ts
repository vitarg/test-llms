const STORAGE_KEY = 'expense-tracker-data';

export function loadExpenses(): string[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveExpenses(expenses: string[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(expenses));
}
