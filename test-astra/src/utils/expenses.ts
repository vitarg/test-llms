import { CATEGORIES, type Category, type CategoryFilter, type Expense } from '../types/expense.ts';

const MAX_AMOUNT_CENTS = 99_999_999;
const currencyFormatter = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' });
const dateFormatter = new Intl.DateTimeFormat('en-US', {
  month: 'short', day: 'numeric', year: 'numeric', timeZone: 'UTC',
});

export function formatCurrency(amountCents: number): string {
  return currencyFormatter.format(amountCents / 100);
}

export function formatDate(date: string): string {
  return dateFormatter.format(new Date(`${date}T00:00:00Z`));
}

export function today(): string {
  const date = new Date();
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
}

export function parseAmount(value: string): number | null {
  const match = /^(\d*)(?:\.(\d{1,2}))?$/.exec(value.trim());
  if (!match) return null;
  const cents = Number(match[1]) * 100 + Number((match[2] ?? '').padEnd(2, '0'));
  return Number.isSafeInteger(cents) && cents > 0 && cents <= MAX_AMOUNT_CENTS ? cents : null;
}

export function totalExpenses(expenses: Expense[]): number {
  return expenses.reduce((total, expense) => total + expense.amountCents, 0);
}

export function filterExpenses(expenses: Expense[], category: CategoryFilter): Expense[] {
  return category === 'All categories' ? expenses : expenses.filter((expense) => expense.category === category);
}

export function isCategory(value: unknown): value is Category {
  return typeof value === 'string' && CATEGORIES.some((category) => category === value);
}

function isDate(value: unknown): value is string {
  if (typeof value !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(value) || value.startsWith('0000')) return false;
  const date = new Date(`${value}T00:00:00Z`);
  return Number.isFinite(date.getTime()) && date.toISOString().slice(0, 10) === value;
}

function isExpense(value: unknown): value is Expense {
  if (typeof value !== 'object' || value === null) return false;
  const expense = value as Record<string, unknown>;
  return typeof expense.id === 'string' && expense.id.trim().length > 0
    && typeof expense.description === 'string' && expense.description.trim().length > 0
    && typeof expense.amountCents === 'number' && Number.isSafeInteger(expense.amountCents)
    && expense.amountCents > 0 && expense.amountCents <= MAX_AMOUNT_CENTS
    && isCategory(expense.category) && isDate(expense.date);
}

export function parseStoredExpenses(raw: string): Expense[] {
  const parsed: unknown = JSON.parse(raw);
  if (!Array.isArray(parsed) || !parsed.every(isExpense)) {
    throw new Error('Invalid saved expenses.');
  }
  const expenses: Expense[] = parsed;
  if (new Set(expenses.map((expense) => expense.id)).size !== expenses.length) {
    throw new Error('Duplicate saved expense IDs.');
  }
  return expenses;
}
