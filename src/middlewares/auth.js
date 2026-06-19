import jwt from "jsonwebtoken";
import AppError from "../utils/AppError.js";
import config from "../config/index.js";
import catchAsync from "../utils/catchAsync.js";

/**
 * Middleware to protect routes that require admin authentication.
 * Expects: Authorization: Bearer <token>
 */
const auth = catchAsync(async (req, _res, next) => {
  // 1. Extract token from header
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new AppError("You are not logged in. Please provide a valid token.", 401);
  }

  const token = authHeader.split(" ")[1];

  // 2. Verify token
  const decoded = jwt.verify(token, config.jwt.secret);

  // 3. Attach decoded payload to request
  req.user = decoded;

  next();
});

export default auth;
