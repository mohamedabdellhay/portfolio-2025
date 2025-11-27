// app/api/skills/[id]/route.js
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Skill from "@/models/Skill";
import { verifyToken } from "@/utils/jwt";

// GET: Fetch single skill
export async function GET(request, { params }) {
  try {
    await connectDB();
    const skill = await Skill.findById(params.id);
    if (!skill) {
      return NextResponse.json({ error: "Skill not found" }, { status: 404 });
    }
    return NextResponse.json({ skill }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch skill" }, { status: 500 });
  }
}

// PUT: Update skill (Protected)
export async function PUT(request, { params }) {
  try {
    const token = request.cookies.get("token")?.value || request.headers.get("Authorization")?.split(" ")[1];
    if (!token || !verifyToken(token)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();
    const body = await request.json();
    const skill = await Skill.findByIdAndUpdate(params.id, body, { new: true, runValidators: true });
    
    if (!skill) {
      return NextResponse.json({ error: "Skill not found" }, { status: 404 });
    }
    
    return NextResponse.json({ skill }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to update skill" }, { status: 500 });
  }
}

// DELETE: Delete skill (Protected)
export async function DELETE(request, { params }) {
  try {
    const token = request.cookies.get("token")?.value || request.headers.get("Authorization")?.split(" ")[1];
    if (!token || !verifyToken(token)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();
    const skill = await Skill.findByIdAndDelete(params.id);
    
    if (!skill) {
      return NextResponse.json({ error: "Skill not found" }, { status: 404 });
    }
    
    return NextResponse.json({ message: "Skill deleted" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete skill" }, { status: 500 });
  }
}
