# Flight Controller Monitor - Server

Express.js backend server for the Flight Controller Monitor application.

## Overview

Provides API endpoints for managing flight control data and instrument states.

## Tech Stack
- Node.js + Express
- TypeScript
- MongoDB

## API Routes

### Base URL
All routes are prefixed with `/api`

### Endpoints
- GET `/`: Static file serving for the client application
- GET `/api`: API Health check

### Flight Data Endpoints
- POST `/api/flight`: Create new flight data
  - Body: `{ altitude: number, his: number, adi: number }`

## Environment Variables
Required environment variables (see `.env.example`):
- `PORT`: Server port (default: 5000)
- `MONGODB_URI`: MongoDB connection string

## Getting Started
```bash
git clone https://github.com/MrFaiman/FlightControllersMonitor.git FlightControllersMonitor
cd FlightControllersMonitor/server
npm install
npm run start
```