# Stage 8: AI log

## Tools
- Claude (claude.ai)

## Conversations
- <share link> (React Router, detail page, CSS Modules)

## Key requests

### 1. Routes and the common layout
- Asked: split the app into pages with React Router, following the stage 8 guide, with the detail route named after the resource in `tw.json`.
- Got: `BrowserRouter` in `main.jsx`, the route map in `App.jsx` (`/`, `/interventii/:id`, `/despre`, `*`), a `Layout` with `NavLink` (with `end` on the first link) and `<Outlet />`. The light/dark button moved into the layout, since the header is now shared by all pages. The list page got the state, effect and handlers that were in `App.jsx`.
- Changed or rejected: <...>

### 2. A detail page that shows more than the card
- Asked: the card already shows every field, so what can the detail page add?
- Got: how long until / since the intervention ("peste 19 zile"), and the history of the same car as a timeline, with the money spent on that car. It needs a second request, `fetchInterventiiMasina`, which depends on the first one (it needs the car), so both run one after the other in the same effect. If the second fails, the page still shows the intervention. The effect depends on `[id]`, so clicking an item of the history loads the new intervention without reloading the page.
- Changed or rejected: <...>

### 3. Moving the styles to CSS Modules
- Asked: move every component's rules into its own `.module.css` and keep in `index.css` only the variables and the shared classes.
- Got: one module per component and page; `index.css` keeps the variables (both themes), `body`, headings, `.panel`, `.btn`, `.btn-danger`, `.badge-*`, `.error`, `.info`, `.empty`. The submit button now uses the global `.btn`, and a `Link` can use it too.
- Changed or rejected: <...>

## What I learned / what did not work
- `useParams()` returns text: `"3"`, not `3`.
- Without `end`, the link to `/` stays active on every page.
- `<a href>` reloads the whole page and loses the state; `<Link to>` does not.
- <add your own notes>
