import { connectDB } from "@/lib/db"
import Skill from "@/models/Skill"
import Link from "next/link"
import { ArrowUpRight, Code2, Server, Wrench, Sparkles } from "lucide-react"

async function getSkills() {
  await connectDB()
  const skills = await Skill.find({}).sort({ level: -1 })
  return JSON.parse(JSON.stringify(skills))
}

export default async function SkillsPage() {
  const skills = await getSkills()

  const categories = {
    Frontend: { skills: [], icon: Code2, color: "bg-blue-500", lightBg: "bg-blue-50", textColor: "text-blue-600" },
    Backend: {
      skills: [],
      icon: Server,
      color: "bg-emerald-500",
      lightBg: "bg-emerald-50",
      textColor: "text-emerald-600",
    },
    Tools: { skills: [], icon: Wrench, color: "bg-amber-500", lightBg: "bg-amber-50", textColor: "text-amber-600" },
  }

  skills.forEach((skill) => {
    if (categories[skill.category]) {
      categories[skill.category].skills.push(skill)
    }
  })

  const getLevelPercentage = (level) => {
    switch (level) {
      case "Advanced":
        return 100
      case "Intermediate":
        return 66
      default:
        return 33
    }
  }

  const getLevelColor = (level) => {
    switch (level) {
      case "Advanced":
        return "bg-emerald-500"
      case "Intermediate":
        return "bg-blue-500"
      default:
        return "bg-amber-500"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white pt-24 pb-16 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-full text-sm font-medium mb-6">
            <Sparkles className="w-4 h-4" />
            My Expertise
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4 text-balance">Skills & Technologies</h1>
          <p className="text-slate-600 max-w-2xl mx-auto text-lg">
            A comprehensive overview of my technical skills and the tools I use to bring ideas to life.
          </p>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {Object.entries(categories).map(
            ([category, { skills: categorySkills, icon: Icon, color, lightBg, textColor }]) => (
              <div
                key={category}
                className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-center gap-3 mb-8">
                  <div className={`w-12 h-12 rounded-xl ${lightBg} flex items-center justify-center`}>
                    <Icon className={`w-6 h-6 ${textColor}`} />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-slate-900">{category}</h2>
                    <p className="text-sm text-slate-500">{categorySkills.length} skills</p>
                  </div>
                </div>

                <div className="space-y-5">
                  {categorySkills.length > 0 ? (
                    categorySkills.map((skill) => (
                      <div key={skill._id}>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium text-slate-800">{skill.name}</span>
                          <span
                            className={`text-xs font-medium px-2 py-1 rounded-full ${
                              skill.level === "Advanced"
                                ? "bg-emerald-50 text-emerald-600"
                                : skill.level === "Intermediate"
                                  ? "bg-blue-50 text-blue-600"
                                  : "bg-amber-50 text-amber-600"
                            }`}
                          >
                            {skill.level}
                          </span>
                        </div>
                        <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                          <div
                            className={`h-full ${getLevelColor(skill.level)} rounded-full transition-all duration-500`}
                            style={{ width: `${getLevelPercentage(skill.level)}%` }}
                          />
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8">
                      <div
                        className={`w-12 h-12 rounded-full ${lightBg} flex items-center justify-center mx-auto mb-3`}
                      >
                        <Icon className={`w-5 h-5 ${textColor}`} />
                      </div>
                      <p className="text-sm text-slate-500">No skills added yet</p>
                    </div>
                  )}
                </div>
              </div>
            ),
          )}
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 md:p-12 text-center">
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">Want to work together?</h3>
          <p className="text-blue-100 mb-8 max-w-xl mx-auto">
            I'm always open to discussing new projects, creative ideas or opportunities to be part of your vision.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 bg-white text-blue-600 rounded-xl font-semibold hover:bg-blue-50 transition-colors"
          >
            Get in Touch
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  )
}
