import { useMemo, useState } from 'react';
import { CategoryFilter } from './components/CategoryFilter';
import { ExpenseForm } from './components/ExpenseForm';
import { ExpenseList } from './components/ExpenseList';
import { TotalExpenses } from './components/TotalExpenses';
import { useExpenses } from './hooks/useExpenses';
import type { CategoryFilterValue } from './types/expense';
import { calculateTotal, filterByCategory } from './utils/calculate';
import './App.css';

export default function App() {
  const { expenses, addExpense, deleteExpense, total } = useExpenses();
  const [category, setCategory] = useState<CategoryFilterValue>('all');

  const visibleExpenses = useMemo(
    () => filterByCategory(expenses, category),
    [expenses, category],
  );
  const visibleTotal = useMemo(
    () => calculateTotal(visibleExpenses),
    [visibleExpenses],
  );
  const isFiltered = category !== 'all';

  return (
    <div className="app">
      <header className="app__header">
        <h1>Expense Tracker</h1>
        <TotalExpenses
          total={total}
          visibleTotal={visibleTotal}
          visibleCount={visibleExpenses.length}
          isFiltered={isFiltered}
        />
      </header>
      <main className="app__main">
        <ExpenseForm onAdd={addExpense} />
        <CategoryFilter value={category} onChange={setCategory} />
        <ExpenseList
          expenses={visibleExpenses}
          onDelete={deleteExpense}
          emptyMessage={
            isFiltered
              ? 'No expenses in this category.'
              : 'No expenses yet. Add one above.'
          }
        />
      </main>
    </div>
  );
}
