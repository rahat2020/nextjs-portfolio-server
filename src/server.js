import http from "http";
import app from "./app.js";
import connectDB from "./config/db.js";
import config from "./config/index.js";
import { initSocket } from "./socket/index.js";

/**
 * Handle Uncaught Exceptions
 */
process.on("uncaughtException", (err) => {
  console.log("💥 UNCAUGHT EXCEPTION! Shutting down...");
  console.log(err.name, err.message);
  process.exit(1);
});

/**
 * Database Connection & Server Start
 */
const startServer = async () => {
  try {
    // 1. Connect to MongoDB
    await connectDB();

    // 2. Start Express app (wrapped in a raw HTTP server so Socket.io can attach to it)
    const httpServer = http.createServer(app);
    initSocket(httpServer);

    const server = httpServer.listen(config.port, () => {
      console.log(`🚀 Server listening on http://localhost:${config.port}`);
    });

    /**
     * Handle Unhandled Promise Rejections
     */
    process.on("unhandledRejection", (err) => {
      console.log("💥 UNHANDLED REJECTION! Shutting down...");
      console.log(err.name, err.message);
      server.close(() => {
        process.exit(1);
      });
    });
  } catch (err) {
    console.error(`💥 Server startup failed: ${err.message}`);
    process.exit(1);
  }
};

startServer();
