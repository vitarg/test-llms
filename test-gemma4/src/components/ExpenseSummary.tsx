import React from 'react';
import { Category } from '../types/expense';

interface ExpenseSummaryProps {
  total: number;
  currentFilter: Category | 'All';
  onFilterChange: (category: Category | 'All') => void;
}

const CATEGORIES: (Category | 'All')[] = ['All', 'Food', 'Transport', 'Entertainment', 'Utilities', 'Other'];

export const ExpenseSummary: React.FC<ExpenseSummaryProps> = ({ total, currentFilter, onFilterChange }) => {
  return (
    <div style={{ marginBottom: '20px', padding: '15px', background: '#f9f9f9', borderRadius: '8px' }}>
      <h3>Total Expenses: ${total.toFixed(2)}</h3>
      <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap' }}>
        <span>Filter by:</span>
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => onFilterChange(cat)}
            style={{
              padding: '5px 10px',
              cursor: 'pointer',
              backgroundColor: currentFilter === cat ? '#007bff' : '#fff',
              color: currentFilter === cat ? '#fff' : '#000',
              border: '1px solid #ccc',
              borderRadius: '4px',
            }}
          >
            {cat}
          </button>
        ))}
      </div>
    </div>
  );
};
