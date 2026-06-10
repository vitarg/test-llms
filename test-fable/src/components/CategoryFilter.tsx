import { CATEGORIES, type CategoryFilter as Filter } from '../types/expense';

interface CategoryFilterProps {
  value: Filter;
  onChange: (filter: Filter) => void;
}

export function CategoryFilter({ value, onChange }: CategoryFilterProps) {
  return (
    <label className="category-filter">
      Filter:
      <select value={value} onChange={(e) => onChange(e.target.value as Filter)}>
        <option value="all">All categories</option>
        {CATEGORIES.map((c) => (
          <option key={c} value={c}>
            {c}
          </option>
        ))}
      </select>
    </label>
  );
}
