import { headers } from "next/headers"
import Link from "next/link"
import { connectDB } from "@/lib/db"
import User from "@/models/User"
import {
  FolderKanban,
  Lightbulb,
  UserIcon,
  ArrowRight,
  LayoutDashboard,
  ExternalLink,
  MessageSquare,
} from "lucide-react"

export async function getUser() {
  const headerList = await headers()
  const userId = headerList.get("x-user-id")
  await connectDB()
  const user = await User.findById(userId).select("-password")
  return user ? JSON.parse(JSON.stringify(user)) : null
}

export default async function DashboardPage() {
  const user = await getUser()

  const dashboardCards = [
    {
      title: "Projects",
      description: "Add, edit, or remove portfolio projects.",
      href: "/dashboard/projects",
      icon: FolderKanban,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      hoverBg: "hover:bg-blue-100",
    },
    {
      title: "Skills",
      description: "Manage your technical skills and levels.",
      href: "/dashboard/skills",
      icon: Lightbulb,
      color: "text-emerald-600",
      bgColor: "bg-emerald-50",
      hoverBg: "hover:bg-emerald-100",
    },
    {
      title: "About Me",
      description: "Update your profile info and bio.",
      href: "/dashboard/about",
      icon: UserIcon,
      color: "text-amber-600",
      bgColor: "bg-amber-50",
      hoverBg: "hover:bg-amber-100",
    },
    {
      title: "Messages",
      description: "View contact form submissions.",
      href: "/dashboard/messages",
      icon: MessageSquare,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      hoverBg: "hover:bg-purple-100",
    },
  ]

  return (
    <div className="min-h-screen bg-background pt-20 pb-16">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-primary/10 rounded-xl">
              <LayoutDashboard className="w-6 h-6 text-primary" />
            </div>
            <span className="text-sm font-medium text-primary uppercase tracking-wider">Dashboard</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
            Welcome back{user?.name ? `, ${user.name}` : ""}!
          </h1>
          <p className="text-muted-foreground">Manage your portfolio content from here.</p>
        </div>

        {/* Dashboard Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-10">
          {dashboardCards.map((card) => (
            <Link
              key={card.href}
              href={card.href}
              className={`group relative bg-card rounded-2xl border border-border p-6 hover:border-primary/30 hover:shadow-lg transition-all duration-300`}
            >
              <div
                className={`w-12 h-12 rounded-xl ${card.bgColor} ${card.hoverBg} flex items-center justify-center mb-5 transition-colors`}
              >
                <card.icon className={`w-6 h-6 ${card.color}`} />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                {card.title}
              </h3>
              <p className="text-muted-foreground text-sm mb-4">{card.description}</p>
              <div className="flex items-center gap-2 text-sm font-medium text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                Manage
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="bg-card rounded-2xl border border-border p-6">
          <h2 className="text-lg font-semibold text-foreground mb-5">Quick Actions</h2>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-secondary text-foreground rounded-xl text-sm font-medium border border-border hover:bg-secondary/80 hover:border-primary/30 transition-all"
            >
              <ExternalLink className="w-4 h-4" />
              View Public Portfolio
            </Link>
            <Link
              href="/dashboard/projects/new"
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-primary text-primary-foreground rounded-xl text-sm font-medium hover:bg-primary/90 transition-all"
            >
              Add New Project
            </Link>
            <Link
              href="/dashboard/skills/new"
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-secondary text-foreground rounded-xl text-sm font-medium border border-border hover:bg-secondary/80 hover:border-primary/30 transition-all"
            >
              Add New Skill
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
