// app/api/messages/route.js
// API route for contact form messages

import { NextResponse } from "next/server"
import { connectDB } from "@/lib/db"
import Message from "@/models/Message"

// GET - Fetch all messages (protected by middleware)
export async function GET() {
  try {
    await connectDB()
    const messages = await Message.find().sort({ createdAt: -1 })
    return NextResponse.json(messages)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch messages" }, { status: 500 })
  }
}

// POST - Create a new message (public)
export async function POST(request) {
  try {
    await connectDB()
    const body = await request.json()
    const { name, email, subject, message } = body

    if (!name || !email || !subject || !message) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 })
    }

    const newMessage = await Message.create({ name, email, subject, message })
    return NextResponse.json(newMessage, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Failed to send message" }, { status: 500 })
  }
}
