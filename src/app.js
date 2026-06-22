import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import config from "./config/index.js";
import routes from "./routes/index.js";
import globalErrorHandler from "./middlewares/globalErrorHandler.js";
import notFound from "./middlewares/notFound.js";

const app = express();

/**
 * Global Middlewares
 */
// Set security HTTP headers
app.use(helmet());

// Development logging
if (config.env === "development") {
  app.use(morgan("dev"));
}

// Implement CORS
const allowedOrigins = config.clientUrl
  ? config.clientUrl.split(",").map((origin) => origin.trim())
  : ["http://localhost:3000", "http://localhost:5173"];

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  }),
);

// Body parser, reading data from body into req.body
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true, limit: "10kb" }));

/**
 * Health check
 */
app.get("/health", (req, res) => {
  res.status(200).json({ status: "OK", timestamp: new Date() });
});

// home route
app.get("/", (req, res) => {
  res.json({ success: true, message: "Welcome to the Portfolio Server API!" });
});

/**
 * Application Routes
 */
app.use("/api/v1", routes);

/**
 * Error Handling
 */
// Catch-all route for unmatched paths
app.use(notFound);

// Global Error Handler
app.use(globalErrorHandler);

export default app;
