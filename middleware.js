// middleware.js
import { NextResponse } from "next/server"
import { jwtVerify } from "jose"

const protectedPaths = ["/dashboard", "/api/auth/me"]

export async function middleware(request) {
  const { pathname } = request.nextUrl

  // Check if the path is protected
  if (protectedPaths.some((path) => pathname.startsWith(path))) {
    const token = request.cookies.get("token")?.value || request.headers.get("Authorization")?.split(" ")[1]

    if (!token) {
      console.log("[v0] No token found, redirecting to login")
      if (pathname.startsWith("/api")) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
      }
      return NextResponse.redirect(new URL("/login", request.url))
    }

    try {
      const secret = new TextEncoder().encode(process.env.JWT_SECRET || "super-secret-key-change-this")
      const { payload } = await jwtVerify(token, secret)

      console.log("[v0] Token verified successfully, userId:", payload.userId)

      const requestHeaders = new Headers(request.headers)
      requestHeaders.set("x-user-id", payload.userId)

      return NextResponse.next({
        request: {
          headers: requestHeaders,
        },
      })
    } catch (error) {
      console.log("[v0] Token verification failed:", error.message)
      if (pathname.startsWith("/api")) {
        return NextResponse.json({ error: "Invalid token" }, { status: 401 })
      }
      return NextResponse.redirect(new URL("/login", request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/dashboard/:path*", "/api/auth/me"],
}
