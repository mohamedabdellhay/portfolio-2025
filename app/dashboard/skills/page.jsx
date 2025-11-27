"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Plus, Pencil, Trash2, ArrowLeft, Lightbulb, Loader2 } from "lucide-react"

export default function ManageSkills() {
  const [skills, setSkills] = useState([])
  const [loading, setLoading] = useState(true)
  const [deleting, setDeleting] = useState(null)

  const fetchSkills = async () => {
    try {
      const res = await fetch("/api/skills")
      const data = await res.json()
      setSkills(data.skills || [])
    } catch (error) {
      console.error("Failed to fetch skills", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchSkills()
  }, [])

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this skill?")) return

    setDeleting(id)
    try {
      const res = await fetch(`/api/skills/${id}`, {
        method: "DELETE",
      })

      if (res.ok) {
        fetchSkills()
      } else {
        alert("Failed to delete skill")
      }
    } catch (error) {
      console.error("Error deleting skill", error)
    } finally {
      setDeleting(null)
    }
  }

  const getLevelColor = (level) => {
    switch (level) {
      case "Advanced":
        return "bg-emerald-100 text-emerald-700"
      case "Intermediate":
        return "bg-amber-100 text-amber-700"
      default:
        return "bg-secondary text-muted-foreground"
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background pt-20 flex items-center justify-center">
        <div className="flex items-center gap-3 text-muted-foreground">
          <Loader2 className="w-5 h-5 animate-spin" />
          <span>Loading skills...</span>
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
            <div className="p-2 bg-emerald-50 rounded-xl">
              <Lightbulb className="w-6 h-6 text-emerald-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">Manage Skills</h1>
              <p className="text-sm text-muted-foreground">
                {skills.length} skill{skills.length !== 1 ? "s" : ""}
              </p>
            </div>
          </div>
          <Link href="/dashboard/skills/new">
            <Button className="gap-2">
              <Plus className="w-4 h-4" />
              Add Skill
            </Button>
          </Link>
        </div>

        {/* Skills List */}
        <div className="bg-card rounded-2xl border border-border overflow-hidden">
          {skills.length === 0 ? (
            <div className="p-12 text-center">
              <div className="w-16 h-16 bg-secondary rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Lightbulb className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-medium text-foreground mb-2">No skills yet</h3>
              <p className="text-muted-foreground mb-6">Add your technical skills to showcase your expertise.</p>
              <Link href="/dashboard/skills/new">
                <Button>Add First Skill</Button>
              </Link>
            </div>
          ) : (
            <ul className="divide-y divide-border">
              {skills.map((skill) => (
                <li key={skill._id} className="hover:bg-secondary/50 transition-colors">
                  <div className="px-6 py-4 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div className="h-10 w-10 rounded-xl bg-secondary flex items-center justify-center">
                        <Lightbulb className="w-5 h-5 text-muted-foreground" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{skill.name}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-xs text-muted-foreground">{skill.category}</span>
                          <span className="text-muted-foreground">•</span>
                          <span
                            className={`text-xs px-2 py-0.5 rounded-full font-medium ${getLevelColor(skill.level)}`}
                          >
                            {skill.level}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Link href={`/dashboard/skills/${skill._id}`}>
                        <Button variant="outline" size="sm" className="gap-1.5 bg-transparent">
                          <Pencil className="w-3.5 h-3.5" />
                          Edit
                        </Button>
                      </Link>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDelete(skill._id)}
                        disabled={deleting === skill._id}
                        className="text-destructive hover:text-destructive hover:bg-destructive/10 hover:border-destructive/30"
                      >
                        {deleting === skill._id ? (
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
