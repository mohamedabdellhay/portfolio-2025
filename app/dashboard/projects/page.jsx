"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Plus, Pencil, Trash2, ArrowLeft, FolderKanban, Loader2 } from "lucide-react"

export default function ManageProjects() {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [deleting, setDeleting] = useState(null)

  const fetchProjects = async () => {
    try {
      const res = await fetch("/api/projects")
      const data = await res.json()
      setProjects(data.projects || [])
    } catch (error) {
      console.error("Failed to fetch projects", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProjects()
  }, [])

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this project?")) return

    setDeleting(id)
    try {
      const res = await fetch(`/api/projects/${id}`, {
        method: "DELETE",
      })

      if (res.ok) {
        fetchProjects()
      } else {
        alert("Failed to delete project")
      }
    } catch (error) {
      console.error("Error deleting project", error)
    } finally {
      setDeleting(null)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background pt-20 flex items-center justify-center">
        <div className="flex items-center gap-3 text-muted-foreground">
          <Loader2 className="w-5 h-5 animate-spin" />
          <span>Loading projects...</span>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background pt-20 pb-16">
      <div className="max-w-5xl mx-auto px-6">
        {/* Back Link */}
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Dashboard
        </Link>

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-50 rounded-xl">
              <FolderKanban className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">Manage Projects</h1>
              <p className="text-sm text-muted-foreground">
                {projects.length} project{projects.length !== 1 ? "s" : ""}
              </p>
            </div>
          </div>
          <Link href="/dashboard/projects/new">
            <Button className="gap-2">
              <Plus className="w-4 h-4" />
              Add Project
            </Button>
          </Link>
        </div>

        {/* Projects List */}
        <div className="bg-card rounded-2xl border border-border overflow-hidden">
          {projects.length === 0 ? (
            <div className="p-12 text-center">
              <div className="w-16 h-16 bg-secondary rounded-2xl flex items-center justify-center mx-auto mb-4">
                <FolderKanban className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-medium text-foreground mb-2">No projects yet</h3>
              <p className="text-muted-foreground mb-6">Create your first project to showcase your work.</p>
              <Link href="/dashboard/projects/new">
                <Button>Create First Project</Button>
              </Link>
            </div>
          ) : (
            <ul className="divide-y divide-border">
              {projects.map((project) => (
                <li key={project._id} className="hover:bg-secondary/50 transition-colors">
                  <div className="px-6 py-4 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-4 min-w-0">
                      {project.image ? (
                        <img
                          src={project.image || "/placeholder.svg"}
                          alt={project.title}
                          className="h-14 w-14 rounded-xl object-cover border border-border flex-shrink-0"
                        />
                      ) : (
                        <div className="h-14 w-14 rounded-xl bg-secondary flex items-center justify-center flex-shrink-0">
                          <FolderKanban className="w-6 h-6 text-muted-foreground" />
                        </div>
                      )}
                      <div className="min-w-0">
                        <p className="font-medium text-foreground truncate">{project.title}</p>
                        <p className="text-sm text-muted-foreground truncate max-w-md">{project.description}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <Link href={`/dashboard/projects/${project._id}`}>
                        <Button variant="outline" size="sm" className="gap-1.5 bg-transparent">
                          <Pencil className="w-3.5 h-3.5" />
                          Edit
                        </Button>
                      </Link>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDelete(project._id)}
                        disabled={deleting === project._id}
                        className="text-destructive hover:text-destructive hover:bg-destructive/10 hover:border-destructive/30"
                      >
                        {deleting === project._id ? (
                          <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        ) : (
                          <Trash2 className="w-3.5 h-3.5" />
                        )}
                      </Button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  )
}
