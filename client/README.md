# Flight Controllers Monitor — Client

React 19 + TypeScript + Vite 8, with CSS Modules and context/reducer state. Requires Node.js 24+.

## Development

```bash
npm ci
npm run dev
```

Run the backend separately (see [`../server/README.md`](../server/README.md)). Vite proxies `/api` to `http://localhost:5000`. API requests remain same-origin in production.

## Commands

- `npm run dev`: development server, normally on port 5173
- `npm run lint`: ESLint and React Hooks checks
- `npm test`: UI and API-client regression tests
- `npm run build`: TypeScript checks and production output in `dist`
- `npm run preview`: preview `dist` locally; this does not start a backend or proxy API requests

For a complete production deployment, run `npm run build` and `npm start` from the repository root.

## Instruments

- Altimeter: 0–3000 ft
- Compass/HIS: 0–360°
- Attitude Direction Indicator: −100 to +100

Use Text/Visual to switch displays and `+` to open the data-entry dialog. Local instrument state uses React Context + Reducer. Sending data posts a JSON snapshot to `/api/flight`; failed HTTP responses produce error notifications rather than false success confirmations. This is a demonstration, not flight-certified instrumentation.
