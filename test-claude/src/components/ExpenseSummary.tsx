import { formatCurrency } from "../utils/format";

interface ExpenseSummaryProps {
  total: number;
  count: number;
}

export function ExpenseSummary({ total, count }: ExpenseSummaryProps) {
  return (
    <div className="expense-summary">
      <span>
        {count} {count === 1 ? "expense" : "expenses"}
      </span>
      <strong>{formatCurrency(total)}</strong>
    </div>
  );
}
