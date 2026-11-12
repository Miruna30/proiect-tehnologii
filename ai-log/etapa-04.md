# Stage 4: AI log

## Tools
- Claude (claude.ai)

## Conversations
- <share link> (React components and props)

## Key requests

### 1. Splitting the list into components
- Asked: replace the raw JSON with a list component and a card component.
- Got: `InterventieList` (map + `key={interventie.id}`, early return for the empty list) and `InterventieCard` (receives one intervention through props).
- Changed or rejected: <...>

### 2. Showing the data nicely
- Asked: how to display the date as 05.12.2026 and the numbers as 152.000 without changing the data.
- Got: two small helpers in `src/format.js` (`formatData`, `formatNumar`) and an `ETICHETE_TIP` object that maps `reparatie` to "Reparație".
- Changed or rejected: <...>

## What I learned / what did not work
- `key` goes on the element returned directly from `map`, and it must be the id, not the index.
- Props are read-only: the card only displays what it receives.
- <add your own notes>
