# Flight Controllers Monitor — Server

Express 5 + TypeScript + Mongoose 9. Requires Node.js 24+ and MongoDB 8.x.

## Development

```bash
npm ci
cp .env.example .env
npm run dev
```

Configure `MONGODB_URI` before starting. `npm run dev` watches TypeScript with `tsx`.

## Environment

- `MONGODB_URI`: required MongoDB connection string
- `MONGO_URI`: legacy fallback when `MONGODB_URI` is absent
- `PORT`: integer port, default `5000`
- `CLIENT_ORIGIN`: optional exact frontend origin for cross-origin deployments; same-origin deployments and the Vite proxy do not need it

The server waits for MongoDB before listening and exits unsuccessfully on startup errors. SIGINT/SIGTERM close the HTTP listener and database connection, with a 10-second shutdown deadline.

## API

- `GET /api`: `{ "message": "Flight Instruments API" }` (not a database readiness probe)
- `POST /api/flight`: JSON body with numeric `altitude` (0–3000), `his` (0–360), `adi` (−100–100)
  - 201: saved successfully
  - 400: invalid/missing data or malformed JSON
  - 413: JSON request exceeds 16 KB
  - 500: persistence failure; internal error details are not returned
- Unknown `/api` routes return JSON 404 responses.

There is no authentication or read/update/delete API. Do not expose this demonstration's write endpoint to untrusted clients without additional access controls.

## Production and tests

Run `npm run build` **from the repository root** to compile both projects and copy the frontend to `server/public`, then `npm start`.

Within this directory, `npm run build` compiles only the server; `npm start` runs `dist/index.js`. Static assets resolve to `server/public` in both development and production, independent of the working directory.

`npm test` runs validation and HTTP regression tests with mocked database writes, without needing MongoDB.
