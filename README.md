# Flight Controllers Monitor

A full-stack web application for monitoring and controlling flight instruments in real-time.

![Flight Controllers Monitor Preview](https://media.discordapp.net/attachments/996883728481652897/1354804015497482383/image.png?ex=67e69f10&is=67e54d90&hm=0f3a41e35c4e3cdfe399d1795d8a261fd4d3b0a1598317567f1675d87b00090e&=&format=webp&quality=lossless)

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
- Database with MongoDB

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