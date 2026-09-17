import assert from 'node:assert/strict';
import test from 'node:test';
import type { Expense } from '../types/expense.ts';
import { filterExpenses, formatDate, parseAmount, parseStoredExpenses, totalExpenses } from './expenses.ts';

const expense: Expense = {
  id: 'expense-1', description: 'Coffee', amountCents: 410, category: 'Food & drinks', date: '2024-02-29',
};

test('money remains exact and invalid amounts are rejected', () => {
  assert.equal(parseAmount('0.29'), 29);
  assert.equal(parseAmount('.50'), 50);
  assert.equal(parseAmount('12.5'), 1250);
  assert.equal(parseAmount('999999.99'), 99_999_999);
  for (const invalid of ['', '0', '-1', '1.001', '1e2', '1,000', '1000000', 'Infinity']) {
    assert.equal(parseAmount(invalid), null, invalid);
  }
  const expenses = [expense, { ...expense, id: 'expense-2', amountCents: 29, category: 'Other' as const }];
  assert.equal(totalExpenses(expenses), 439);
  assert.deepEqual(filterExpenses(expenses, 'Food & drinks'), [expense]);
  assert.deepEqual(filterExpenses(expenses, 'All categories'), expenses);
  assert.equal(formatDate('2024-02-29'), 'Feb 29, 2024');
});

test('saved data is validated before use without silently discarding bad records', () => {
  assert.deepEqual(parseStoredExpenses(JSON.stringify([expense])), [expense]);
  assert.deepEqual(parseStoredExpenses('[]'), []);
  for (const invalid of [
    '{broken', 'null', '{}', '[null]',
    JSON.stringify([expense, expense]),
    ...[
      { id: '' }, { description: ' ' }, { category: 'Unknown' }, { amountCents: 0 },
      { amountCents: 1.5 }, { amountCents: 100_000_000 }, { amountCents: '410' },
      { date: '2023-02-29' }, { date: '2024-04-31' }, { date: '2024-13-01' }, { date: '0000-01-01' },
    ].map((patch) => JSON.stringify([{ ...expense, ...patch }])),
  ]) {
    assert.throws(() => parseStoredExpenses(invalid), invalid);
  }
});
