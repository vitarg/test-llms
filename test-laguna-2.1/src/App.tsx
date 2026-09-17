import { AddExpenseForm, CategoryFilter, ExpenseList, ExpenseTotal } from './components';
import { useExpenses } from './hooks/useExpenses';
import './index.css';

function App() {
  const {
    expenses,
    filter,
    setFilter,
    totalExpenses,
    addExpense,
    deleteExpense,
  } = useExpenses();

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Expense Tracker</h1>
      </header>

      <main className="app-main">
        <section className="card">
          <h2>Add Expense</h2>
          <AddExpenseForm onSubmit={addExpense} />
        </section>

        <section className="card">
          <div className="card-header">
            <h2>Expenses</h2>
            <CategoryFilter filter={filter} onChange={setFilter} />
          </div>
          <ExpenseTotal total={totalExpenses} />
          <ExpenseList expenses={expenses} onDelete={deleteExpense} />
        </section>
      </main>
    </div>
  );
}

export default App;
