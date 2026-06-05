import { useMemo, useState } from "react";
import type { Expense, ExpenseCategoryFilter, NewExpense } from "../types/expense";
import { ALL_CATEGORIES, isAllCategories } from "../utils/categories";
import { calculateTotalExpenses, createExpense } from "../utils/expense";
import { useLocalStorage } from "./useLocalStorage";

const STORAGE_KEY = "personal-expenses";

export function useExpenses() {
  const [expenses, setExpenses] = useLocalStorage<Expense[]>(STORAGE_KEY, []);
  const [selectedCategory, setSelectedCategory] =
    useState<ExpenseCategoryFilter>(ALL_CATEGORIES);

  const filteredExpenses = useMemo(() => {
    if (isAllCategories(selectedCategory)) {
      return expenses;
    }

    return expenses.filter((expense) => expense.category === selectedCategory);
  }, [expenses, selectedCategory]);

  const totalExpenses = useMemo(
    () => calculateTotalExpenses(filteredExpenses),
    [filteredExpenses],
  );

  const addExpense = (expense: NewExpense) => {
    setExpenses((currentExpenses) => [createExpense(expense), ...currentExpenses]);
  };

  const deleteExpense = (id: Expense["id"]) => {
    setExpenses((currentExpenses) =>
      currentExpenses.filter((expense) => expense.id !== id),
    );
  };

  return {
    expenses,
    filteredExpenses,
    selectedCategory,
    totalExpenses,
    addExpense,
    deleteExpense,
    setSelectedCategory,
  };
}
