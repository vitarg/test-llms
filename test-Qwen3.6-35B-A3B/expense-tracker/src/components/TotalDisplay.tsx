import React from 'react';

interface TotalDisplayProps {
  total: number;
  categoryTotals: Record<string, number>;
}

export const TotalDisplay: React.FC<TotalDisplayProps> = ({ total, categoryTotals }) => {
  return (
    <div className="totals-panel">
      <div className="total-main">
        <span>Total:</span>
        <span className="total-amount">${total.toFixed(2)}</span>
      </div>
      {Object.keys(categoryTotals).length > 0 && (
        <div className="category-breakdown">
          <h3>By Category</h3>
          {Object.entries(categoryTotals)
            .sort(([, a], [, b]) => b - a)
            .map(([category, amount]) => (
              <div key={category} className="category-row">
                <span>{category}</span>
                <span>${amount.toFixed(2)}</span>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};
