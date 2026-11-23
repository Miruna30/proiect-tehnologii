# Stage 7: AI log

## Tools
- Claude (claude.ai)

## Conversations
- https://claude.ai/share/1c94be22-26aa-4c9c-b588-42ff49feb2f3

## Key requests

### 1. The add form
- Asked: a controlled form with all the fields of an intervention and validation shown next to the form, not with `alert`.
- Got: `InterventieForm` (value + onChange on every field, `noValidate`, `e.preventDefault()`), validation rules in `src/validare.js` reused from stage 2, the button disabled while sending, the fields cleared only after a successful save. Number fields are kept as text while typing and converted with `Number` on submit.
- Changed or rejected: <...>

### 2. Saving every change on the server
- Asked: POST, PATCH and DELETE through one helper.
- Got: `request()` in `api.js` plus `createInterventie`, `updateInterventie`, `deleteInterventie`; `App` waits for the server and puts the object returned by the server in state.
- Changed or rejected: <...>

### 3. Automatic check
- Asked: what the checker needs.
- Got: `tw.json` (resource `interventii`, title `titlu`, done `efectuata`, sample values for the other form fields) and the `data-testid` attributes from table 7.3. The header first repeated the title of the next planned intervention, which put the same text twice on the page; it now shows the date and the car instead.
- Changed or rejected: <...>

## What I learned / what did not work
- Server first, then state: the id comes from the server, not from the frontend.
- `handleAdd` must not catch the error, so the form can show it and keep the typed text.
- <add your own notes>
