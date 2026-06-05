import { formatCurrency } from "../utils/currency";

type SummaryProps = {
  total: number;
  count: number;
};

export function Summary({ total, count }: SummaryProps) {
  return (
    <aside className="summary" aria-label="Expense summary">
      <span>Total expenses</span>
      <strong>{formatCurrency(total)}</strong>
      <small>
        {count} {count === 1 ? "expense" : "expenses"}
      </small>
    </aside>
  );
}
