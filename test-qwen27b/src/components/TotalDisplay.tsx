import { formatCurrency } from '../utils/calculations';

interface Props {
  total: number;
}

export default function TotalDisplay({ total }: Props) {
  return (
    <div className="total-display">
      <span>Total</span>
      <strong>{formatCurrency(total)}</strong>
    </div>
  );
}
