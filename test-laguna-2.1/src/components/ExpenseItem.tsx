import { Expense } from '../types';
import { formatCurrency, formatDate, getCategoryLabel } from '../utils/formatters';

interface ExpenseItemProps {
  expense: Expense;
  onDelete: (id: string) => void;
}

export function ExpenseItem({ expense, onDelete }: ExpenseItemProps) {
  return (
    <li className="expense-item">
      <div className="expense-item__main">
        <span className="expense-item__category-badge">
          {getCategoryLabel(expense.category)}
        </span>
        <span className="expense-item__description">
          {expense.description}
        </span>
      </div>

      <div className="expense-item__details">
        <span className="expense-item__amount">
          {formatCurrency(expense.amount)}
        </span>
        <span className="expense-item__date">{formatDate(expense.date)}</span>
      </div>

      <button
        type="button"
        className="btn btn-ghost btn-delete"
        onClick={() => onDelete(expense.id)}
        aria-label={`Delete ${expense.description}`}
      >
        &times;
      </button>
    </li>
  );
}
