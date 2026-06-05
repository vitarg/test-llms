import { EXPENSE_CATEGORIES, ALL_CATEGORIES } from "../utils/categories";
import type { ExpenseCategory, ExpenseCategoryFilter } from "../types/expense";

type CategoryFilterProps = {
  selectedCategory: ExpenseCategoryFilter;
  onCategoryChange: (category: ExpenseCategoryFilter) => void;
};

export function CategoryFilter({
  selectedCategory,
  onCategoryChange,
}: CategoryFilterProps) {
  return (
    <label className="field compact-field">
      <span>Category</span>
      <select
        value={selectedCategory}
        onChange={(event) =>
          onCategoryChange(event.target.value as ExpenseCategoryFilter)
        }
      >
        <option value={ALL_CATEGORIES}>All categories</option>
        {EXPENSE_CATEGORIES.map((category: ExpenseCategory) => (
          <option value={category} key={category}>
            {category}
          </option>
        ))}
      </select>
    </label>
  );
}
