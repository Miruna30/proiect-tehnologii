# AutoJurnal

A service log for your cars: it keeps the full history of every intervention
(maintenance, repairs, diagnostics, inspections) and also the ones that are
still planned, so you know what was done, what comes next and how much it cost.

## Idea

Most people keep their car's service history on paper receipts, if at all.
AutoJurnal turns it into one list of **interventions**. Each intervention is
either **planned** (scheduled for a future date) or **done** (part of the
history). On top of the plain history, the app is meant to grow into:

- a planner for upcoming work (oil change, timing belt, periodic inspection);
- cost tracking per car and per year;
- several cars per user (a family "garage");
- reminders for periodic deadlines (inspection, oil change every N km).

## Data model

An item of the list is an **intervention** (`interventie`).

| Field       | Type         | Notes                                                       |
| ----------- | ------------ | ----------------------------------------------------------- |
| `titlu`     | text         | required, max 100 chars, e.g. "Schimb ulei și filtre"       |
| `efectuata` | boolean      | toggled from the list, default false: Programată / Efectuată |
| `tip`       | fixed values | `revizie`, `reparatie`, `diagnoza`, `inspectie`             |
| `masina`    | text         | required, the car, e.g. "VW Golf 7 · B 77 MRP"              |
| `data`      | date         | required, the date it was done or is scheduled              |
| `km`        | number       | odometer reading, 0 – 2,000,000                             |
| `cost`      | number       | price in lei, 0 or more                                     |
| `categorie` | relation     | Motor, Frânare, Suspensie, Electrică, Caroserie (week 10)   |
| user        | relation     | the owner of the car (from week 11)                         |

Fixed values shown in the UI:

| Value       | Label      |
| ----------- | ---------- |
| `revizie`   | Revizie    |
| `reparatie` | Reparație  |
| `diagnoza`  | Diagnoză   |
| `inspectie` | Inspecție  |

Sample data used across all stages:

1. Schimb ulei și filtre, planned, revizie (VW Golf 7, 05.12.2026, 152,000 km, 650 lei)
2. Înlocuire plăcuțe frână față, done, reparatie (VW Golf 7, 14.10.2026, 149,800 km, 420 lei)
3. Inspecție tehnică periodică (ITP), planned, inspectie (Dacia Logan, 20.01.2027, 98,000 km, 180 lei)

## Stage 2: data logic

Plain JavaScript, no DOM. `interventii.js` holds the array and the functions
that read and change it: list titles, count planned items, search by title or
car, total cost of done work, add with validation, toggle and delete. Every
function returns a new list and never changes the one it receives. Results are
printed in the browser console (F12).

## Stage 3: Vite and React project

The app now lives in `frontend/`, built with Vite. The data from stage 2
moved into the main component; the list is still printed raw. The static
mockup from stages 1 and 2 is kept in `mockup/`.

## Stage 4: components

The list is rendered from the data, through two components:

- `InterventieList` receives the whole array and renders one card per item
  (or a message when the list is empty)
- `InterventieCard` receives a single intervention through props and displays
  it: title, type badge, car, date, odometer, cost and state

## Stage 5: local state and events

The list lives in React state. Marking an intervention as done and deleting it
work from the page, and the header (counter and money spent on done work)
follows automatically, because both are derived values. A button in the header
switches between light and dark mode; the choice is remembered in
`localStorage`. List changes are lost on refresh, which is what stage 6 and
stage 10 fix.

## Stage 6: data from a mock API

The interventions are served by json-server from `frontend/db.json`
(resource `interventii`). The app fetches them on load and shows a loading
state and an error state. All requests live in `src/api.js`; the API address
comes from the `VITE_API_URL` variable (see `.env.example`).

## Stage 7: form and validation

Interventions can be added from the page. The form is controlled and validated
(`src/validare.js`: required title, max 100 chars, a type from the list,
required car, valid date, odometer between 0 and 2,000,000, cost not
negative), and every change (add, toggle, delete) goes to the API before it
shows up in the list, so everything survives a refresh. Extras:

- the list can be filtered by state (all / planned / done), by car and by title;
- the car field suggests the cars already in the list;
- the header shows the money spent on done work and the next planned date.

`tw.json` and the `data-testid` attributes are used by the automatic check.

## How to run

Requires Node.js 20.19 or newer.

    cd frontend
    npm install
    npm run api    # terminal 1, http://localhost:3001/interventii
    npm run dev    # terminal 2, http://localhost:5173

## Roadmap (next stages)

- **Stage 8, routing:** a detail page per intervention (`/interventii/:id`)
  and a page per car with its full history and total cost.
- **Stage 9, own server:** a Node.js API replacing json-server.
- **Stage 10, database:** interventions saved in a database; the category
  (Motor, Frânare, Suspensie, Electrică, Caroserie) becomes a related table.
- **Stage 11, authentication:** each user sees only their own cars.
- **Later ideas:** reminders for periodic deadlines (inspection, insurance,
  oil change every 15,000 km), cost per year chart.

## AI usage

| Tool   | Used for                                                                 |
| ------ | ------------------------------------------------------------------------ |
| Claude | developing the theme, generating the code of each stage, explanations   |

Details per stage: see the ai-log/ folder.

## Status

- [x] Stage 1: static mockup
- [x] Stage 2: data logic in JavaScript
- [x] Stage 3: Vite and React project
- [x] Stage 4: components rendered from data
- [x] Stage 5: local state and events
- [x] Stage 6: data from a mock API
- [x] Stage 7: form and validation
- [ ] Stage 8: routing and detail page
