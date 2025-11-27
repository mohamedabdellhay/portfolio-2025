"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft, UserIcon, Loader2, Save } from "lucide-react"

export default function ManageAbout() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [formData, setFormData] = useState({
    heading: "",
    content: "",
    avatar: "",
  })

  useEffect(() => {
    const fetchAbout = async () => {
      try {
        const res = await fetch("/api/about")
        const data = await res.json()
        if (data.about) {
          setFormData({
            heading: data.about.heading || "",
            content: data.about.content || "",
            avatar: data.about.avatar || "",
          })
        }
      } catch (error) {
        console.error("Failed to fetch about info", error)
      } finally {
        setLoading(false)
      }
    }

    fetchAbout()
  }, [])

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSaving(true)

    try {
      const res = await fetch("/api/about", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (res.ok) {
        alert("Profile updated successfully!")
        router.refresh()
      } else {
        alert("Failed to update profile")
      }
    } catch (error) {
      console.error("Error updating profile", error)
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background pt-20 flex items-center justify-center">
        <div className="flex items-center gap-3 text-muted-foreground">
          <Loader2 className="w-5 h-5 animate-spin" />
          <span>Loading profile...</span>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background pt-20 pb-16">
      <div className="max-w-6xl mx-auto px-6">
        {/* Back Link */}
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Dashboard
        </Link>

        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <div className="p-2 bg-amber-50 rounded-xl">
            <UserIcon className="w-6 h-6 text-amber-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-foreground">Edit About Me</h1>
            <p className="text-sm text-muted-foreground">Update your profile information</p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-card rounded-2xl border border-border p-6 space-y-6">
          <div>
            <label htmlFor="heading" className="block text-sm font-medium text-foreground mb-2">
              Heading
            </label>
            <input
              id="heading"
              type="text"
              value={formData.heading}
              onChange={handleChange}
              required
              placeholder="e.g. Hi, I'm Mohamed"
              className="w-full px-4 py-3 bg-secondary border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
            />
          </div>

          <div>
            <label htmlFor="content" className="block text-sm font-medium text-foreground mb-2">
              Bio Content
            </label>
            <textarea
              id="content"
              rows={8}
              className="w-full px-4 py-3 bg-secondary border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all resize-none"
              value={formData.content}
              onChange={handleChange}
              required
              placeholder="Tell us about yourself..."
            />
          </div>

          <div>
            <label htmlFor="avatar" className="block text-sm font-medium text-foreground mb-2">
              Avatar URL
            </label>
            <input
              id="avatar"
              type="text"
              value={formData.avatar}
              onChange={handleChange}
              placeholder="https://example.com/avatar.jpg"
              className="w-full px-4 py-3 bg-secondary border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
            />
            {formData.avatar && (
              <div className="mt-3">
                <img
                  src={formData.avatar || "/placeholder.svg"}
                  alt="Avatar preview"
                  className="w-20 h-20 rounded-xl object-cover border border-border"
                />
              </div>
            )}
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-border">
            <Link href="/dashboard">
              <Button type="button" variant="outline">
                Cancel
              </Button>
            </Link>
            <Button type="submit" disabled={saving} className="gap-2">
              {saving ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  Save Changes
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
