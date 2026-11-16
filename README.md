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

## Stage 8: routing and detail page

Four pages behind React Router, inside one common layout (header with
navigation, footer):

- `/` the list and the add form;
- `/interventii/:id` the detail page of one intervention, loaded from the API
  by its id; besides the fields of the card it shows how long until (or since)
  the intervention and the full history of the same car, with the money spent
  on it; the history items link to their own detail pages;
- `/despre` about the app;
- any other address shows the app's 404 page.

Component styles moved to CSS Modules (`*.module.css` next to each
component); `src/index.css` keeps only the color variables and the shared
classes. Fixed values and their labels live in `src/constants.js`.

## How to run

Requires Node.js 20.19 or newer.

    cd frontend
    npm install
    npm run api    # terminal 1, http://localhost:3001/interventii
    npm run dev    # terminal 2, http://localhost:5173

## Roadmap (next stages)

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
- [x] Stage 8: routing and detail page
- [ ] Stage 9: own backend with Express

## Checklists

Each requirement links to the exact lines of the commit in which it was done.

### Stage 1 checklist

| ID | Requirement | Where (permalink) | How to check |
| --- | --- | --- | --- |
| S1-R1 | README: description, fields, sample data, how to run | [README.md](https://github.com/Miruna30/proiect-tehnologii/blob/d5172a191d706c9afb8774198939e310ba5df367/README.md) | read |
| S1-R2 | AI usage section | [README.md#L54-L60](https://github.com/Miruna30/proiect-tehnologii/blob/d5172a191d706c9afb8774198939e310ba5df367/README.md#L54-L60) | read |
| S1-R3 | AI log for stage 1 | [ai-log/etapa-01.md](https://github.com/Miruna30/proiect-tehnologii/blob/d5172a191d706c9afb8774198939e310ba5df367/ai-log/etapa-01.md) | read |
| S1-R4 | header, form (text + select), 3 cards with own data | [index.html#L10-L79](https://github.com/Miruna30/proiect-tehnologii/blob/d5172a191d706c9afb8774198939e310ba5df367/index.html#L10-L79) | open the page |
| S1-R5 | finished card looks different | [style.css#L197-L205](https://github.com/Miruna30/proiect-tehnologii/blob/d5172a191d706c9afb8774198939e310ba5df367/style.css#L197-L205) | look at the card |
| S1-R6 | 2 columns on desktop, 1 under 700px | [style.css#L246-L250](https://github.com/Miruna30/proiect-tehnologii/blob/d5172a191d706c9afb8774198939e310ba5df367/style.css#L246-L250) | resize < 700px |
| S1-R7 | visible focus, readable dark theme | [style.css#L222-L229](https://github.com/Miruna30/proiect-tehnologii/blob/d5172a191d706c9afb8774198939e310ba5df367/style.css#L222-L229) |  Tab; dark mode |
| S1-R8 | commit "Stage 1" pushed | [d5172a1](https://github.com/Miruna30/proiect-tehnologii/commit/d5172a191d706c9afb8774198939e310ba5df367) | commit history |


### Stage 2 checklist

| ID | Requirement | Where (permalink) | How to check |
| --- | --- | --- | --- |
| S2-R1 | JS file linked, logs on page load | [index.html#L83](https://github.com/Miruna30/proiect-tehnologii/blob/bf81e6a765a6d8fe22e0cadb53315340a3b6f445/index.html#L83) | open page, F12 |
| S2-R2 | 3+ items with id, name, state, tag | [interventii.js#L5-L36](https://github.com/Miruna30/proiect-tehnologii/blob/bf81e6a765a6d8fe22e0cadb53315340a3b6f445/interventii.js#L5-L36) | read |
| S2-R3 | list, count, search, add, toggle, delete | [interventii.js#L43-L121](https://github.com/Miruna30/proiect-tehnologii/blob/bf81e6a765a6d8fe22e0cadb53315340a3b6f445/interventii.js#L43-L121) | console output |
| S2-R4 | add rejects empty name and invalid tag | [interventii.js#L79-L91](https://github.com/Miruna30/proiect-tehnologii/blob/bf81e6a765a6d8fe22e0cadb53315340a3b6f445/interventii.js#L79-L91) | last 4 console lines |
| S2-R5 | original array unchanged after add | [interventii.js#L146](https://github.com/Miruna30/proiect-tehnologii/blob/bf81e6a765a6d8fe22e0cadb53315340a3b6f445/interventii.js#L146) | console line |
| S2-R6 | README Stage 2 section + AI log | [README.md#L50-L56](https://github.com/Miruna30/proiect-tehnologii/blob/bf81e6a765a6d8fe22e0cadb53315340a3b6f445/README.md#L50-L56), [ai-log/etapa-02.md](https://github.com/Miruna30/proiect-tehnologii/blob/bf81e6a765a6d8fe22e0cadb53315340a3b6f445/ai-log/etapa-02.md) | read |
| S2-R7 | commit "Stage 2" pushed | [bf81e6a](https://github.com/Miruna30/proiect-tehnologii/commit/bf81e6a765a6d8fe22e0cadb53315340a3b6f445) | commit history |


### Stage 3 checklist

| ID | Requirement | Where (permalink) | How to check |
| --- | --- | --- | --- |
| S3-R1 | npm run dev starts without errors | [frontend/package.json](https://github.com/Miruna30/proiect-tehnologii/blob/7ee587c8dd0170a1eec6993c0e1ad20e8fb4d66e/frontend/package.json) | npm install, npm run dev |
| S3-R2 | app name and counter computed from data | [App.jsx#L37-L47](https://github.com/Miruna30/proiect-tehnologii/blob/7ee587c8dd0170a1eec6993c0e1ad20e8fb4d66e/frontend/src/App.jsx#L37-L47) | edit data, save |
| S3-R3 | data from README, not from the example | [App.jsx#L2-L33](https://github.com/Miruna30/proiect-tehnologii/blob/7ee587c8dd0170a1eec6993c0e1ad20e8fb4d66e/frontend/src/App.jsx#L2-L33) | compare with README |
| S3-R4 | stage 1 styles reused | [frontend/src/App.css](https://github.com/Miruna30/proiect-tehnologii/blob/7ee587c8dd0170a1eec6993c0e1ad20e8fb4d66e/frontend/src/App.css) | look at the page |
| S3-R5 | node_modules ignored, build passes | [.gitignore#L10-L11](https://github.com/Miruna30/proiect-tehnologii/blob/7ee587c8dd0170a1eec6993c0e1ad20e8fb4d66e/frontend/.gitignore#L10-L11) | npm run build |
| S3-R6 | README Stage 3 section + AI log | [README.md#L58-L62](https://github.com/Miruna30/proiect-tehnologii/blob/7ee587c8dd0170a1eec6993c0e1ad20e8fb4d66e/README.md#L58-L62), [ai-log/etapa-03.md](https://github.com/Miruna30/proiect-tehnologii/blob/7ee587c8dd0170a1eec6993c0e1ad20e8fb4d66e/ai-log/etapa-03.md) | read |
| S3-R7 | commit "Stage 3" pushed | [7ee587c](https://github.com/Miruna30/proiect-tehnologii/commit/7ee587c8dd0170a1eec6993c0e1ad20e8fb4d66e) | commit history |


### Stage 4 checklist

| ID | Requirement | Where (permalink) | How to check |
| --- | --- | --- | --- |
| S4-R1 | 2+ components in src/components/ | [frontend/src/components/](https://github.com/Miruna30/proiect-tehnologii/tree/f161ac1e8022aa4eeb882b2c6354ee955ccbaba6/frontend/src/components) | open folder |
| S4-R2 | card receives data through props | [InterventieCard.jsx#L12-L30](https://github.com/Miruna30/proiect-tehnologii/blob/f161ac1e8022aa4eeb882b2c6354ee955ccbaba6/frontend/src/components/InterventieCard.jsx#L12-L30) | read |
| S4-R3 | map + key={id}, no console warnings | [InterventieList.jsx#L12-L14](https://github.com/Miruna30/proiect-tehnologii/blob/f161ac1e8022aa4eeb882b2c6354ee955ccbaba6/frontend/src/components/InterventieList.jsx#L12-L14) | F12, Console |
| S4-R4 | message for empty list | [InterventieList.jsx#L6-L8](https://github.com/Miruna30/proiect-tehnologii/blob/f161ac1e8022aa4eeb882b2c6354ee955ccbaba6/frontend/src/components/InterventieList.jsx#L6-L8) | set array to [] |
| S4-R5 | state changes the card look | [InterventieCard.jsx#L14](https://github.com/Miruna30/proiect-tehnologii/blob/f161ac1e8022aa4eeb882b2c6354ee955ccbaba6/frontend/src/components/InterventieCard.jsx#L14) | toggle a done flag |
| S4-R6 | README Stage 4 section + AI log | [README.md#L64-L71](https://github.com/Miruna30/proiect-tehnologii/blob/f161ac1e8022aa4eeb882b2c6354ee955ccbaba6/README.md#L64-L71), [ai-log/etapa-04.md](https://github.com/Miruna30/proiect-tehnologii/blob/f161ac1e8022aa4eeb882b2c6354ee955ccbaba6/ai-log/etapa-04.md) | read |
| S4-R7 | commit "Stage 4" pushed | [f161ac1](https://github.com/Miruna30/proiect-tehnologii/commit/f161ac1e8022aa4eeb882b2c6354ee955ccbaba6) | commit history |


### Stage 5 checklist

| ID | Requirement | Where (permalink) | How to check |
| --- | --- | --- | --- |
| S5-R1 | list kept in useState, in App | [App.jsx#L47](https://github.com/Miruna30/proiect-tehnologii/blob/e162ae608e7277fb402fc569373e7af5fac68d7f/frontend/src/App.jsx#L47) | read |
| S5-R2 | toggling changes state and card look | [App.jsx#L51-L55](https://github.com/Miruna30/proiect-tehnologii/blob/e162ae608e7277fb402fc569373e7af5fac68d7f/frontend/src/App.jsx#L51-L55), [InterventieCard.jsx#L18-L21](https://github.com/Miruna30/proiect-tehnologii/blob/e162ae608e7277fb402fc569373e7af5fac68d7f/frontend/src/components/InterventieCard.jsx#L18-L21) | click a checkbox |
| S5-R3 | delete removes the item | [App.jsx#L57-L59](https://github.com/Miruna30/proiect-tehnologii/blob/e162ae608e7277fb402fc569373e7af5fac68d7f/frontend/src/App.jsx#L57-L59), [InterventieCard.jsx#L38-L44](https://github.com/Miruna30/proiect-tehnologii/blob/e162ae608e7277fb402fc569373e7af5fac68d7f/frontend/src/components/InterventieCard.jsx#L38-L44) | click Șterge |
| S5-R4 | header counter derived, not in state | [App.jsx#L73-L77](https://github.com/Miruna30/proiect-tehnologii/blob/e162ae608e7277fb402fc569373e7af5fac68d7f/frontend/src/App.jsx#L73-L77) | toggle, watch header |
| S5-R5 | immutable updates (no push, splice, assignment) | [App.jsx#L51-L57](https://github.com/Miruna30/proiect-tehnologii/blob/e162ae608e7277fb402fc569373e7af5fac68d7f/frontend/src/App.jsx#L51-L57) | read |
| S5-R6 | light / dark toggle: state + data-theme on html | [App.jsx#L62-L71](https://github.com/Miruna30/proiect-tehnologii/blob/e162ae608e7277fb402fc569373e7af5fac68d7f/frontend/src/App.jsx#L62-L71), [App.css#L231-L262](https://github.com/Miruna30/proiect-tehnologii/blob/e162ae608e7277fb402fc569373e7af5fac68d7f/frontend/src/App.css#L231-L262) | click the button, both system themes |
| S5-R7 | no console warnings; README + AI log | [README.md#L73-L80](https://github.com/Miruna30/proiect-tehnologii/blob/e162ae608e7277fb402fc569373e7af5fac68d7f/README.md#L73-L80), [ai-log/etapa-05.md](https://github.com/Miruna30/proiect-tehnologii/blob/e162ae608e7277fb402fc569373e7af5fac68d7f/ai-log/etapa-05.md) | F12, Console |
| S5-R8 | commit "Stage 5" pushed | [e162ae6](https://github.com/Miruna30/proiect-tehnologii/commit/e162ae608e7277fb402fc569373e7af5fac68d7f) | commit history |


### Stage 6 checklist

| ID | Requirement | Where (permalink) | How to check |
| --- | --- | --- | --- |
| S6-R1 | npm run api starts, route shows JSON | [package.json#L11](https://github.com/Miruna30/proiect-tehnologii/blob/736278a6917b690866ef96d3715b4399cceddd71/frontend/package.json#L11), [frontend/db.json](https://github.com/Miruna30/proiect-tehnologii/blob/736278a6917b690866ef96d3715b4399cceddd71/frontend/db.json) | open localhost:3001/interventii |
| S6-R2 | data no longer in React code | [App.jsx#L15](https://github.com/Miruna30/proiect-tehnologii/blob/736278a6917b690866ef96d3715b4399cceddd71/frontend/src/App.jsx#L15) | read |
| S6-R3 | loading message while waiting | [App.jsx#L93](https://github.com/Miruna30/proiect-tehnologii/blob/736278a6917b690866ef96d3715b4399cceddd71/frontend/src/App.jsx#L93) | --delay 4000 |
| S6-R4 | error message when API is down | [App.jsx#L94-L98](https://github.com/Miruna30/proiect-tehnologii/blob/736278a6917b690866ef96d3715b4399cceddd71/frontend/src/App.jsx#L94-L98) | stop npm run api, refresh |
| S6-R5 | fetch only in api.js, URL from env | [api.js#L2-L10](https://github.com/Miruna30/proiect-tehnologii/blob/736278a6917b690866ef96d3715b4399cceddd71/frontend/src/api.js#L2-L10), [frontend/.env.example](https://github.com/Miruna30/proiect-tehnologii/blob/736278a6917b690866ef96d3715b4399cceddd71/frontend/.env.example) | search for fetch |
| S6-R6 | README Stage 6 section + AI log | [README.md#L82-L87](https://github.com/Miruna30/proiect-tehnologii/blob/736278a6917b690866ef96d3715b4399cceddd71/README.md#L82-L87), [ai-log/etapa-06.md](https://github.com/Miruna30/proiect-tehnologii/blob/736278a6917b690866ef96d3715b4399cceddd71/ai-log/etapa-06.md) | read |
| S6-R7 | commit "Stage 6" pushed | [736278a](https://github.com/Miruna30/proiect-tehnologii/commit/736278a6917b690866ef96d3715b4399cceddd71) | commit history |


### Stage 7 checklist

| ID | Requirement | Where (permalink) | How to check |
| --- | --- | --- | --- |
| S7-R1 | controlled form: value + onChange on every field | [InterventieForm.jsx#L63-L152](https://github.com/Miruna30/proiect-tehnologii/blob/d6ecce81af7ba7d1945ee5bd0c37df04f59b63e6/frontend/src/components/InterventieForm.jsx#L63-L152) | read |
| S7-R2 | empty title shows an error, nothing is sent | [InterventieForm.jsx#L39-L42](https://github.com/Miruna30/proiect-tehnologii/blob/d6ecce81af7ba7d1945ee5bd0c37df04f59b63e6/frontend/src/components/InterventieForm.jsx#L39-L42), [validare.js#L16-L31](https://github.com/Miruna30/proiect-tehnologii/blob/d6ecce81af7ba7d1945ee5bd0c37df04f59b63e6/frontend/src/validare.js#L16-L31) | submit empty, watch Network |
| S7-R3 | added item shows in the list and survives refresh | [App.jsx#L54-L57](https://github.com/Miruna30/proiect-tehnologii/blob/d6ecce81af7ba7d1945ee5bd0c37df04f59b63e6/frontend/src/App.jsx#L54-L57), [api.js#L21-L23](https://github.com/Miruna30/proiect-tehnologii/blob/d6ecce81af7ba7d1945ee5bd0c37df04f59b63e6/frontend/src/api.js#L21-L23) | add, refresh |
| S7-R4 | toggle and delete survive refresh | [App.jsx#L59-L76](https://github.com/Miruna30/proiect-tehnologii/blob/d6ecce81af7ba7d1945ee5bd0c37df04f59b63e6/frontend/src/App.jsx#L59-L76) | toggle/delete, refresh |
| S7-R5 | button disabled while sending, form cleared only on success | [InterventieForm.jsx#L46-L58](https://github.com/Miruna30/proiect-tehnologii/blob/d6ecce81af7ba7d1945ee5bd0c37df04f59b63e6/frontend/src/components/InterventieForm.jsx#L46-L58) | --delay 3000; stop API and submit |
| S7-R6 | tw.json and the data-testid attributes from table 7.3 | [tw.json](https://github.com/Miruna30/proiect-tehnologii/blob/d6ecce81af7ba7d1945ee5bd0c37df04f59b63e6/tw.json), [InterventieCard.jsx#L15-L18](https://github.com/Miruna30/proiect-tehnologii/blob/d6ecce81af7ba7d1945ee5bd0c37df04f59b63e6/frontend/src/components/InterventieCard.jsx#L15-L18) | querySelectorAll in the console |
| S7-R7 | README Stage 7 section + AI log | [README.md#L89-L101](https://github.com/Miruna30/proiect-tehnologii/blob/d6ecce81af7ba7d1945ee5bd0c37df04f59b63e6/README.md#L89-L101), [ai-log/etapa-07.md](https://github.com/Miruna30/proiect-tehnologii/blob/d6ecce81af7ba7d1945ee5bd0c37df04f59b63e6/ai-log/etapa-07.md) | read |
| S7-R8 | commit "Stage 7" pushed | [d6ecce8](https://github.com/Miruna30/proiect-tehnologii/commit/d6ecce81af7ba7d1945ee5bd0c37df04f59b63e6) | commit history |

