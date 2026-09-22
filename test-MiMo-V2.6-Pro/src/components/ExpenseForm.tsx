import { useState, type FormEvent } from 'react';
import {
  CATEGORY_LABELS,
  EXPENSE_CATEGORIES,
  isExpenseCategory,
  type ExpenseCategory,
  type NewExpense,
} from '../types/expense';
import { toDateInputValue } from '../utils/format';

interface ExpenseFormProps {
  onAdd: (draft: NewExpense) => void;
}

interface FormState {
  description: string;
  amount: string;
  category: ExpenseCategory;
  date: string;
}

function createInitialFormState(): FormState {
  return {
    description: '',
    amount: '',
    category: 'food',
    date: toDateInputValue(new Date()),
  };
}

export function ExpenseForm({ onAdd }: ExpenseFormProps) {
  const [form, setForm] = useState<FormState>(createInitialFormState);
  const [error, setError] = useState<string | null>(null);

  function updateField<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const description = form.description.trim();
    const amount = Number(form.amount);

    if (!description) {
      setError('Description is required.');
      return;
    }
    if (!Number.isFinite(amount) || amount <= 0) {
      setError('Amount must be greater than zero.');
      return;
    }

    setError(null);
    onAdd({
      description,
      amount: Math.round(amount * 100) / 100,
      category: form.category,
      date: form.date,
    });
    setForm(createInitialFormState());
  }

  return (
    <form className="expense-form" onSubmit={handleSubmit} noValidate>
      <label className="expense-form__field expense-form__field--full">
        Description
        <input
          type="text"
          value={form.description}
          onChange={(event) => updateField('description', event.target.value)}
          placeholder="Coffee, rent, taxi"
          required
        />
      </label>
      <label className="expense-form__field">
        Amount (USD)
        <input
          type="number"
          min="0.01"
          step="0.01"
          inputMode="decimal"
          value={form.amount}
          onChange={(event) => updateField('amount', event.target.value)}
          required
        />
      </label>
      <label className="expense-form__field">
        Category
        <select
          value={form.category}
          onChange={(event) => {
            if (isExpenseCategory(event.target.value)) {
              updateField('category', event.target.value);
            }
          }}
        >
          {EXPENSE_CATEGORIES.map((category) => (
            <option key={category} value={category}>
              {CATEGORY_LABELS[category]}
            </option>
          ))}
        </select>
      </label>
      <label className="expense-form__field">
        Date
        <input
          type="date"
          value={form.date}
          onChange={(event) => updateField('date', event.target.value)}
          required
        />
      </label>
      {error && <p className="expense-form__error">{error}</p>}
      <button type="submit" className="expense-form__submit">
        Add expense
      </button>
    </form>
  );
}
