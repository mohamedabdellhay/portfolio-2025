// lib/db.js
// Initializes a Mongoose connection to MongoDB and exports a helper function.

import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/portfolio";

export async function connectDB() {
  if (mongoose.connection.readyState >= 1) {
    // Already connected
    return;
  }
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("✅ Connected to MongoDB");
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
    throw error;
  }
}

export default mongoose;
