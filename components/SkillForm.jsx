"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Loader2, Save } from "lucide-react"

export default function SkillForm({ initialData = null, isEdit = false }) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: initialData?.name || "",
    level: initialData?.level || "Beginner",
    category: initialData?.category || "Frontend",
  })

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const url = isEdit ? `/api/skills/${initialData._id}` : "/api/skills"

      const method = isEdit ? "PUT" : "POST"

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (res.ok) {
        router.push("/dashboard/skills")
        router.refresh()
      } else {
        alert("Failed to save skill")
      }
    } catch (error) {
      console.error("Error saving skill", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="bg-card rounded-2xl border border-border p-6 space-y-6">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
          Skill Name
        </label>
        <input
          id="name"
          type="text"
          value={formData.name}
          onChange={handleChange}
          required
          placeholder="e.g. React"
          className="w-full px-4 py-3 bg-secondary border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
        />
      </div>

      <div>
        <label htmlFor="category" className="block text-sm font-medium text-foreground mb-2">
          Category
        </label>
        <select
          id="category"
          className="w-full px-4 py-3 bg-secondary border border-border rounded-xl text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
          value={formData.category}
          onChange={handleChange}
        >
          <option value="Frontend">Frontend</option>
          <option value="Backend">Backend</option>
          <option value="Tools">Tools</option>
        </select>
      </div>

      <div>
        <label htmlFor="level" className="block text-sm font-medium text-foreground mb-2">
          Level
        </label>
        <select
          id="level"
          className="w-full px-4 py-3 bg-secondary border border-border rounded-xl text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
          value={formData.level}
          onChange={handleChange}
        >
          <option value="Beginner">Beginner</option>
          <option value="Intermediate">Intermediate</option>
          <option value="Advanced">Advanced</option>
        </select>
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
              {isEdit ? "Update Skill" : "Add Skill"}
            </>
          )}
        </Button>
      </div>
    </form>
  )
}
