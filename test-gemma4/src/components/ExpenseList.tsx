import React from 'react';
import { Expense } from '../types/expense';

interface ExpenseListProps {
  expenses: Expense[];
  onDelete: (id: string) => void;
}

export const ExpenseList: React.FC<ExpenseListProps> = ({ expenses, onDelete }) => {
  if (expenses.length === 0) {
    return <p>No expenses found.</p>;
  }

  return (
    <ul style={{ listStyle: 'none', padding: 0 }}>
      {expenses.map((expense) => (
        <li
          key={expense.id}
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '10px',
            borderBottom: '1px solid #eee',
          }}
        >
          <div>
            <strong>{expense.description}</strong> - ${expense.amount.toFixed(2)}
            <br />
            <small style={{ color: '#666' }}>
              {expense.category} | {new Date(expense.date).toLocaleDateString()}
            </small>
          </div>
          <button
            onClick={() => onDelete(expense.id)}
            style={{ color: 'red', background: 'none', border: 'none', cursor: 'pointer' }}
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
};
