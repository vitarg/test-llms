const STORAGE_KEY = "expenses";

export function loadExpenses(): import("../types/expense").Expense[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.map((e: unknown) => e as import("../types/expense").Expense);
  } catch {
    return [];
  }
}

export function saveExpenses(expenses: import("../types/expense").Expense[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(expenses));
}
