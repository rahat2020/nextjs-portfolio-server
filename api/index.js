import app from "../src/app.js";
import connectDB from "../src/config/db.js";

// Ensure database connection is established
let isDbConnected = false;

export default async function handler(req, res) {
  // Always allow CORS for preflight requests and error responses
  res.setHeader("Access-Control-Allow-Credentials", true);
  res.setHeader("Access-Control-Allow-Origin", req.headers.origin || "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS,PATCH,DELETE,POST,PUT");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization"
  );

  // Handle preflight OPTIONS request immediately
  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  // Connect to database if not connected
  if (!isDbConnected) {
    try {
      await connectDB();
      isDbConnected = true;
    } catch (err) {
      console.error("Vercel Serverless MongoDB Connection Error:", err);
      // In serverless, we shouldn't process.exit(1), just fail the request with 500
      return res.status(500).json({ success: false, message: "Database connection failed" });
    }
  }

  // Delegate the request to the Express app
  return app(req, res);
}
