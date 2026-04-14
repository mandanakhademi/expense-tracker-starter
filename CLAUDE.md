# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm install       # Install dependencies
npm run dev       # Start dev server at http://localhost:5173
npm run build     # Production build (outputs to dist/)
npm run preview   # Preview production build locally
npm run lint      # Run ESLint
```

## Architecture

This is a React app built with Vite. The application is composed of several components:
- `App.jsx`: Main application container and state management.
- `Summary.jsx`: Displays transaction totals.
- `TransactionForm.jsx`: Handles adding new transactions.
- `TransactionList.jsx`: Displays the list of transactions and filtering logic.

**State:**
- `transactions` — array of `{ id, description, amount, type, category, date }` objects (managed in `App.jsx`)
- `description, amount, type, category` — controlled form inputs (managed in `TransactionForm.jsx`)
- `filterType, filterCategory` — filter controls (managed in `TransactionList.jsx`)

**Data flow:** `App.jsx` holds the shared state and passes props down to child components.

Amounts are stored and computed with `parseFloat`. The `filterType` and `filterCategory` fields are applied together (AND logic) over the `transactions` array.

## Known intentional issues (starter project)

This repo is the starting point for a Claude Code course by Mosh Hamedani. It intentionally has bugs, messy code, and poor UX to be fixed during the course. Common issues include: string/number type mismatches on `amount`, no input validation, and no persistence.
