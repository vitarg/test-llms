import React, { useState } from 'react';
import { ExpenseFormData } from '../types';
import { AVAILABLE_CATEGORIES } from '../types';

interface ExpenseFormProps {
  onAdd: (data: ExpenseFormData) => void;
}

export const ExpenseForm: React.FC<ExpenseFormProps> = ({ onAdd }) => {
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState<string>(AVAILABLE_CATEGORIES[0]);
  const [description, setDescription] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount.trim()) return;
    onAdd({ amount: amount.trim(), category, description });
    setAmount('');
    setDescription('');
  };

  return (
    <form onSubmit={handleSubmit} className="expense-form">
      <h2>Add Expense</h2>
      <div className="form-row">
        <input
          type="number"
          step="0.01"
          min="0.01"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Description (optional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div className="form-row">
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          {AVAILABLE_CATEGORIES.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
        <button type="submit">Add</button>
      </div>
    </form>
  );
};
