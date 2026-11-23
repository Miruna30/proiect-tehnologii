# Stage 2: AI log

## Tools
- Claude (claude.ai)

## Conversations
- https://claude.ai/share/1c94be22-26aa-4c9c-b588-42ff49feb2f3

## Key requests

### 1. Functions on the list of interventions
- Asked: the stage 2 functions (list, count, search, add with validation, toggle, delete) adapted to interventions.
- Got: immutable functions with `map`, `filter`, `find`, `reduce`; search by title *or* car; an extra `costTotal` that sums only the done interventions.
- Changed or rejected: <...>

### 2. Validation of the extra fields
- Asked: what to validate besides the empty title and the fixed tag.
- Got: title max 100 chars, car required, valid date, odometer an integer between 0 and 2,000,000, cost not negative. `valideazaInterventie` returns the message, so the same rules can be reused in the React form.
- Changed or rejected: <...>

## What I learned / what did not work
- `lista.length + 1` gives duplicate ids after a delete; the max id + 1 does not.
- `[...lista, nou]` and `{ ...i, efectuata: !i.efectuata }` build new data instead of changing the old one.
- <add your own notes>
