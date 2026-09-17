import { FilterCategory, EXPENSE_CATEGORIES } from '../types';
import { getCategoryLabel } from '../utils/formatters';

interface CategoryFilterProps {
  filter: FilterCategory;
  onChange: (filter: FilterCategory) => void;
}

export function CategoryFilter({ filter, onChange }: CategoryFilterProps) {
  return (
    <div className="category-filter">
      <label htmlFor="category-select">Filter by:</label>
      <select
        id="category-select"
        value={filter}
        onChange={(e) => onChange(e.target.value as FilterCategory)}
      >
        <option value="all">All Expenses</option>
        {EXPENSE_CATEGORIES.map((cat) => (
          <option key={cat} value={cat}>
            {getCategoryLabel(cat)}
          </option>
        ))}
      </select>
    </div>
  );
}
