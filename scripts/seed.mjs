// scripts/seed.mjs
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import path from 'path';
import { fileURLToPath } from 'url';

// Load env vars
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error("❌ MONGODB_URI is not defined");
  process.exit(1);
}

// Define Schemas inline to avoid import issues with Next.js aliases in Node script
const ProjectSchema = new mongoose.Schema({
  title: String,
  description: String,
  techStack: [String],
  github: String,
  demo: String,
  image: String,
  createdAt: { type: Date, default: Date.now }
});

const SkillSchema = new mongoose.Schema({
  name: String,
  level: { type: String, enum: ["Beginner", "Intermediate", "Advanced"] },
  category: { type: String, enum: ["Frontend", "Backend", "Tools"] }
});

const AboutMeSchema = new mongoose.Schema({
  heading: String,
  content: String,
  avatar: String,
  updatedAt: { type: Date, default: Date.now }
});

const Project = mongoose.models.Project || mongoose.model("Project", ProjectSchema);
const Skill = mongoose.models.Skill || mongoose.model("Skill", SkillSchema);
const AboutMe = mongoose.models.AboutMe || mongoose.model("AboutMe", AboutMeSchema);

async function seed() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("✅ Connected to MongoDB");

    // Clear existing data
    await Project.deleteMany({});
    await Skill.deleteMany({});
    await AboutMe.deleteMany({});
    console.log("🧹 Cleared existing data");

    // Seed Projects
    await Project.create([
      {
        title: "E-Commerce Platform",
        description: "A full-featured online store with cart, checkout, and payment integration.",
        techStack: ["Next.js", "Stripe", "MongoDB", "TailwindCSS"],
        github: "https://github.com/example/ecommerce",
        demo: "https://ecommerce-demo.example.com",
        image: "https://images.unsplash.com/photo-1557821552-17105176677c?w=800&q=80"
      },
      {
        title: "Task Management App",
        description: "Collaborative task manager with real-time updates using Socket.io.",
        techStack: ["React", "Node.js", "Socket.io", "Express"],
        github: "https://github.com/example/taskmanager",
        demo: "https://taskmanager-demo.example.com",
        image: "https://images.unsplash.com/photo-1540350394557-8d14678e7f91?w=800&q=80"
      },
      {
        title: "Portfolio Website",
        description: "Personal portfolio website to showcase projects and skills.",
        techStack: ["Next.js", "TailwindCSS", "Framer Motion"],
        github: "https://github.com/example/portfolio",
        demo: "https://portfolio-demo.example.com",
        image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=800&q=80"
      }
    ]);
    console.log("🚀 Seeded Projects");

    // Seed Skills
    await Skill.create([
      { name: "React", level: "Advanced", category: "Frontend" },
      { name: "Next.js", level: "Advanced", category: "Frontend" },
      { name: "TailwindCSS", level: "Advanced", category: "Frontend" },
      { name: "Node.js", level: "Intermediate", category: "Backend" },
      { name: "Express", level: "Intermediate", category: "Backend" },
      { name: "MongoDB", level: "Intermediate", category: "Backend" },
      { name: "Docker", level: "Beginner", category: "Tools" },
      { name: "Git", level: "Advanced", category: "Tools" }
    ]);
    console.log("🚀 Seeded Skills");

    // Seed About Me
    await AboutMe.create({
      heading: "Hi, I'm Mohamed 👋",
      content: "I am a passionate Junior MERN Stack Developer with a strong foundation in web development. I love building scalable applications and learning new technologies. Currently, I am focusing on mastering Next.js and DevOps practices.\n\nWhen I'm not coding, you can find me exploring new tech trends or contributing to open source projects.",
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&q=80"
    });
    console.log("🚀 Seeded About Me");

    console.log("✅ Seeding completed successfully");
    process.exit(0);
  } catch (error) {
    console.error("❌ Seeding failed:", error);
    process.exit(1);
  }
}

seed();
