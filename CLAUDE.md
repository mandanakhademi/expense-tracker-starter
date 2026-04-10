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

This is a single-page React app built with Vite. All application logic lives in one file: `src/App.jsx`.

**State:**
- `transactions` — array of `{ id, description, amount, type, category, date }` objects
- `description, amount, type, category` — controlled form inputs
- `filterType, filterCategory` — filter controls

**Data flow:** form inputs → `handleSubmit` → `transactions` state → computed totals/filtered list → render.

Amounts are stored and computed with `parseFloat`. The `filterType` and `filterCategory` fields are applied together (AND logic) over the `transactions` array.

## Known intentional issues (starter project)

This repo is the starting point for a Claude Code course by Mosh Hamedani. It intentionally has bugs, messy code, and poor UX to be fixed during the course. Common issues include: string/number type mismatches on `amount`, no input validation, no persistence, and a monolithic single-component structure.
