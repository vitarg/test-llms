import type { Expense } from '../types/expense';
import { formatCurrency } from '../utils/money';

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
          {expense.category} · {expense.date}
        </span>
      </div>
      <span className="expense-item__amount">{formatCurrency(expense.amount)}</span>
      <button
        type="button"
        aria-label={`Delete ${expense.description}`}
        onClick={() => onDelete(expense.id)}
      >
        ✕
      </button>
    </li>
  );
}
