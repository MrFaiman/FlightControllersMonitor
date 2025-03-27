# Flight Controller Monitor - Client

A React-based web application for monitoring and controlling flight instruments.

## Overview

This application provides a visual interface for flight control instruments including:
- Altimeter (0-3000 ft)
- Compass/HIS (0-360°)
- Attitude Direction Indicator (-100 to +100)

## Tech Stack
- React + TypeScript
- Vite for build tooling
- CSS Modules for styling

## Key Components

### Instruments
- `Altimeter`: Displays current altitude
- `Compass`: Shows heading/direction
- `AttitudeIndicator`: Shows pitch

### UI Components
- `Button`: Reusable button component with various sizes and variants
- `Popup`: Control panel for adjusting instrument values
- `Dialog`: Modal dialog component
- `Input`: Reusable input component
- `Card`: Container component for grouping related content with consistent styling
- `Notification`: Toast notification component for displaying success/error messages

## State Management
Uses React Context and Reducer pattern for managing instrument states.

## Getting Started
```bash
git clone https://github.com/MrFaiman/FlightControllersMonitor.git FlightControllersMonitor
cd FlightControllersMonitor/client
npm install
npm run start
```