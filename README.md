# State Machine Lab

A React and XState 5 learning project for exploring explicit UI states and asynchronous workflows. This repository contains experiments rather than a production-ready library.

## Examples in the navigation

- **Toggle** — Basic state transitions triggered by user interaction.
- **Retry Promise** — An asynchronous workflow with simulated failures, retry counting, and success/failure states. It also requests a random dog image from the Dog CEO API.
- **Cache** — A cache lookup example with hit/miss states and simulated data fetching.

Additional fetch and profile experiments are kept in `src/components/`; not all are connected to the navigation.

## Stack

React 18 · XState 5 · @xstate/react · Vite · Tailwind CSS · NextUI

## Run locally

```sh
npm install
npm run dev
```

## Available commands

```sh
npm run build
npm run preview
npm run lint
```

## Project structure

- `src/components/` — State machine examples and layout components.
- `src/context/NavigationContext.jsx` — Selected example state.
- `src/hooks/useNavigation.js` — Navigation context helper.

## Notes

Some examples deliberately simulate random failures. Retry and cache behavior is experimental; source inspection alone does not establish that every interaction works. The retry example also depends on an external API.
