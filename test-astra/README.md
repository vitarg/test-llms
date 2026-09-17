# Penny · Personal expense tracker

A small React + TypeScript app for adding and deleting expenses, filtering by category, and seeing both the overall total and the selected category’s subtotal. Expenses stay in your browser’s localStorage after a reload. The app starts empty.

## Folder structure

```text
src/
├── components/
│   ├── CategoryFilter.tsx
│   ├── ExpenseForm.tsx
│   └── ExpenseList.tsx
├── hooks/
│   └── useExpenses.ts
├── types/
│   └── expense.ts
├── utils/
│   ├── expenses.ts
│   └── expenses.test.ts
├── App.tsx
├── main.tsx
└── styles.css
.gitignore
index.html
package.json
package-lock.json
README.md
tsconfig.json
vite.config.ts
```

## Run

Use Node.js 22.18+ (or Node.js 24 LTS).

```sh
npm install
npm run dev
```

Open the local URL printed by Vite.

```sh
npm test         # Native Node tests; no test framework dependency
npm run build   # Strict TypeScript check and production build
npm run preview # Serve the production build locally
```

## How it fits together

- `types/expense.ts` defines the expense model and the single shared category list. New expenses reuse that model through `Omit<Expense, 'id'>`.
- `utils/expenses.ts` handles parsing, formatting, totals, filtering, and runtime validation of saved data. Amounts are positive integer cents, capped at $999,999.99 per expense, to keep decimal arithmetic exact.
- `hooks/useExpenses.ts` owns state and localStorage access. It loads once, assigns UUIDs, and persists changes before updating state. A failed save leaves the previous expenses and form input intact. Invalid saved data is preserved and reported instead of overwritten.
- The components receive typed props. `App.tsx` derives totals and category results from the expense list, without storing redundant totals in state. The list is ordered by date, newest first; summary cards always reflect all expenses.

## Tradeoffs

- Local React state and native inputs keep dependencies small. The app uses React, Vite, and TypeScript; no routing, state management library, form library, or backend is needed for one screen.
- localStorage is synchronous, tied to this browser and origin, and limited in size. It suits a small personal list. Clearing browser data removes expenses. Separate tabs do not synchronize; concurrent edits use the most recent save.
- Currency and categories are fixed (USD and seven categories). Dates are calendar dates rather than timestamps, so they display consistently across time zones.
- Totals and filtering run over the list on each render. This keeps the code direct for a small dataset; larger histories would benefit from a database and pagination.
- Google Fonts enhance the visual design when online; system fonts are the fallback.

## Possible improvements

Add editing and undo for accidental deletes, CSV import/export for backups, custom categories and currency preferences, and monthly summaries. For use across devices, add authentication and a backend; for larger offline datasets, use IndexedDB. Add cross-tab synchronization with conflict handling if concurrent use becomes necessary.

## Checks

`npm test` checks exact cent parsing, amount bounds, totals, filtering, date formatting, and rejection of malformed or duplicate saved records. `npm run build` type-checks every TypeScript file before bundling.
