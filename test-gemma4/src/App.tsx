import React from 'react';
import { useExpenses } from './hooks/useExpenses';
import { ExpenseForm } from './components/ExpenseForm';
import { ExpenseList } from './components/ExpenseList';
import { ExpenseSummary } from './components/ExpenseSummary';

const App: React.FC = () => {
  const {
    filteredExpenses,
    addExpense,
    deleteExpense,
    totalExpenses,
    filterCategory,
    setFilterCategory,
  } = useExpenses();

  return (
    <div style={{ maxWidth: '600px', margin: '40px auto', padding: '0 20px', fontFamily: 'sans-serif' }}>
      <h1>Expense Tracker</h1>
      
      <ExpenseSummary 
        total={totalExpenses} 
        currentFilter={filterCategory} 
        onFilterChange={setFilterCategory} 
      />

      <ExpenseForm onAdd={addExpense} />

      <div style={{ marginTop: '30px' }}>
        <h2>Expenses</h2>
        <ExpenseList expenses={filteredExpenses} onDelete={deleteExpense} />
      </div>
    </div>
  );
};

export default App;
