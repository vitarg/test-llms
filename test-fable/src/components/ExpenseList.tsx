import type { Expense } from '../types/expense';
import { ExpenseItem } from './ExpenseItem';

interface ExpenseListProps {
  expenses: readonly Expense[];
  onDelete: (id: string) => void;
}

export function ExpenseList({ expenses, onDelete }: ExpenseListProps) {
  if (expenses.length === 0) {
    return <p className="expense-list__empty">No expenses yet.</p>;
  }

  return (
    <ul className="expense-list">
      {expenses.map((expense) => (
        <ExpenseItem key={expense.id} expense={expense} onDelete={onDelete} />
      ))}
    </ul>
  );
}
