import SkillForm from "@/components/SkillForm"
import Link from "next/link"
import { ArrowLeft, Lightbulb } from "lucide-react"

export default function NewSkillPage() {
  return (
    <div className="min-h-screen bg-background pt-20 pb-16">
      <div className="max-w-6xl mx-auto px-6">
        <Link
          href="/dashboard/skills"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Skills
        </Link>

        <div className="flex items-center gap-3 mb-8">
          <div className="p-2 bg-emerald-50 rounded-xl">
            <Lightbulb className="w-6 h-6 text-emerald-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-foreground">Add New Skill</h1>
            <p className="text-sm text-muted-foreground">Add a new technical skill</p>
          </div>
        </div>

        <SkillForm />
      </div>
    </div>
  )
}
