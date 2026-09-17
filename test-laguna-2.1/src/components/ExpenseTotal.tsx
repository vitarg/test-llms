import { formatCurrency } from '../utils/formatters';

interface ExpenseTotalProps {
  total: number;
}

export function ExpenseTotal({ total }: ExpenseTotalProps) {
  return (
    <div className="expense-total">
      <span className="expense-total__label">Total:</span>
      <span className="expense-total__amount">
        {formatCurrency(total)}
      </span>
    </div>
  );
}
