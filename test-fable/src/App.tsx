import { CategoryFilter } from './components/CategoryFilter';
import { ExpenseForm } from './components/ExpenseForm';
import { ExpenseList } from './components/ExpenseList';
import { ExpenseSummary } from './components/ExpenseSummary';
import { useExpenses } from './hooks/useExpenses';

export default function App() {
  const { visibleExpenses, visibleTotal, filter, setFilter, addExpense, deleteExpense } =
    useExpenses();

  return (
    <main className="app">
      <h1>Expense Tracker</h1>
      <ExpenseForm onAdd={addExpense} />
      <div className="app__toolbar">
        <CategoryFilter value={filter} onChange={setFilter} />
        <ExpenseSummary total={visibleTotal} count={visibleExpenses.length} />
      </div>
      <ExpenseList expenses={visibleExpenses} onDelete={deleteExpense} />
    </main>
  );
}
