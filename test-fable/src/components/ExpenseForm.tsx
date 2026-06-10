import { useState, type FormEvent } from 'react';
import { CATEGORIES, type Category, type ExpenseDraft } from '../types/expense';

interface ExpenseFormProps {
  onAdd: (draft: ExpenseDraft) => void;
}

function todayISO(): string {
  return new Date().toISOString().slice(0, 10);
}

export function ExpenseForm({ onAdd }: ExpenseFormProps) {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState<Category>('Food');
  const [date, setDate] = useState(todayISO);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const parsedAmount = Number(amount);
    if (!description.trim() || !Number.isFinite(parsedAmount) || parsedAmount <= 0) {
      return;
    }

    onAdd({ description: description.trim(), amount: parsedAmount, category, date });
    setDescription('');
    setAmount('');
  }

  return (
    <form className="expense-form" onSubmit={handleSubmit}>
      <input
        aria-label="Description"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />
      <input
        aria-label="Amount"
        type="number"
        placeholder="Amount"
        min="0.01"
        step="0.01"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        required
      />
      <select
        aria-label="Category"
        value={category}
        onChange={(e) => setCategory(e.target.value as Category)}
      >
        {CATEGORIES.map((c) => (
          <option key={c} value={c}>
            {c}
          </option>
        ))}
      </select>
      <input
        aria-label="Date"
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        required
      />
      <button type="submit">Add</button>
    </form>
  );
}
