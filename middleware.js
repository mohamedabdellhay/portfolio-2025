// middleware.js
import { NextResponse } from "next/server";
import { verifyToken } from "./utils/jwt";

// Paths that require authentication
const protectedPaths = [ "/api/auth/me"];

export function middleware(request) {
  const { pathname } = request.nextUrl;

  // Check if the path is protected
  if (protectedPaths.some((path) => pathname.startsWith(path))) {
    const token = request.cookies.get("token")?.value || request.headers.get("Authorization")?.split(" ")[1];

    if (!token) {
      if (pathname.startsWith("/api")) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }
      return NextResponse.redirect(new URL("/login", request.url));
    }

    const decoded = verifyToken(token);
    if (!decoded) {
      if (pathname.startsWith("/api")) {
        return NextResponse.json({ error: "Invalid token" }, { status: 401 });
      }
      return NextResponse.redirect(new URL("/login", request.url));
    }
    
    // Token is valid, proceed
    // Note: In Next.js middleware we can't easily modify the request object to pass data to the route handler directly
    // typically we rely on the route handler to also verify or just trust the cookie if we validated it here.
    // For API routes, we might want to pass headers.
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set("x-user-id", decoded.userId);
    
    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/api/auth/me"],
};
