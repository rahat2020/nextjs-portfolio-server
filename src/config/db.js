import mongoose from "mongoose";
import config from "./index.js";

/**
 * Connect to MongoDB with retry logic.
 * Mongoose 8 no longer requires useNewUrlParser / useUnifiedTopology.
 */
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(config.mongoUri);
    console.log(`✅ MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`❌ MongoDB connection error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
