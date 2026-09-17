import { useRef, useState } from 'react';
import type { Expense, NewExpense } from '../types/expense.ts';
import { parseStoredExpenses } from '../utils/expenses.ts';

const STORAGE_KEY = 'penny.expenses.v1';

interface ExpenseState {
  expenses: Expense[];
  error: string | null;
  blocked: boolean;
}

function loadExpenses(): ExpenseState {
  let raw: string | null;
  try {
    raw = localStorage.getItem(STORAGE_KEY);
  } catch {
    return {
      expenses: [], blocked: true,
      error: 'Browser storage is unavailable. Allow local storage and reload to track expenses.',
    };
  }
  try {
    return { expenses: raw === null ? [] : parseStoredExpenses(raw), error: null, blocked: false };
  } catch {
    return {
      expenses: [], blocked: true,
      error: 'Saved expenses could not be read. Your stored data is unchanged. Restore or remove the penny.expenses.v1 browser storage entry, then reload.',
    };
  }
}

export function useExpenses() {
  const [state, setState] = useState(loadExpenses);
  const latestExpenses = useRef(state.expenses);

  function saveExpenses(expenses: Expense[]): boolean {
    if (state.blocked) return false;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(expenses));
      latestExpenses.current = expenses;
      setState({ expenses, error: null, blocked: false });
      return true;
    } catch {
      setState((previous) => ({
        ...previous,
        error: 'Your change could not be saved. Browser storage may be full or disabled. Your expenses are unchanged; free some space and try again.',
      }));
      return false;
    }
  }

  function addExpense(expense: NewExpense): boolean {
    return saveExpenses([{ ...expense, id: crypto.randomUUID() }, ...latestExpenses.current]);
  }

  function deleteExpense(id: string): boolean {
    return saveExpenses(latestExpenses.current.filter((expense) => expense.id !== id));
  }

  return { expenses: state.expenses, error: state.error, addExpense, deleteExpense };
}
