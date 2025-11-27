import { connectDB } from "@/lib/db"
import AboutMe from "@/models/AboutMe"
import Link from "next/link"
import { ArrowUpRight, Mail, MapPin, Calendar } from "lucide-react"

async function getAboutMe() {
  await connectDB()
  const about = await AboutMe.findOne().sort({ updatedAt: -1 })
  return about ? JSON.parse(JSON.stringify(about)) : null
}

export default async function AboutPage() {
  const about = await getAboutMe()

  return (
    <div className="min-h-screen pt-24 pb-16 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <div>
            <p className="text-primary text-sm font-medium tracking-wider uppercase mb-3">About</p>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground">About Me</h1>
          </div>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-4 py-2 bg-secondary text-foreground rounded-lg text-sm font-medium border border-border hover:bg-secondary/80 transition-colors shrink-0"
          >
            get in touch
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>

        {about ? (
          <div className="space-y-12">
            {/* Profile Section */}
            <div className="flex flex-col md:flex-row gap-8 items-start">
              {about.avatar && (
                <div className="shrink-0">
                  <div className="relative">
                    <div className="absolute inset-0 bg-primary/20 rounded-2xl blur-2xl" />
                    <img
                      src={about.avatar || "/placeholder.svg"}
                      alt="Profile"
                      className="relative w-40 h-40 md:w-48 md:h-48 rounded-2xl object-cover border-2 border-border"
                    />
                  </div>
                </div>
              )}
              <div className="flex-1">
                <h2 className="text-3xl font-bold text-foreground mb-4">{about.heading}</h2>
                <div className="flex flex-wrap gap-4 mb-6">
                  <div className="inline-flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="w-4 h-4" />
                    <span>Remote / Worldwide</span>
                  </div>
                  <div className="inline-flex items-center gap-2 text-sm text-muted-foreground">
                    <Mail className="w-4 h-4" />
                  
                    <a href="mailto:mohamedabdellhay1@gmail.com">
                      mohamedabdellhay1@gmail.com
                    </a>
                  </div>
                </div>
                <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap">{about.content}</p>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: "Years Experience", value: "2+" },
                { label: "Projects Completed", value: "10+" },
                { label: "Happy Clients", value: "10+" },
                { label: "Technologies", value: "10+" },
              ].map((stat) => (
                <div key={stat.label} className="bg-card rounded-xl border border-border p-6 text-center">
                  <div className="text-3xl font-bold text-primary mb-1">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Last Updated */}
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Calendar className="w-4 h-4" />
              <span>Last updated: {new Date(about.updatedAt).toLocaleDateString()}</span>
            </div>
          </div>
        ) : (
          <div className="text-center py-24">
            <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center mx-auto mb-6">
              <span className="text-2xl">👤</span>
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">No profile information yet</h3>
            <p className="text-muted-foreground mb-6">
              Add your details from the dashboard to tell visitors about yourself.
            </p>
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
            >
              Go to Dashboard
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
