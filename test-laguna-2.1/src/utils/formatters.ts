import { Category, CATEGORY_LABELS } from '../types';

const CURRENCY_LOCALE = 'en-US';
const CURRENCY_CODE = 'USD';

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat(CURRENCY_LOCALE, {
    style: 'currency',
    currency: CURRENCY_CODE,
    minimumFractionDigits: 2,
  }).format(amount);
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat(CURRENCY_LOCALE, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(date);
}

export function getCategoryLabel(category: Category): string {
  return CATEGORY_LABELS[category];
}

export function generateId(): string {
  return crypto.randomUUID();
}
