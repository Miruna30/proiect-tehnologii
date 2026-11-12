# Stage 1: AI log

## Tools
- Claude (claude.ai)

## Conversations
- <share link> (choosing and extending the theme, HTML/CSS mockup)

## Key requests

### 1. Extending the theme
- Asked: how to turn a plain "car service history" into a richer app that still fits the course rules (a list of items with a name, a yes/no state, a fixed tag, a category and an owner).
- Got: the item becomes an *intervention*; the yes/no state means planned / done, so the same list is both the history and a planner for upcoming work. Extra fields: car, date, odometer, cost.
- Changed or rejected: <what I changed, e.g. the app name, the four types>

### 2. Mockup layout
- Asked: an HTML/CSS mockup with a header, an add form and three cards, two columns on desktop and one under 700px.
- Got: semantic HTML (header, main, section, footer), Grid for the two columns, Flexbox in the form and cards, colors only through CSS variables.
- Changed or rejected: <...>

## What I learned / what did not work
- Defining every color as a CSS variable makes the dark theme a matter of redefining variables, without touching the rules.
- The `@media (max-width: 700px)` rule must come after `.container`, otherwise it is overridden.
- <add your own notes>
