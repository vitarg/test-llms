import React from 'react';
import { Expense } from '../types';

interface ExpenseItemProps {
  expense: Expense;
  onDelete: (id: string) => void;
}

export const ExpenseItem: React.FC<ExpenseItemProps> = ({ expense, onDelete }) => {
  const date = new Date(expense.date);
  const formattedDate = date.toLocaleDateString() + ' ' + date.toLocaleTimeString();

  return (
    <li className="expense-item">
      <div className="expense-info">
        <span className="expense-description">
          {expense.description || <em className="no-description">No description</em>}
        </span>
        <span className="expense-meta">
          {expense.category} &middot; {formattedDate}
        </span>
      </div>
      <div className="expense-actions">
        <span className="expense-amount">${expense.amount.toFixed(2)}</span>
        <button className="delete-btn" onClick={() => onDelete(expense.id)}>
          Delete
        </button>
      </div>
    </li>
  );
};
