// app/dashboard/skills/new/page.jsx
import SkillForm from "@/components/SkillForm";

export default function NewSkillPage() {
  return (
    <div className="max-w-md mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Add New Skill</h1>
      <SkillForm />
    </div>
  );
}
