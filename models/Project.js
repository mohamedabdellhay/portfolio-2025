// models/Project.js
import mongoose from "mongoose";

const ProjectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  techStack: {
    type: [String],
    default: [],
  },
  github: {
    type: String,
    trim: true,
  },
  demo: {
    type: String,
    trim: true,
  },
  image: {
    type: String,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
}, { timestamps: true });

export default mongoose.models.Project || mongoose.model("Project", ProjectSchema);
