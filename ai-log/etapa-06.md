# Stage 6: AI log

## Tools
- Claude (claude.ai)

## Conversations
- <share link> (json-server, fetch, useEffect)

## Key requests

### 1. Moving the data to a mock API
- Asked: put the interventions in `db.json` and serve them with json-server 0.17.4.
- Got: `db.json` with 7 interventions for 3 cars (both states, all four types), the `api` script in `package.json`, `src/api.js` with `fetchInterventii` checking `res.ok`, and `.env.example` for `VITE_API_URL`.
- Changed or rejected: <...>

### 2. Loading and error states
- Asked: what the page should show while waiting and when the API is stopped.
- Got: `loading` and `error` states, loaded in a `useEffect` with `[]` and an `ignore` flag for the cleanup; a message that also says what to do (`npm run api`).
- Changed or rejected: <...>

## What I learned / what did not work
- `fetch` does not throw on 404/500, so `res.ok` must be checked.
- In development React mounts the component twice, so two requests appear in the Network tab; `ignore` prevents a stale update.
- <add your own notes>
