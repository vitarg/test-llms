import { CATEGORIES, type Category } from "../types/expense";

interface Props {
  selected: Category | null;
  onChange: (category: Category | null) => void;
}

export function CategoryFilter({ selected, onChange }: Props) {
  return (
    <div className="category-filter">
      <button
        className={selected === null ? "active" : ""}
        onClick={() => onChange(null)}
      >
        All
      </button>
      {CATEGORIES.map((cat) => (
        <button
          key={cat}
          className={selected === cat ? "active" : ""}
          onClick={() => onChange(cat)}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}
