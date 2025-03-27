import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./db";
import routes from "./routes";
import path from "path";

dotenv.config(); // Load environment variables
connectDB(); // Connect to MongoDB

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json()); // For parsing JSON requests

// Routes
app.use("/api", routes);
app.use("/", express.static(path.join(__dirname, "public"))); // Serve the React app

// Start server
app.listen(PORT, () => {
	console.log(`Server running on http://localhost:${PORT}`);
});
