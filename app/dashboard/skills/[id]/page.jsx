// app/dashboard/skills/[id]/page.jsx
import { connectDB } from "@/lib/db";
import Skill from "@/models/Skill";
import SkillForm from "@/components/SkillForm";

async function getSkill(id) {
  await connectDB();
  const skill = await Skill.findById(id);
  return skill ? JSON.parse(JSON.stringify(skill)) : null;
}

export default async function EditSkillPage({ params }) {
  const skill = await getSkill(params.id);

  if (!skill) {
    return <div className="p-8 text-center">Skill not found</div>;
  }

  return (
    <div className="max-w-md mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Edit Skill</h1>
      <SkillForm initialData={skill} isEdit={true} />
    </div>
  );
}
