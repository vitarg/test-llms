import { useState, FormEvent, ChangeEvent } from 'react';
import { ExpenseFormData, Category, EXPENSE_CATEGORIES } from '../types';
import { getCategoryLabel } from '../utils/formatters';

interface AddExpenseFormProps {
  onSubmit: (data: ExpenseFormData) => void;
}

const today = () => new Date().toISOString().split('T')[0];

export function AddExpenseForm({ onSubmit }: AddExpenseFormProps) {
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<Category>('food');
  const [date, setDate] = useState(today());

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const numericAmount = parseFloat(amount);
    if (!amount || isNaN(numericAmount) || numericAmount <= 0) return;
    if (!description.trim()) return;
    onSubmit({
      amount: numericAmount,
      description: description.trim(),
      category,
      date,
    });
    setAmount('');
    setDescription('');
    setCategory('food');
    setDate(today());
  };

  const handleAmountChange = (e: ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (val === '' || /^\d*\.?\d{0,2}$/.test(val)) setAmount(val);
  };

  return (
    <form className="expense-form" onSubmit={handleSubmit}>
      <div className="field-group">
        <label htmlFor="amount">Amount</label>
        <input
          id="amount"
          type="text"
          inputMode="decimal"
          placeholder="0.00"
          value={amount}
          onChange={handleAmountChange}
          required
        />
      </div>

      <div className="field-group">
        <label htmlFor="description">Description</label>
        <input
          id="description"
          type="text"
          placeholder="e.g. Groceries"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>

      <div className="field-group">
        <label htmlFor="category">Category</label>
        <select
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value as Category)}
        >
          {EXPENSE_CATEGORIES.map((cat) => (
            <option key={cat} value={cat}>
              {getCategoryLabel(cat)}
            </option>
          ))}
        </select>
      </div>

      <div className="field-group">
        <label htmlFor="date">Date</label>
        <input
          id="date"
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
      </div>

      <button type="submit" className="btn btn-primary">
        Add Expense
      </button>
    </form>
  );
}
