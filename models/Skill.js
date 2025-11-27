// models/Skill.js
import mongoose from "mongoose";

const SkillSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  level: {
    type: String,
    enum: ["Beginner", "Intermediate", "Advanced"],
    required: true,
  },
  category: {
    type: String,
    enum: ["Frontend", "Backend", "Tools"],
    required: true,
  },
}, { timestamps: true });

export default mongoose.models.Skill || mongoose.model("Skill", SkillSchema);
