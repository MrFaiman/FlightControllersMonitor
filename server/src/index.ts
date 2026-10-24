import "dotenv/config";
import mongoose from "mongoose";
import { app } from "./app.js";
import connectDB from "./db.js";

const port = Number(process.env.PORT ?? 5000);
if (!Number.isInteger(port) || port < 1 || port > 65535) {
  throw new Error("PORT must be an integer between 1 and 65535");
}

try {
  await connectDB();
  const server = app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  });
  server.on("error", (error) => {
    console.error("HTTP server error:", error);
    void mongoose.disconnect().finally(() => process.exit(1));
  });

  let closing = false;
  const shutdown = () => {
    if (closing) return;
    closing = true;
    const timeout = setTimeout(() => process.exit(1), 10_000);
    timeout.unref();
    server.close(() => {
      void mongoose.disconnect().then(() => {
        clearTimeout(timeout);
      }).catch((error) => {
        console.error("Shutdown error:", error);
        process.exitCode = 1;
      });
    });
  };
  process.on("SIGTERM", shutdown);
  process.on("SIGINT", shutdown);
} catch (error) {
  console.error("Startup failed:", error);
  process.exitCode = 1;
}
