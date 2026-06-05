import { CategoryFilter } from "./components/CategoryFilter";
import { ExpenseForm } from "./components/ExpenseForm";
import { ExpenseList } from "./components/ExpenseList";
import { Summary } from "./components/Summary";
import { useExpenses } from "./hooks/useExpenses";

function App() {
  const {
    expenses,
    filteredExpenses,
    selectedCategory,
    totalExpenses,
    addExpense,
    deleteExpense,
    setSelectedCategory,
  } = useExpenses();

  return (
    <main className="app-shell">
      <section className="app-header" aria-labelledby="page-title">
        <div>
          <p className="eyebrow">Personal finance</p>
          <h1 id="page-title">Expense Tracker</h1>
        </div>
        <Summary total={totalExpenses} count={filteredExpenses.length} />
      </section>

      <section className="workspace" aria-label="Expense tracker workspace">
        <ExpenseForm onAddExpense={addExpense} />

        <section className="expense-panel" aria-labelledby="expense-list-title">
          <div className="panel-heading">
            <div>
              <p className="eyebrow">Spending log</p>
              <h2 id="expense-list-title">Expenses</h2>
            </div>
            <CategoryFilter
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
            />
          </div>

          <ExpenseList expenses={filteredExpenses} onDeleteExpense={deleteExpense} />
        </section>
      </section>
    </main>
  );
}

export default App;
