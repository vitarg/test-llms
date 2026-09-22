import type { Expense } from '../types/expense';
import { ExpenseItem } from './ExpenseItem';

interface ExpenseListProps {
  expenses: readonly Expense[];
  onDelete: (id: string) => void;
  emptyMessage: string;
}

export function ExpenseList({ expenses, onDelete, emptyMessage }: ExpenseListProps) {
  if (expenses.length === 0) {
    return <p className="empty-state">{emptyMessage}</p>;
  }

  return (
    <ul className="expense-list">
      {expenses.map((expense) => (
        <ExpenseItem key={expense.id} expense={expense} onDelete={onDelete} />
      ))}
    </ul>
  );
}
