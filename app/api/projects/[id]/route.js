// app/api/projects/[id]/route.js
import { NextResponse } from "next/server"
import { connectDB } from "@/lib/db"
import Project from "@/models/Project"
import { verifyToken } from "@/utils/jwt"

// GET: Fetch single project
export async function GET(request, { params }) {
  try {
    await connectDB()
    const { id } = await params
    const project = await Project.findById(id)
    if (!project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 })
    }
    return NextResponse.json({ project }, { status: 200 })
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch project" }, { status: 500 })
  }
}

// PUT: Update project (Protected)
export async function PUT(request, { params }) {
  try {
    const token = request.cookies.get("token")?.value || request.headers.get("Authorization")?.split(" ")[1]
    const payload = await verifyToken(token)
    if (!token || !payload) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    await connectDB()
    const { id } = await params
    const body = await request.json()
    const project = await Project.findByIdAndUpdate(id, body, { new: true, runValidators: true })

    if (!project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 })
    }

    return NextResponse.json({ project }, { status: 200 })
  } catch (error) {
    return NextResponse.json({ error: "Failed to update project" }, { status: 500 })
  }
}

// DELETE: Delete project (Protected)
export async function DELETE(request, { params }) {
  try {
    const token = request.cookies.get("token")?.value || request.headers.get("Authorization")?.split(" ")[1]
    const payload = await verifyToken(token)
    if (!token || !payload) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    await connectDB()
    const { id } = await params
    const project = await Project.findByIdAndDelete(id)

    if (!project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 })
    }

    return NextResponse.json({ message: "Project deleted" }, { status: 200 })
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete project" }, { status: 500 })
  }
}
