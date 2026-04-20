---
name: project_patterns
description: Recurring bugs, architectural conventions, and code quality patterns found during the first full codebase review (2026-04-20)
type: project
---

## Known Bug Patterns

- `amount` in TransactionForm is set via `e.target.valueAsNumber`, which produces `NaN` when the field is cleared (the guard `if (!amount)` does NOT catch `NaN` — `!NaN` is `true` in JS, so this actually does guard submission, but `NaN` can still leak into state if logic changes). The field still stores a raw number from the input, which can produce `NaN` on clear/focus-blur without submission.
- `Summary.jsx` displays amounts with bare template interpolation (`${totalIncome}`) — no `toFixed(2)` or `Intl.NumberFormat`, so floating-point results like `5800.1` render unformatted.
- `TransactionList.jsx` amount display (`{t.amount}`) has the same raw-number rendering problem — no formatting.
- `SpendingChart.jsx` calls `parseFloat(t.amount)` defensively, which implies the rest of the codebase does NOT consistently guarantee numeric amounts. This is the only component that normalizes the value.

## Duplication / Maintainability Issues

- The `categories` array is defined independently in BOTH `TransactionForm.jsx` AND `TransactionList.jsx`. Must be kept in sync manually. Should live in a shared `constants.js`.
- `categoryColors` in `TransactionList.jsx` uses a hardcoded fallback `'#7a83a0'` that duplicates the value for the "other" category — they are the same color but defined separately.
- Inline styles in `SpendingChart.jsx` (`CustomTooltip`) duplicate CSS custom property values (e.g., `#1b1f2c` = `--surface-2`, `#e8eaf2` = `--text`) as magic strings. If the theme changes, the tooltip won't update.

## Performance / React Patterns

- `Summary.jsx` runs two `.filter().reduce()` passes over the full transactions array on every render with no memoization (`useMemo`). Fine at small scale but will degrade as the list grows.
- `SpendingChart.jsx` runs a `.filter().reduce()` on every render with no memoization.
- `App.jsx` passes inline arrow functions as `onAdd` and `onDelete` props — these create new function references on every render, causing unnecessary re-renders of child components. Should use `useCallback`.
- Filter logic in `TransactionList.jsx` runs two sequential `.filter()` passes. Could be combined into one pass.

## State & Data Flow

- `App.jsx` uses `[...transactions, t]` (spread) for adds and `.filter()` for deletes — both create new arrays using stale closure over `transactions`. Should use the functional updater form `setTransactions(prev => [...prev, t])` to avoid potential stale closure bugs if batching occurs.
- No `id` collision guard: new transactions use `Date.now()` as `id`. If two transactions are added within the same millisecond (e.g., rapid programmatic adds or tests), IDs collide. Low risk in practice but worth noting.

## Validation & UX

- `TransactionForm`: `if (!description || !amount) return` — the `amount` guard does not prevent submission of `0` (which is falsy). A zero-amount transaction would be silently blocked.
- No negative amount guard — a user can type `-500` into the amount field. This would result in a negative expense, corrupting Summary totals silently.
- No `min` attribute on the amount `<input type="number">` to prevent negatives at the HTML level.
- No `maxLength` or trim on `description` — whitespace-only descriptions pass the `!description` guard.
- No `aria-label` attributes on form inputs — they rely on `placeholder` alone, which is not accessible.

## CSS / Styling

- `App.css` uses `form button` selector globally. Any button inside a `<form>` anywhere in the app will receive the accent style, which may cause unintended styling as the app grows.
- The SVG chevron for `<select>` elements is duplicated as a data URI in both the `form select` rule and the `.filters select` rule. Could be a CSS variable or a single shared class.
- No responsive breakpoints — the 3-column summary grid and table will overflow on narrow viewports.

## What Has Been Done Well

- `TransactionList.jsx` correctly uses `t.id` as the React list key (not array index).
- `SpendingChart.jsx` has a clean null-render guard (`if (data.length === 0) return null`).
- `TransactionForm.jsx` resets all fields after a successful submit.
- CSS custom properties are used consistently for theming in `App.css`.
- `categoryColors` uses the nullish coalescing fallback (`?? '#7a83a0'`) correctly for unknown categories.

**Why:** First full review pass — use this as a baseline. Do not re-suggest items already listed here unless the code has changed.
**How to apply:** In future reviews, cross-check against this list so feedback focuses on new issues or regressions.
