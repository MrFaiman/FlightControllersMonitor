# Flight Controllers Monitor

A full-stack instrument dashboard built with React 19, TypeScript, Vite 8, Express 5, and Mongoose 9.

- Altimeter: 0–3000 ft
- Heading/HIS compass: 0–360°
- Attitude Direction Indicator: −100 to +100
- Visual and text displays, local instrument controls, and persistence to MongoDB

This is a demonstration application, **not certified flight instrumentation**. It does not connect to aircraft hardware or stream telemetry.

## Requirements

- Node.js 24 LTS or newer (`nvm use` selects Node 24)
- npm
- MongoDB 8.x, locally or through a hosted connection string

Dependencies use published, compatible stable releases; the project does not assume unreleased 2027 APIs. TypeScript stays on 6.0 while the ESLint TypeScript integration requires `<6.1`. Dependabot checks dependencies and CI actions weekly.

## Quick start

From the repository root:

```bash
npm run setup
cp server/.env.example server/.env
```

Set `MONGODB_URI` in `server/.env` and start MongoDB. Then run these in separate terminals:

```bash
npm run dev:server
npm run dev:client
```

Open the URL printed by Vite (normally `http://localhost:5173`). Vite proxies `/api` to `http://localhost:5000`; change the proxy in `client/vite.config.ts` if you change the backend port.

## Checks

```bash
npm run check
```

Runs client linting, client/API regression tests, and both production builds. API tests mock database writes and do not require MongoDB. CI repeats these checks on Node 24 and 26 and audits production dependencies.

## Production

```bash
npm run build
npm start
```

The build compiles the server and copies the frontend into `server/public`. The server serves the UI and API together at `http://localhost:5000`. Startup waits for MongoDB; shutdown closes HTTP connections and disconnects from the database.

Set `MONGODB_URI` and optionally `PORT` through your deployment environment or `server/.env`. Production runs compiled JavaScript, not a TypeScript development runner.

This demo has no authentication. Keep it on a trusted network; add authentication, TLS, and request rate limits before exposing write endpoints to the internet. CORS is not an authorization mechanism.

## Structure

- [`client/`](./client/README.md): React UI, instrument canvases, context/reducer state, API client
- [`server/`](./server/README.md): Express API, validation, MongoDB model, startup/shutdown
- `scripts/`: portable production asset copying
- `.github/`: CI and automated dependency updates

## API

- `GET /api`: API identification (not a database readiness probe)
- `POST /api/flight`: persist `{ "altitude": 1700, "his": 45, "adi": 50 }`

Send `Content-Type: application/json`. Values must be finite numbers within the instrument ranges. Successful writes return HTTP 201; invalid data returns 400. There is no read/update/delete API or live telemetry transport.
