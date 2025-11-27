import { connectDB } from "@/lib/db"
import Skill from "@/models/Skill"
import SkillForm from "@/components/SkillForm"
import Link from "next/link"
import { ArrowLeft, Lightbulb } from "lucide-react"

async function getSkill(id) {
  await connectDB()
  const skill = await Skill.findById(id)
  return skill ? JSON.parse(JSON.stringify(skill)) : null
}

export default async function EditSkillPage({ params }) {
  const { id } = await params
  const skill = await getSkill(id)

  if (!skill) {
    return (
      <div className="min-h-screen bg-background pt-20 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-foreground mb-2">Skill not found</h2>
          <Link href="/dashboard/skills" className="text-primary hover:underline">
            Back to skills
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background pt-20 pb-16">
      <div className="max-w-lg mx-auto px-6">
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
            <h1 className="text-2xl font-bold text-foreground">Edit Skill</h1>
            <p className="text-sm text-muted-foreground">Update skill details</p>
          </div>
        </div>

        <SkillForm initialData={skill} isEdit={true} />
      </div>
    </div>
  )
}
