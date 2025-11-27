// app/dashboard/projects/new/page.jsx
import ProjectForm from "@/components/ProjectForm";

export default function NewProjectPage() {
  return (
    <div className="max-w-3xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Add New Project</h1>
      <ProjectForm />
    </div>
  );
}
