import type { Expense } from "../types/expense";

interface Props {
  expenses: Expense[];
  onDelete: (id: string) => void;
}

export function ExpenseList({ expenses, onDelete }: Props) {
  if (!expenses.length) {
    return <p className="empty">No expenses yet.</p>;
  }

  const sorted = [...expenses].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );

  return (
    <ul className="expense-list">
      {sorted.map((expense) => (
        <li key={expense.id} className="expense-item">
          <span className="expense-desc">{expense.description}</span>
          <span className="expense-category">{expense.category}</span>
          <span className="expense-date">{expense.date}</span>
          <span className="expense-amount">{expense.amount.toFixed(2)}</span>
          <button onClick={() => onDelete(expense.id)} className="delete-btn">
            x
          </button>
        </li>
      ))}
    </ul>
  );
}
