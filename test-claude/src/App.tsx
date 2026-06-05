import { CategoryFilter } from "./components/CategoryFilter";
import { ExpenseForm } from "./components/ExpenseForm";
import { ExpenseList } from "./components/ExpenseList";
import { ExpenseSummary } from "./components/ExpenseSummary";
import { useExpenses } from "./hooks/useExpenses";
import "./App.css";

export default function App() {
  const { expenses, filter, setFilter, total, addExpense, deleteExpense } =
    useExpenses();

  return (
    <main className="app">
      <h1>Expense Tracker</h1>

      <ExpenseForm onAdd={addExpense} />

      <div className="toolbar">
        <CategoryFilter value={filter} onChange={setFilter} />
        <ExpenseSummary total={total} count={expenses.length} />
      </div>

      <ExpenseList expenses={expenses} onDelete={deleteExpense} />
    </main>
  );
}
