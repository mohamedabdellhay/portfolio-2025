// app/api/skills/route.js
import { NextResponse } from "next/server"
import { connectDB } from "@/lib/db"
import Skill from "@/models/Skill"
import { verifyToken } from "@/utils/jwt"

// GET: Fetch all skills
export async function GET() {
  try {
    await connectDB()
    const skills = await Skill.find({}).sort({ category: 1, level: -1 })
    return NextResponse.json({ skills }, { status: 200 })
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch skills" }, { status: 500 })
  }
}

// POST: Create a new skill (Protected)
export async function POST(request) {
  try {
    const token = request.cookies.get("token")?.value || request.headers.get("Authorization")?.split(" ")[1]
    const payload = await verifyToken(token)
    if (!token || !payload) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    await connectDB()
    const body = await request.json()
    const skill = await Skill.create(body)
    return NextResponse.json({ skill }, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Failed to create skill" }, { status: 500 })
  }
}
