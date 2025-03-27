# Flight Controllers Monitor

A full-stack web application for monitoring and controlling flight instruments in real-time.

## Project Structure

This project consists of two main parts:

### Client (/client)
React-based frontend application providing visual interfaces for:
- Altimeter (0-3000 ft)
- Heading/HSI Compass (0-360°)
- Attitude Direction Indicator (-100 to +100)

[More details in client README](./client/README.md)

### Server (/server)
Express.js backend providing REST API endpoints for:
- Creating and managing flight data
- Real-time instrument state updates
- Data persistence with MongoDB

[More details in server README](./server/README.md)

## Tech Stack
- Frontend: React, TypeScript, Vite
- Backend: Node.js, Express, TypeScript
- Database: MongoDB
- State Management: React Context + Reducer

## Deployment

To deploy the application:

1. Build the client:
```bash
cd client
npm run build
```

2. Move built files to server:
```bash
mkdir -p ../server/public
cp -r dist/* ../server/public/
```

3. Start the server:
```bash
cd ../server
npm start
```

The application will be available at:
- Web Interface: `http://localhost:5000`
- API Endpoints: `http://localhost:5000/api/*`

This deployment method serves both the static frontend and API endpoints from a single Express server.