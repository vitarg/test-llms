import type { Category, Expense } from '../types/expense.ts';
import { formatCurrency, formatDate } from '../utils/expenses.ts';

interface ExpenseListProps {
  expenses: Expense[];
  filtered: boolean;
  onDelete: (id: string) => boolean;
}

const categorySymbols: Record<Category, string> = {
  'Food & drinks': '☕',
  Shopping: '↗',
  Transport: '⇄',
  Home: '⌂',
  Entertainment: '♫',
  Health: '+',
  Other: '⋯',
};

export default function ExpenseList({ expenses, filtered, onDelete }: ExpenseListProps) {
  if (expenses.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-illustration" aria-hidden="true"><span>≡<i>✓</i></span></div>
        <h3>{filtered ? 'Nothing in this category. Yet.' : 'A fresh start for your spending.'}</h3>
        <p>{filtered ? 'Try another category or add an expense here.' : 'Add your first expense and turn everyday spending into a little more clarity.'}</p>
        {!filtered && <span className="empty-caption">YOUR FIRST PENNY STARTS HERE</span>}
      </div>
    );
  }

  return (
    <ul className="expense-list" aria-label="Expenses">
      {expenses.map((expense) => (
        <li key={expense.id} className="expense-row">
          <span className={`category-symbol category-${expense.category.toLowerCase().split(' ')[0]}`} aria-hidden="true">{categorySymbols[expense.category]}</span>
          <div className="expense-details">
            <h3>{expense.description}</h3>
            <p>{expense.category}<span aria-hidden="true">·</span><time dateTime={expense.date}>{formatDate(expense.date)}</time></p>
          </div>
          <span className="expense-amount">{formatCurrency(expense.amountCents)}</span>
          <button className="delete-button" type="button" onClick={() => onDelete(expense.id)} aria-label={`Delete ${expense.description}, ${formatCurrency(expense.amountCents)}`} title={`Delete ${expense.description}`}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M3 6h18M9 6V3h6v3M5 6l1 15h12l1-15M10 10v7M14 10v7" /></svg>
          </button>
        </li>
      ))}
    </ul>
  );
}
