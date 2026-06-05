import { FormEvent, useState } from "react";
import type { NewExpense } from "../types/expense";
import { EXPENSE_CATEGORIES } from "../utils/categories";

type ExpenseFormProps = {
  onAddExpense: (expense: NewExpense) => void;
};

const initialFormState: NewExpense = {
  title: "",
  amount: 0,
  category: "Food",
};

export function ExpenseForm({ onAddExpense }: ExpenseFormProps) {
  const [formState, setFormState] = useState<NewExpense>(initialFormState);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const title = formState.title.trim();
    if (!title || formState.amount <= 0) {
      return;
    }

    onAddExpense({
      ...formState,
      title,
      amount: Number(formState.amount),
    });

    setFormState(initialFormState);
  };

  return (
    <form className="expense-form" onSubmit={handleSubmit}>
      <div>
        <p className="eyebrow">New expense</p>
        <h2>Add Expense</h2>
      </div>

      <label className="field">
        <span>Title</span>
        <input
          type="text"
          value={formState.title}
          onChange={(event) =>
            setFormState((current) => ({
              ...current,
              title: event.target.value,
            }))
          }
          placeholder="Lunch, metro pass, books"
          required
        />
      </label>

      <label className="field">
        <span>Amount</span>
        <input
          type="number"
          min="0.01"
          step="0.01"
          value={formState.amount || ""}
          onChange={(event) =>
            setFormState((current) => ({
              ...current,
              amount: Number(event.target.value),
            }))
          }
          placeholder="0.00"
          required
        />
      </label>

      <label className="field">
        <span>Category</span>
        <select
          value={formState.category}
          onChange={(event) =>
            setFormState((current) => ({
              ...current,
              category: event.target.value as NewExpense["category"],
            }))
          }
        >
          {EXPENSE_CATEGORIES.map((category) => (
            <option value={category} key={category}>
              {category}
            </option>
          ))}
        </select>
      </label>

      <button className="primary-button" type="submit">
        Add expense
      </button>
    </form>
  );
}
