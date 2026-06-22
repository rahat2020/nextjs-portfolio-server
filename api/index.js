import app from "../src/app.js";
import connectDB from "../src/config/db.js";

// Ensure database connection is established
let isDbConnected = false;

export default async function handler(req, res) {
  if (!isDbConnected) {
    try {
      await connectDB();
      isDbConnected = true;
    } catch (err) {
      console.error("Vercel Serverless MongoDB Connection Error:", err);
      // In serverless, we shouldn't process.exit(1), just fail the request
      return res.status(500).json({ success: false, message: "Database connection failed" });
    }
  }

  // Delegate the request to the Express app
  return app(req, res);
}
