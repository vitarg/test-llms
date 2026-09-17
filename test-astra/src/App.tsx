import { useState } from 'react';
import CategoryFilter from './components/CategoryFilter.tsx';
import ExpenseForm from './components/ExpenseForm.tsx';
import ExpenseList from './components/ExpenseList.tsx';
import { useExpenses } from './hooks/useExpenses.ts';
import { CATEGORIES } from './types/expense.ts';
import type { CategoryFilter as Filter } from './types/expense.ts';
import { filterExpenses, formatCurrency, totalExpenses } from './utils/expenses.ts';

export default function App() {
  const { expenses, error, addExpense, deleteExpense } = useExpenses();
  const [category, setCategory] = useState<Filter>('All categories');
  const [announcement, setAnnouncement] = useState('');
  const visibleExpenses = [...filterExpenses(expenses, category)].sort((a, b) => b.date.localeCompare(a.date));
  const total = totalExpenses(expenses);
  const topCategory = CATEGORIES.map((name) => ({ name, total: totalExpenses(filterExpenses(expenses, name)) }))
    .sort((a, b) => b.total - a.total)[0];

  function handleDelete(id: string) {
    const deleted = deleteExpense(id);
    if (deleted) setAnnouncement('Expense deleted. Your totals have been updated.');
    return deleted;
  }

  return (
    <div className="app-shell">
      <header className="site-header">
        <a className="brand" href="./" aria-label="Penny home"><span className="brand-symbol" aria-hidden="true">p</span>penny<span className="brand-dot">.</span></a>
        <span className="header-divider" aria-hidden="true" />
        <span className="header-caption">A little more clarity.</span>
        <span className="local-badge"><span aria-hidden="true" /> Stored on this device</span>
      </header>

      <main>
        <div className="page-heading">
          <div><span className="eyebrow">YOUR EVERYDAY, AT A GLANCE</span><h1>Small spends. <span>Big picture.</span></h1><p>Keep track of the little things. Make room for what matters.</p></div>
          <span className="period-badge">All-time overview <span aria-hidden="true">↗</span></span>
        </div>

        <section className="summary-grid" aria-label="Expense overview">
          <div className="summary-card total-card">
            <div className="summary-label">Total spent <span aria-hidden="true">↗</span></div>
            <p className="total-value">{formatCurrency(total)}</p>
            <span className="summary-detail">Every expense, all in one place</span>
            <div className="card-orbit" aria-hidden="true" />
          </div>
          <div className="summary-card">
            <div className="summary-label">Expenses logged <span className="stat-icon" aria-hidden="true">≡</span></div>
            <p className="stat-value">{expenses.length.toLocaleString('en-US')}<span className="stat-unit">{expenses.length === 1 ? 'expense' : 'expenses'}</span></p>
            <span className="summary-detail">One good habit, one entry at a time</span>
          </div>
          <div className="summary-card">
            <div className="summary-label">Top category <span className="stat-icon" aria-hidden="true">◴</span></div>
            <p className={`top-category${total === 0 ? ' muted-value' : ''}`}>{total > 0 ? topCategory.name : 'A clean slate'}</p>
            <span className="summary-detail">{total > 0 ? `${formatCurrency(topCategory.total)} · ${Math.round(topCategory.total / total * 100)}% of your spending` : 'Your spending story starts below'}</span>
          </div>
        </section>

        {error && <div className="error-banner" role="alert">{error}</div>}
        <div className="workspace-grid">
          <ExpenseForm onAdd={addExpense} />
          <section className="panel history-panel" aria-labelledby="history-heading">
            <div className="history-heading">
              <div><h2 id="history-heading">Your expenses <span className="count-badge">{visibleExpenses.length}</span></h2><p>A little history of your everyday.</p></div>
              <CategoryFilter value={category} onChange={setCategory} />
            </div>
            <div className="list-labels" aria-hidden="true"><span>EXPENSE</span><span>AMOUNT</span></div>
            <ExpenseList expenses={visibleExpenses} filtered={category !== 'All categories'} onDelete={handleDelete} />
            <div className="list-footer" role="status"><span>{category === 'All categories' ? 'All expenses' : category}<span className="footer-count"> · {visibleExpenses.length} {visibleExpenses.length === 1 ? 'entry' : 'entries'}</span></span><strong>{formatCurrency(totalExpenses(visibleExpenses))}</strong></div>
          </section>
        </div>
        <p className="sr-only" role="status">{announcement}</p>
      </main>
      <footer className="site-footer"><span>Made for a little peace of mind.</span><span>Just you, your browser, and your pennies.</span></footer>
    </div>
  );
}
