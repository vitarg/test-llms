import { CATEGORIES, type Category } from '../types';

interface Props {
  selected: Category | null;
  onChange: (category: Category | null) => void;
}

export default function CategoryFilter({ selected, onChange }: Props) {
  return (
    <div className="category-filter">
      <select
        aria-label="Filter by category"
        value={selected || ''}
        onChange={(e) => onChange(e.target.value as Category | null)}
      >
        <option value="">All Categories</option>
        {CATEGORIES.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>
    </div>
  );
}
