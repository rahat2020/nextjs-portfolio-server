import AppError from "../utils/AppError.js";
import config from "../config/index.js";

/**
 * Global error handler middleware.
 * Distinguishes between operational (expected) and programming errors.
 */

// ─── Specific error formatters ──────────────────

/** Mongoose CastError (invalid ObjectId, etc.) */
const handleCastError = (err) =>
  new AppError(`Invalid ${err.path}: ${err.value}`, 400);

/** Mongoose duplicate key error */
const handleDuplicateField = (err) => {
  const field = Object.keys(err.keyValue)[0];
  return new AppError(`Duplicate value for "${field}". Please use another value.`, 409);
};

/** Mongoose validation error */
const handleValidationError = (err) => {
  const messages = Object.values(err.errors).map((e) => e.message);
  return new AppError(`Validation failed: ${messages.join(". ")}`, 400);
};

/** JWT invalid token */
const handleJWTError = () =>
  new AppError("Invalid token. Please log in again.", 401);

/** JWT expired */
const handleJWTExpiredError = () =>
  new AppError("Token has expired. Please log in again.", 401);

// ─── Main handler ───────────────────────────────

const globalErrorHandler = (err, _req, res, _next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  // In development, send full error details
  if (config.env === "development") {
    return res.status(err.statusCode).json({
      success: false,
      status: err.status,
      message: err.message,
      error: err,
      stack: err.stack,
    });
  }

  // In production, sanitize known errors
  let error = { ...err, message: err.message };

  if (err.name === "CastError") error = handleCastError(err);
  if (err.code === 11000) error = handleDuplicateField(err);
  if (err.name === "ValidationError") error = handleValidationError(err);
  if (err.name === "JsonWebTokenError") error = handleJWTError();
  if (err.name === "TokenExpiredError") error = handleJWTExpiredError();

  // Operational (trusted) errors → send message to client
  if (error.isOperational) {
    return res.status(error.statusCode).json({
      success: false,
      message: error.message,
    });
  }

  // Programming / unknown errors → don't leak details
  console.error("💥 UNEXPECTED ERROR:", err);
  return res.status(500).json({
    success: false,
    message: "Something went wrong",
  });
};

export default globalErrorHandler;
