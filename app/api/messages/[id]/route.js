// app/api/messages/[id]/route.js
// API route for single message operations

import { NextResponse } from "next/server"
import { connectDB } from "@/lib/db"
import Message from "@/models/Message"

// GET - Fetch single message
export async function GET(request, { params }) {
  try {
    await connectDB()
    const { id } = await params
    const message = await Message.findById(id)

    if (!message) {
      return NextResponse.json({ error: "Message not found" }, { status: 404 })
    }

    return NextResponse.json(message)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch message" }, { status: 500 })
  }
}

// PATCH - Mark message as read/unread
export async function PATCH(request, { params }) {
  try {
    await connectDB()
    const { id } = await params
    const body = await request.json()

    const message = await Message.findByIdAndUpdate(id, body, { new: true })

    if (!message) {
      return NextResponse.json({ error: "Message not found" }, { status: 404 })
    }

    return NextResponse.json(message)
  } catch (error) {
    return NextResponse.json({ error: "Failed to update message" }, { status: 500 })
  }
}

// DELETE - Delete a message
export async function DELETE(request, { params }) {
  try {
    await connectDB()
    const { id } = await params

    const message = await Message.findByIdAndDelete(id)

    if (!message) {
      return NextResponse.json({ error: "Message not found" }, { status: 404 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete message" }, { status: 500 })
  }
}
