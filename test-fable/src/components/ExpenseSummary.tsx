import { formatCurrency } from '../utils/money';

interface ExpenseSummaryProps {
  total: number;
  count: number;
}

export function ExpenseSummary({ total, count }: ExpenseSummaryProps) {
  return (
    <p className="expense-summary">
      <strong>{formatCurrency(total)}</strong> across {count}{' '}
      {count === 1 ? 'expense' : 'expenses'}
    </p>
  );
}
