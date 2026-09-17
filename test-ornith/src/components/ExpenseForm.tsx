import { useState, type FormEvent } from "react";
import { CATEGORIES, type Category, type Expense } from "../types/expense";

interface Props {
  onAdd: (expense: Omit<Expense, "id">) => void;
}

export function ExpenseForm({ onAdd }: Props) {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState<Category>("food");
  const [date, setDate] = useState(() => new Date().toISOString().slice(0, 10));

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const num = parseFloat(amount);
    if (!description.trim() || isNaN(num) || num <= 0) return;

    onAdd({ description: description.trim(), amount: num, category, date });
    setDescription("");
    setAmount("");
    setCategory("food");
    setDate(new Date().toISOString().slice(0, 10));
  };

  return (
    <form onSubmit={handleSubmit} className="expense-form">
      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />
      <input
        type="number"
        step="0.01"
        min="0.01"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        required
      />
      <select value={category} onChange={(e) => setCategory(e.target.value as Category)}>
        {CATEGORIES.map((c) => (
          <option key={c} value={c}>{c}</option>
        ))}
      </select>
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        required
      />
      <button type="submit">Add</button>
    </form>
  );
}
