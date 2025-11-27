import { connectDB } from "@/lib/db"
import Project from "@/models/Project"
import ProjectForm from "@/components/ProjectForm"
import Link from "next/link"
import { ArrowLeft, FolderKanban } from "lucide-react"

async function getProject(id) {
  await connectDB()
  const project = await Project.findById(id)
  return project ? JSON.parse(JSON.stringify(project)) : null
}

export default async function EditProjectPage({ params }) {
  const { id } = await params
  const project = await getProject(id)

  if (!project) {
    return (
      <div className="min-h-screen bg-background pt-20 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-foreground mb-2">Project not found</h2>
          <Link href="/dashboard/projects" className="text-primary hover:underline">
            Back to projects
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background pt-20 pb-16">
      <div className="max-w-6xl mx-auto px-6">
        <Link
          href="/dashboard/projects"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Projects
        </Link>

        <div className="flex items-center gap-3 mb-8">
          <div className="p-2 bg-blue-50 rounded-xl">
            <FolderKanban className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-foreground">Edit Project</h1>
            <p className="text-sm text-muted-foreground">Update project details</p>
          </div>
        </div>

        <ProjectForm initialData={project} isEdit={true} />
      </div>
    </div>
  )
}
