import { formatCurrency } from '../utils/calculations';
import type { Expense } from '../types';

interface Props {
  expense: Expense;
  onDelete: (id: string) => void;
}

export default function ExpenseItem({ expense, onDelete }: Props) {
  const date = new Date(expense.date);
  const displayDate = date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  });

  return (
    <li className="expense-item">
      <div className="expense-info">
        <span className="expense-description">{expense.description}</span>
        <span className="expense-category">{expense.category}</span>
        <span className="expense-date">{displayDate}</span>
      </div>
      <div className="expense-actions">
        <span className="expense-amount">{formatCurrency(expense.amount)}</span>
        <button className="delete-btn" onClick={() => onDelete(expense.id)}>
          Delete
        </button>
      </div>
    </li>
  );
}
