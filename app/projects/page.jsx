import { connectDB } from "@/lib/db"
import Project from "@/models/Project"
import Link from "next/link"
import { ArrowUpRight, Github, ExternalLink, Folder, Sparkles } from "lucide-react"

async function getProjects() {
  await connectDB()
  const projects = await Project.find({}).sort({ createdAt: -1 })
  return JSON.parse(JSON.stringify(projects))
}

export default async function ProjectsPage() {
  const projects = await getProjects()

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white pt-24 pb-16 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-full text-sm font-medium mb-6">
            <Sparkles className="w-4 h-4" />
            My Work
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4 text-balance">Featured Projects</h1>
          <p className="text-slate-600 max-w-2xl mx-auto text-lg">
            A collection of projects showcasing my skills in full-stack development, from concept to deployment.
          </p>
        </div>

        {/* Projects Grid */}
        {projects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <div
                key={project._id}
                className="group bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-lg hover:border-blue-200 transition-all duration-300"
              >
                {/* Project Image */}
                <div className="relative aspect-video overflow-hidden bg-gradient-to-br from-slate-100 to-slate-50">
                  {project.image ? (
                    <img
                      src={project.image || "/placeholder.svg"}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <div className="text-center">
                        <div className="w-16 h-16 rounded-2xl bg-blue-50 flex items-center justify-center mx-auto mb-3">
                          <Folder className="w-8 h-8 text-blue-500" />
                        </div>
                        <span className="text-4xl font-bold text-slate-200">{String(index + 1).padStart(2, "0")}</span>
                      </div>
                    </div>
                  )}

                  {/* Overlay Links */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-end p-4 gap-2">
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 bg-white/90 backdrop-blur-sm rounded-lg text-slate-800 hover:bg-white transition-colors"
                      >
                        <Github className="w-5 h-5" />
                      </a>
                    )}
                    {project.demo && (
                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 bg-white/90 backdrop-blur-sm rounded-lg text-slate-800 hover:bg-white transition-colors"
                      >
                        <ExternalLink className="w-5 h-5" />
                      </a>
                    )}
                  </div>
                </div>

                {/* Project Info */}
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-slate-600 text-sm mb-4 line-clamp-2 leading-relaxed">{project.description}</p>

                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-2">
                    {project.techStack.slice(0, 4).map((tech, i) => (
                      <span key={i} className="px-3 py-1 text-xs font-medium bg-slate-100 text-slate-600 rounded-full">
                        {tech}
                      </span>
                    ))}
                    {project.techStack.length > 4 && (
                      <span className="px-3 py-1 text-xs font-medium bg-blue-50 text-blue-600 rounded-full">
                        +{project.techStack.length - 4} more
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-24 bg-white rounded-2xl border border-slate-200">
            <div className="w-20 h-20 rounded-2xl bg-slate-100 flex items-center justify-center mx-auto mb-6">
              <Folder className="w-10 h-10 text-slate-400" />
            </div>
            <h3 className="text-xl font-semibold text-slate-900 mb-2">No projects yet</h3>
            <p className="text-slate-600 mb-6">Add your first project from the dashboard.</p>
            <Link
              href="/dashboard/projects"
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors"
            >
              Go to Dashboard
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        )}

        {/* CTA Section */}
        {projects.length > 0 && (
          <div className="mt-16 bg-gradient-to-r from-slate-900 to-slate-800 rounded-2xl p-8 md:p-12 text-center">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">Have a project in mind?</h3>
            <p className="text-slate-300 mb-8 max-w-xl mx-auto">
              Let's collaborate and bring your ideas to life. I'm always excited to work on new challenges.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white text-slate-900 rounded-xl font-semibold hover:bg-slate-100 transition-colors"
            >
              Start a Project
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
