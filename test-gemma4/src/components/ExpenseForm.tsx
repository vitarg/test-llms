import React, { useState } from 'react';
import { Category } from '../types/expense';

interface ExpenseFormProps {
  onAdd: (expense: { description: string; amount: number; category: Category }) => void;
}

const CATEGORIES: Category[] = ['Food', 'Transport', 'Entertainment', 'Utilities', 'Other'];

export const ExpenseForm: React.FC<ExpenseFormProps> = ({ onAdd }) => {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState<number | ''>('');
  const [category, setCategory] = useState<Category>('Food');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!description || !amount) return;

    onAdd({
      description,
      amount: Number(amount),
      category,
    });

    setDescription('');
    setAmount('');
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '20px', padding: '15px', border: '1px solid #ccc', borderRadius: '8px' }}>
      <div style={{ marginBottom: '10px' }}>
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
        />
      </div>
      <div style={{ marginBottom: '10px' }}>
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value === '' ? '' : Number(e.target.value))}
          required
          style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
        />
      </div>
      <div style={{ marginBottom: '10px' }}>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value as Category)}
          style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
        >
          {CATEGORIES.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>
      <button type="submit" style={{ width: '100%', padding: '10px', cursor: 'pointer' }}>
        Add Expense
      </button>
    </form>
  );
};
