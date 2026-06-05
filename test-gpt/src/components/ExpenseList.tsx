import type { Expense } from "../types/expense";
import { formatCurrency } from "../utils/currency";

type ExpenseListProps = {
  expenses: Expense[];
  onDeleteExpense: (id: Expense["id"]) => void;
};

export function ExpenseList({ expenses, onDeleteExpense }: ExpenseListProps) {
  if (expenses.length === 0) {
    return (
      <div className="empty-state" role="status">
        No expenses match this category.
      </div>
    );
  }

  return (
    <ul className="expense-list">
      {expenses.map((expense) => (
        <li className="expense-item" key={expense.id}>
          <div>
            <strong>{expense.title}</strong>
            <span>
              {expense.category} · {new Date(expense.createdAt).toLocaleDateString()}
            </span>
          </div>
          <div className="expense-actions">
            <span>{formatCurrency(expense.amount)}</span>
            <button
              type="button"
              className="ghost-button"
              onClick={() => onDeleteExpense(expense.id)}
              aria-label={`Delete ${expense.title}`}
            >
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}
