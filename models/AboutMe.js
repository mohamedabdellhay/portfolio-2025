// models/AboutMe.js
import mongoose from "mongoose";

const AboutMeSchema = new mongoose.Schema({
  heading: {
    type: String,
    required: true,
    trim: true,
  },
  content: {
    type: String,
    required: true,
    trim: true,
  },
  avatar: {
    type: String,
    trim: true,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
}, { timestamps: true });

export default mongoose.models.AboutMe || mongoose.model("AboutMe", AboutMeSchema);
