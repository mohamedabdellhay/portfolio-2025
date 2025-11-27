// app/api/auth/login/route.js
import { NextResponse } from "next/server"
import { connectDB } from "@/lib/db"
import User from "@/models/User"
import { signToken } from "@/utils/jwt"

export async function POST(request) {
  try {
    await connectDB()
    const { email, password } = await request.json()

    if (!email || !password) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const user = await User.findOne({ email })
    if (!user) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
    }

    const isMatch = await user.comparePassword(password)
    if (!isMatch) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
    }

    const token = await signToken({ userId: user._id.toString(), email: user.email })

    const response = NextResponse.json(
      { message: "Login successful", user: { name: user.name, email: user.email } },
      { status: 200 },
    )

    response.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24, // 1 day
      path: "/",
    })

    response.cookies.set("isLoggedIn", "true", {
      httpOnly: false,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24,
      path: "/",
    })

    return response
  } catch (error) {
    console.error("Login error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
