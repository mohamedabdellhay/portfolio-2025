// app/api/about/route.js
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import AboutMe from "@/models/AboutMe";
import { verifyToken } from "@/utils/jwt";

// GET: Fetch About Me (singleton)
export async function GET() {
  try {
    await connectDB();
    // Assuming only one AboutMe document exists, or we take the latest
    const about = await AboutMe.findOne().sort({ updatedAt: -1 });
    return NextResponse.json({ about }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch about info" }, { status: 500 });
  }
}

// POST: Create or Update About Me (Protected)
// We'll treat POST as "Upsert" for simplicity in this context, or user can use PUT if ID is known.
// Let's stick to POST creating a new one if none exists, or just adding a new entry (history).
export async function POST(request) {
  try {
    const token = request.cookies.get("token")?.value || request.headers.get("Authorization")?.split(" ")[1];
    if (!token || !verifyToken(token)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();
    const body = await request.json();
    
    // Check if one exists to update, or just create new
    // For this requirement, let's just create a new one to keep history, or update the latest.
    // Let's just create new for simplicity as per "Create" requirement.
    const about = await AboutMe.create(body);
    
    return NextResponse.json({ about }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to save about info" }, { status: 500 });
  }
}
