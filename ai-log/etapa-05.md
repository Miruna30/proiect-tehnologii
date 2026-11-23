# Stage 5: AI log

## Tools
- Claude (claude.ai)

## Conversations
- https://claude.ai/share/1c94be22-26aa-4c9c-b588-42ff49feb2f3

## Key requests

### 1. Toggle and delete from the page
- Asked: keep the list in `useState` and make the checkbox and the delete button work.
- Got: `handleToggle` and `handleDelete` in `App`, written with `setInterventii((prev) => ...)` and the immutable `map` / `filter` from stage 2, passed down as `onToggle` / `onDelete`.
- Changed or rejected: <...>

### 2. A second derived value
- Asked: besides the counter, show something useful for a car owner.
- Got: "Cheltuieli efectuate" in the header, the sum of the costs of done interventions, computed with `filter` + `reduce` at every render (not kept in state). Also a small `numarCu` helper so the text says "1 programată" / "20 de intervenții".
- Changed or rejected: <...>

### 3. Light / dark toggle
- Asked: a button that switches the theme regardless of the system setting, and remembers the choice.
- Got: `tema` in state, `data-theme` written on `<html>` in the click handler, `:root[data-theme="dark"]` in CSS and `:root:not([data-theme="light"])` inside the system media query; the choice saved in `localStorage` and applied in `main.jsx` before the first render.
- Changed or rejected: <...>

## What I learned / what did not work
- `onClick={() => onDelete(id)}`, not `onClick={onDelete(id)}`: the second one runs at render and empties the list.
- A controlled checkbox needs both `checked` and `onChange`.
- <add your own notes>
