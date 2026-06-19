import AppError from "../utils/AppError.js";

/**
 * 404 handler — catches any request that doesn't match a registered route.
 */
const notFound = (req, _res, next) => {
  next(new AppError(`Route not found: ${req.method} ${req.originalUrl}`, 404));
};

export default notFound;
