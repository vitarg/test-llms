import './App.css';
import { useExpenses } from './hooks/useExpenses';
import ExpenseForm from './components/ExpenseForm';
import ExpenseList from './components/ExpenseList';
import CategoryFilter from './components/CategoryFilter';
import TotalDisplay from './components/TotalDisplay';

function App() {
  const {
    expenses,
    total,
    filterCategory,
    setFilterCategory,
    addExpense,
    deleteExpense,
  } = useExpenses();

  return (
    <div className="app">
      <h1>Expense Tracker</h1>
      <ExpenseForm onAdd={addExpense} />
      <div className="controls">
        <CategoryFilter selected={filterCategory} onChange={setFilterCategory} />
        <TotalDisplay total={total} />
      </div>
      <ExpenseList expenses={expenses} onDelete={deleteExpense} />
    </div>
  );
}

export default App;
