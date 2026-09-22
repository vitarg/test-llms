import {
  CATEGORY_LABELS,
  EXPENSE_CATEGORIES,
  type CategoryFilterValue,
} from '../types/expense';

interface CategoryFilterProps {
  value: CategoryFilterValue;
  onChange: (value: CategoryFilterValue) => void;
}

const OPTIONS: readonly CategoryFilterValue[] = ['all', ...EXPENSE_CATEGORIES];

export function CategoryFilter({ value, onChange }: CategoryFilterProps) {
  return (
    <div className="category-filter" role="group" aria-label="Filter by category">
      {OPTIONS.map((option) => (
        <button
          key={option}
          type="button"
          className={
            option === value
              ? 'category-filter__button category-filter__button--active'
              : 'category-filter__button'
          }
          aria-pressed={option === value}
          onClick={() => onChange(option)}
        >
          {option === 'all' ? 'All' : CATEGORY_LABELS[option]}
        </button>
      ))}
    </div>
  );
}
