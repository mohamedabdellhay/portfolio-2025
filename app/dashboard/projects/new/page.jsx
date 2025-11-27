import ProjectForm from "@/components/ProjectForm"
import Link from "next/link"
import { ArrowLeft, FolderKanban } from "lucide-react"

export default function NewProjectPage() {
  return (
    <div className="min-h-screen bg-background pt-20 pb-16">
      <div className="max-w-2xl mx-auto px-6">
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
            <h1 className="text-2xl font-bold text-foreground">Add New Project</h1>
            <p className="text-sm text-muted-foreground">Create a new portfolio project</p>
          </div>
        </div>

        <ProjectForm />
      </div>
    </div>
  )
}
