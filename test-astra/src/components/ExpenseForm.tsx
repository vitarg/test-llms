import { useRef, useState } from 'react';
import type { FormEvent } from 'react';
import { CATEGORIES } from '../types/expense.ts';
import type { NewExpense } from '../types/expense.ts';
import { isCategory, parseAmount, today } from '../utils/expenses.ts';

interface ExpenseFormProps {
  onAdd: (expense: NewExpense) => boolean;
}

export default function ExpenseForm({ onAdd }: ExpenseFormProps) {
  const [message, setMessage] = useState('');
  const [invalid, setInvalid] = useState(false);
  const descriptionRef = useRef<HTMLInputElement>(null);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const description = String(data.get('description') ?? '').trim();
    const amountCents = parseAmount(String(data.get('amount') ?? ''));
    const category = data.get('category');
    const date = String(data.get('date') ?? '');

    if (!description || amountCents === null || !isCategory(category)) {
      setInvalid(true);
      setMessage('Enter a description and an amount between $0.01 and $999,999.99.');
      return;
    }

    if (onAdd({ description, amountCents, category, date })) {
      form.reset();
      descriptionRef.current?.focus();
      setInvalid(false);
      setMessage('Expense added. You’re all caught up.');
    } else {
      setMessage('');
    }
  }

  return (
    <section className="panel form-panel" aria-labelledby="add-heading">
      <div className="section-heading">
        <span className="eyebrow">MAKE IT A HABIT</span>
        <h2 id="add-heading">Add an expense</h2>
        <p>A small entry. A clearer picture.</p>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="description">Description</label>
          <input ref={descriptionRef} id="description" name="description" placeholder="What was it for?" maxLength={80} required />
        </div>
        <div className="field">
          <label htmlFor="amount">Amount</label>
          <div className="amount-input">
            <span aria-hidden="true">$</span>
            <input id="amount" name="amount" type="number" inputMode="decimal" placeholder="0.00" min="0.01" max="999999.99" step="0.01" aria-describedby="currency-hint" required />
            <span id="currency-hint">USD</span>
          </div>
        </div>
        <div className="field">
          <label htmlFor="category">Category</label>
          <select id="category" name="category" defaultValue={CATEGORIES[0]}>
            {CATEGORIES.map((category) => <option key={category}>{category}</option>)}
          </select>
        </div>
        <div className="field">
          <label htmlFor="date">Date</label>
          <input id="date" name="date" type="date" defaultValue={today()} min="0001-01-01" max="9999-12-31" required />
        </div>
        <button className="primary-button" type="submit"><span aria-hidden="true">+</span> Add expense</button>
        <p className={`form-message${invalid ? ' invalid' : ''}`} role="status">{message}</p>
      </form>
      <div className="form-note"><span aria-hidden="true">↳</span> A little awareness goes a long way.</div>
    </section>
  );
}
