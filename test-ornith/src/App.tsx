import { useState, useCallback } from "react";
import { useExpenses } from "./hooks/useExpenses";
import { ExpenseForm } from "./components/ExpenseForm";
import { ExpenseList } from "./components/ExpenseList";
import { CategoryFilter } from "./components/CategoryFilter";
import { Summary } from "./components/Summary";
import type { Category } from "./types/expense";

export default function App() {
  const { expenses, addExpense, deleteExpense } = useExpenses();
  const [category, setCategory] = useState<Category | null>(null);

  const filtered = useCallback(
    () => (category ? expenses.filter((e) => e.category === category) : expenses),
    [expenses, category],
  );

  return (
    <div className="app">
      <h1>Expense Tracker</h1>
      <ExpenseForm onAdd={addExpense} />
      <CategoryFilter selected={category} onChange={setCategory} />
      <Summary expenses={expenses} />
      <ExpenseList expenses={filtered()} onDelete={deleteExpense} />
    </div>
  );
}
