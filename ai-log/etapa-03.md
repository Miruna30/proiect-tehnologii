# Stage 3: AI log

## Tools
- Claude (claude.ai)

## Conversations
- <share link> (Vite + React setup)

## Key requests

### 1. Project structure
- Asked: the files of a Vite + React project in `frontend/`, without the demo page.
- Got: `package.json`, `vite.config.js`, `eslint.config.js`, `index.html`, `src/main.jsx`, `src/App.jsx`, `src/App.css` (the stage 1 styles, one column for now). The stage 1–2 files moved to `mockup/`.
- Changed or rejected: <...>

### 2. The counter in the header
- Asked: how to show "3 intervenții, dintre care 2 programate" computed from data.
- Got: `interventii.length` and `interventii.filter((i) => !i.efectuata).length`, written between braces in JSX.
- Changed or rejected: <...>

## What I learned / what did not work
- `node_modules/` is never committed; `npm install` recreates it from `package.json`.
- In JSX `class` becomes `className`, and a component returns a single parent (or a fragment `<>...</>`).
- <add your own notes>
