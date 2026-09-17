import React from 'react';
import { useExpenses } from './hooks/useExpenses';
import { ExpenseForm } from './components/ExpenseForm';
import { ExpenseList } from './components/ExpenseList';
import { CategoryFilter } from './components/CategoryFilter';
import { TotalDisplay } from './components/TotalDisplay';

export const App: React.FC = () => {
  const {
    expenses,
    total,
    categoryTotals,
    filterCategory,
    setFilterCategory,
    addExpense,
    deleteExpense,
  } = useExpenses();

  return (
    <div className="app">
      <h1>Expense Tracker</h1>
      <ExpenseForm onAdd={addExpense} />
      <CategoryFilter selected={filterCategory} onChange={setFilterCategory} />
      <TotalDisplay total={total} categoryTotals={categoryTotals} />
      <ExpenseList expenses={expenses} onDelete={deleteExpense} />
    </div>
  );
};
