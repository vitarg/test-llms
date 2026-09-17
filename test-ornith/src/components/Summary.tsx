import type { Expense } from "../types/expense";
import { totalExpenses, expensesByCategory } from "../utils/calculations";

interface Props {
  expenses: Expense[];
}

export function Summary({ expenses }: Props) {
  const total = totalExpenses(expenses);
  const byCategory = expensesByCategory(expenses);

  return (
    <div className="summary">
      <h3>Total: {total.toFixed(2)}</h3>
      <h4>By category</h4>
      {Object.entries(byCategory).length === 0 ? (
        <p>No data</p>
      ) : (
        <ul>
          {Object.entries(byCategory).map(([cat, sum]) => (
            <li key={cat}>
              <span className="cat-label">{cat}</span>
              <span>{sum.toFixed(2)}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
