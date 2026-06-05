import type { Expense } from "../types/expense";
import { formatCurrency, formatDate } from "../utils/format";

interface ExpenseItemProps {
  expense: Expense;
  onDelete: (id: string) => void;
}

export function ExpenseItem({ expense, onDelete }: ExpenseItemProps) {
  return (
    <li className="expense-item">
      <div className="expense-main">
        <span className="expense-description">{expense.description}</span>
        <span className="expense-meta">
          {expense.category} · {formatDate(expense.date)}
        </span>
      </div>
      <span className="expense-amount">{formatCurrency(expense.amount)}</span>
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
