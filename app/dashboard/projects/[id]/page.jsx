// app/dashboard/projects/[id]/page.jsx
import { connectDB } from "@/lib/db";
import Project from "@/models/Project";
import ProjectForm from "@/components/ProjectForm";

async function getProject(id) {
  await connectDB();
  const project = await Project.findById(id);
  return project ? JSON.parse(JSON.stringify(project)) : null;
}

export default async function EditProjectPage({ params }) {
  const project = await getProject(params.id);

  if (!project) {
    return <div className="p-8 text-center">Project not found</div>;
  }

  return (
    <div className="max-w-3xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Edit Project</h1>
      <ProjectForm initialData={project} isEdit={true} />
    </div>
  );
}
