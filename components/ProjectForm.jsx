"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Loader2, Save } from "lucide-react"

export default function ProjectForm({ initialData = null, isEdit = false }) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    title: initialData?.title || "",
    description: initialData?.description || "",
    techStack: initialData?.techStack?.join(", ") || "",
    github: initialData?.github || "",
    demo: initialData?.demo || "",
    image: initialData?.image || "",
  })

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    const payload = {
      ...formData,
      techStack: formData.techStack
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean),
    }

    try {
      const url = isEdit ? `/api/projects/${initialData._id}` : "/api/projects"

      const method = isEdit ? "PUT" : "POST"

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })

      if (res.ok) {
        router.push("/dashboard/projects")
        router.refresh()
      } else {
        alert("Failed to save project")
      }
    } catch (error) {
      console.error("Error saving project", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="bg-card rounded-2xl border border-border p-6 space-y-6">
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-foreground mb-2">
          Project Title
        </label>
        <input
          id="title"
          type="text"
          value={formData.title}
          onChange={handleChange}
          required
          placeholder="My Awesome Project"
          className="w-full px-4 py-3 bg-secondary border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
        />
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-foreground mb-2">
          Description
        </label>
        <textarea
          id="description"
          rows={4}
          className="w-full px-4 py-3 bg-secondary border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all resize-none"
          value={formData.description}
          onChange={handleChange}
          required
          placeholder="Describe your project..."
        />
      </div>

      <div>
        <label htmlFor="techStack" className="block text-sm font-medium text-foreground mb-2">
          Tech Stack <span className="text-muted-foreground font-normal">(comma separated)</span>
        </label>
        <input
          id="techStack"
          type="text"
          value={formData.techStack}
          onChange={handleChange}
          placeholder="React, Node.js, MongoDB"
          className="w-full px-4 py-3 bg-secondary border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="github" className="block text-sm font-medium text-foreground mb-2">
            GitHub URL
          </label>
          <input
            id="github"
            type="text"
            value={formData.github}
            onChange={handleChange}
            placeholder="https://github.com/..."
            className="w-full px-4 py-3 bg-secondary border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
          />
        </div>
        <div>
          <label htmlFor="demo" className="block text-sm font-medium text-foreground mb-2">
            Live Demo URL
          </label>
          <input
            id="demo"
            type="text"
            value={formData.demo}
            onChange={handleChange}
            placeholder="https://myproject.com"
            className="w-full px-4 py-3 bg-secondary border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
          />
        </div>
      </div>

      <div>
        <label htmlFor="image" className="block text-sm font-medium text-foreground mb-2">
          Image URL
        </label>
        <input
          id="image"
          type="text"
          value={formData.image}
          onChange={handleChange}
          placeholder="https://example.com/image.jpg"
          className="w-full px-4 py-3 bg-secondary border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
        />
        {formData.image && (
          <div className="mt-3">
            <img
              src={formData.image || "/placeholder.svg"}
              alt="Project preview"
              className="w-full max-w-xs h-32 rounded-xl object-cover border border-border"
            />
          </div>
        )}
      </div>

      <div className="flex justify-end gap-3 pt-4 border-t border-border">
        <Button type="button" variant="outline" onClick={() => router.back()}>
          Cancel
        </Button>
        <Button type="submit" disabled={loading} className="gap-2">
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <Save className="w-4 h-4" />
              {isEdit ? "Update Project" : "Create Project"}
            </>
          )}
        </Button>
      </div>
    </form>
  )
}
