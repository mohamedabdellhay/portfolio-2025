// app/api/projects/route.js
import { NextResponse } from "next/server"
import { connectDB } from "@/lib/db"
import Project from "@/models/Project"
import { verifyToken } from "@/utils/jwt"

// GET: Fetch all projects
export async function GET() {
  try {
    await connectDB()
    const projects = await Project.find({}).sort({ createdAt: -1 })
    return NextResponse.json({ projects }, { status: 200 })
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch projects" }, { status: 500 })
  }
}

// POST: Create a new project (Protected)
export async function POST(request) {
  try {
    const token = request.cookies.get("token")?.value || request.headers.get("Authorization")?.split(" ")[1]
    const payload = await verifyToken(token)
    if (!token || !payload) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    await connectDB()
    const body = await request.json()
    const project = await Project.create(body)
    return NextResponse.json({ project }, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Failed to create project" }, { status: 500 })
  }
}
