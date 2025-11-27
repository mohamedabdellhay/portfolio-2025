// app/skills/page.jsx
import { connectDB } from "@/lib/db";
import Skill from "@/models/Skill";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

async function getSkills() {
  await connectDB();
  const skills = await Skill.find({}).sort({ level: -1 });
  return JSON.parse(JSON.stringify(skills));
}

export default async function SkillsPage() {
  const skills = await getSkills();
  
  // Group skills by category
  const categories = {
    Frontend: [],
    Backend: [],
    Tools: []
  };
  
  skills.forEach(skill => {
    if (categories[skill.category]) {
      categories[skill.category].push(skill);
    }
  });

  return (
    <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Skills</h1>
        <Link href="/dashboard">
          <Button variant="outline">Manage Skills</Button>
        </Link>
      </div>
      
      <div className="space-y-12">
        {Object.entries(categories).map(([category, categorySkills]) => (
          <div key={category}>
            <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b pb-2">{category}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {categorySkills.map((skill) => (
                <div key={skill._id} className="bg-white p-4 rounded-lg shadow border border-gray-100">
                  <div className="flex justify-between items-center">
                    <h3 className="font-semibold text-gray-900">{skill.name}</h3>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      skill.level === 'Advanced' ? 'bg-green-100 text-green-800' :
                      skill.level === 'Intermediate' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {skill.level}
                    </span>
                  </div>
                </div>
              ))}
              {categorySkills.length === 0 && (
                <p className="text-gray-500 italic">No skills added yet.</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
