import { useState } from "react";
import { CATEGORIES, type Category, type NewExpense } from "../types/expense";

interface ExpenseFormProps {
  onAdd: (expense: NewExpense) => void;
}

const today = () => new Date().toISOString().slice(0, 10);

const emptyForm = (): { description: string; amount: string; category: Category; date: string } => ({
  description: "",
  amount: "",
  category: "Food",
  date: today(),
});

export function ExpenseForm({ onAdd }: ExpenseFormProps) {
  const [form, setForm] = useState(emptyForm);
  const [error, setError] = useState<string | null>(null);

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    const amount = Number(form.amount);
    if (!form.description.trim()) {
      setError("Please enter a description.");
      return;
    }
    if (!Number.isFinite(amount) || amount <= 0) {
      setError("Amount must be a positive number.");
      return;
    }

    onAdd({
      description: form.description.trim(),
      amount,
      category: form.category,
      date: form.date,
    });
    setForm(emptyForm());
    setError(null);
  }

  return (
    <form className="expense-form" onSubmit={handleSubmit}>
      <input
        aria-label="Description"
        placeholder="Description"
        value={form.description}
        onChange={(e) => setForm({ ...form, description: e.target.value })}
      />
      <input
        aria-label="Amount"
        type="number"
        min="0"
        step="0.01"
        placeholder="Amount"
        value={form.amount}
        onChange={(e) => setForm({ ...form, amount: e.target.value })}
      />
      <select
        aria-label="Category"
        value={form.category}
        onChange={(e) => setForm({ ...form, category: e.target.value as Category })}
      >
        {CATEGORIES.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
      <input
        aria-label="Date"
        type="date"
        value={form.date}
        onChange={(e) => setForm({ ...form, date: e.target.value })}
      />
      <button type="submit">Add</button>
      {error && <p className="error">{error}</p>}
    </form>
  );
}
