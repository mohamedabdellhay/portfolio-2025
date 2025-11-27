import Link from "next/link"
import { ArrowRight, Code2, Database, Sparkles } from "lucide-react"


export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-6 pt-16">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />

        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px),
                             linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />

        <div className="relative max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary border border-border mb-8">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
            </span>
            <span className="text-sm text-muted-foreground">Available for new projects</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold text-foreground tracking-tight mb-6">
            <span className="block">Building digital</span>
            <span className="block text-primary">experiences</span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
            Full-stack developer passionate about crafting beautiful, performant web applications with modern
            technologies and clean code.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/projects"
              className="group inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-all"
            >
              View Projects
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 bg-secondary text-foreground rounded-lg font-medium border border-border hover:bg-secondary/80 transition-all"
            >
              Get in Touch
            </Link>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2">
          <div className="w-6 h-10 rounded-full border-2 border-border flex justify-center">
            <div className="w-1.5 h-3 bg-primary rounded-full mt-2 animate-bounce" />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">What I do</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Specializing in building modern web applications with cutting-edge technologies
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="group p-8 rounded-2xl bg-card border border-border hover:border-primary/50 transition-all duration-300">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                <Code2 className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">Frontend Development</h3>
              <p className="text-muted-foreground leading-relaxed">
                Building responsive and interactive user interfaces with React, Next.js, and modern CSS frameworks.
              </p>
            </div>

            <div className="group p-8 rounded-2xl bg-card border border-border hover:border-primary/50 transition-all duration-300">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                <Database className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">Backend Development</h3>
              <p className="text-muted-foreground leading-relaxed">
                Creating robust APIs and server-side applications with Node.js, databases, and cloud services.
              </p>
            </div>

            <div className="group p-8 rounded-2xl bg-card border border-border hover:border-primary/50 transition-all duration-300">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                <Sparkles className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">Modern UI/UX</h3>
              <p className="text-muted-foreground leading-relaxed">
                Designing clean, accessible, and user-friendly interfaces that delight users.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="p-12 rounded-3xl bg-gradient-to-b from-card to-background border border-border">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">{"Let's work together"}</h2>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
              Have a project in mind? I would love to hear about it. Send me a message and lets create something
              amazing.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground rounded-xl font-medium hover:bg-primary/90 transition-all"
            >
              Start a Project
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
     
    </div>
  )
}
