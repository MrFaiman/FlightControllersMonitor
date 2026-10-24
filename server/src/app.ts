import express, { type ErrorRequestHandler } from "express";
import cors from "cors";
import { fileURLToPath } from "node:url";
import routes from "./routes/index.js";

export const app = express();
app.disable("x-powered-by");
// Same-origin requests need no CORS headers. Opt in for a separate frontend.
if (process.env.CLIENT_ORIGIN) {
  app.use(cors({ origin: process.env.CLIENT_ORIGIN }));
}
app.use(express.json({ limit: "16kb" }));
app.use("/api", routes);
app.use("/api", (_req, res) => {
  res.status(404).json({ message: "API endpoint not found" });
});
app.use(express.static(fileURLToPath(new URL("../public/", import.meta.url))));

const errorHandler: ErrorRequestHandler = (error, _req, res, _next) => {
  const status = error?.status === 400 ? 400 : error?.status === 413 ? 413 : 500;
  if (status === 500) console.error(error);
  res.status(status).json({
    message: status === 400 ? "Invalid JSON body" : status === 413 ? "Request body too large" : "Internal server error",
  });
};
app.use(errorHandler);
