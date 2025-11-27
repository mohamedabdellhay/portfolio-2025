// test-db-connection.js
import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error("❌ MONGODB_URI is not defined in .env");
  process.exit(1);
}

console.log("Attempting to connect to MongoDB...");

try {
  await mongoose.connect(MONGODB_URI);
  console.log("✅ Successfully connected to MongoDB!");
  console.log(`Connection state: ${mongoose.connection.readyState}`);
  await mongoose.disconnect();
  console.log("Disconnected.");
} catch (error) {
  console.error("❌ Connection failed:", error.message);
  process.exit(1);
}
