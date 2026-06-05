# Personal Expense Tracker

## Folder Structure

```text
test-gpt/
  index.html
  package.json
  tsconfig.json
  tsconfig.node.json
  vite.config.ts
  README.md
  src/
    main.tsx
    App.tsx
    App.css
    components/
      CategoryFilter.tsx
      ExpenseForm.tsx
      ExpenseList.tsx
      Summary.tsx
    hooks/
      useExpenses.ts
      useLocalStorage.ts
    types/
      expense.ts
    utils/
      categories.ts
      currency.ts
      expense.ts
      id.ts
```

## Tradeoffs

This app keeps state management local with React hooks because the feature set is small. The `useExpenses` hook owns expense operations, while reusable calculations and formatting live in `utils/`. This avoids duplicating logic without adding a heavier state library.

`localStorage` is simple and works well for personal data on one browser, but it is not a database. Data will not sync across devices and can be cleared by the browser.

## Future Improvements

- Add editing support for existing expenses.
- Add date-range filters and sorting.
- Export expenses to CSV.
- Add charts by category and month.
- Add validation messages per field instead of simple browser validation.
- Sync data to a backend or cloud account.
