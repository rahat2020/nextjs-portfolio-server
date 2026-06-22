import dotenv from "dotenv";
dotenv.config();

/**
 * Centralized configuration object.
 * All environment variables are accessed from here — never directly from process.env elsewhere.
 */
const config = {
  env: process.env.NODE_ENV || "development",
  port: parseInt(process.env.PORT, 10) || 5000,

  // MongoDB
  mongoUri: `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.vatpd.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`,

  // JWT
  jwt: {
    secret: process.env.JWT_SECRET,
    expiresIn: process.env.JWT_EXPIRES_IN || "7d",
  },

  // Cloudinary
  cloudinary: {
    cloudName: process.env.CLOUDINARY_CLOUD_NAME,
    apiKey: process.env.CLOUDINARY_API_KEY,
    apiSecret: process.env.CLOUDINARY_API_SECRET,
  },

  // CORS
  clientUrl: process.env.CLIENT_URL || "http://localhost:3000",

  // Admin seed
  admin: {
    email: process.env.ADMIN_EMAIL || "admin@rahat.dev",
    password: process.env.ADMIN_PASSWORD || "Admin@123456",
  },
};

export default config;
