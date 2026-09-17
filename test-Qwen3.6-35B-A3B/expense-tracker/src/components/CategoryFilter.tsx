import React from 'react';
import { Category } from '../types';
import { AVAILABLE_CATEGORIES } from '../types';

interface CategoryFilterProps {
  selected: Category;
  onChange: (category: Category) => void;
}

export const CategoryFilter: React.FC<CategoryFilterProps> = ({ selected, onChange }) => {
  return (
    <div className="filter-bar">
      <label htmlFor="category-filter">Filter by category:</label>
      <select
        id="category-filter"
        value={selected}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="all">All</option>
        {AVAILABLE_CATEGORIES.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>
    </div>
  );
};
