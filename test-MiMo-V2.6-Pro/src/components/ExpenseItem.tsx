import { CATEGORY_LABELS, type Expense } from '../types/expense';
import { formatCurrency, formatDate } from '../utils/format';

interface ExpenseItemProps {
  expense: Expense;
  onDelete: (id: string) => void;
}

export function ExpenseItem({ expense, onDelete }: ExpenseItemProps) {
  return (
    <li className="expense-item">
      <div className="expense-item__info">
        <span className="expense-item__description">{expense.description}</span>
        <span className="expense-item__meta">
          {CATEGORY_LABELS[expense.category]} · {formatDate(expense.date)}
        </span>
      </div>
      <span className="expense-item__amount">{formatCurrency(expense.amount)}</span>
      <button
        type="button"
        className="expense-item__delete"
        onClick={() => onDelete(expense.id)}
        aria-label={`Delete ${expense.description}`}
      >
        Delete
      </button>
    </li>
  );
}
