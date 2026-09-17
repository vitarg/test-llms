import { CATEGORIES } from '../types/expense.ts';
import type { CategoryFilter as Filter } from '../types/expense.ts';
import { isCategory } from '../utils/expenses.ts';

interface CategoryFilterProps {
  value: Filter;
  onChange: (category: Filter) => void;
}

export default function CategoryFilter({ value, onChange }: CategoryFilterProps) {
  return (
    <div className="category-filter">
      <label className="sr-only" htmlFor="category-filter">Filter by category</label>
      <select
        id="category-filter"
        value={value}
        onChange={(event) => {
          const category = event.target.value;
          if (category === 'All categories' || isCategory(category)) onChange(category);
        }}
      >
        <option>All categories</option>
        {CATEGORIES.map((category) => <option key={category}>{category}</option>)}
      </select>
    </div>
  );
}
