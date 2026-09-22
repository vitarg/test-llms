import { formatCurrency } from '../utils/format';

interface TotalExpensesProps {
  total: number;
  visibleTotal: number;
  visibleCount: number;
  isFiltered: boolean;
}

export function TotalExpenses({
  total,
  visibleTotal,
  visibleCount,
  isFiltered,
}: TotalExpensesProps) {
  const countLabel = `${visibleCount} ${visibleCount === 1 ? 'expense' : 'expenses'}`;

  return (
    <div className="total-expenses" aria-live="polite">
      <div className="total-expenses__row">
        <span className="total-expenses__label">Total</span>
        <span className="total-expenses__value">{formatCurrency(total)}</span>
      </div>
      {isFiltered && (
        <div className="total-expenses__row total-expenses__row--muted">
          <span className="total-expenses__label">Filtered</span>
          <span>
            {formatCurrency(visibleTotal)} · {countLabel}
          </span>
        </div>
      )}
    </div>
  );
}
