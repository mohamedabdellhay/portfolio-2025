// utils/jwt.js
import { SignJWT, jwtVerify } from "jose"

const JWT_SECRET = process.env.JWT_SECRET || "super-secret-key-change-this"

export async function signToken(payload) {
  const secret = new TextEncoder().encode(JWT_SECRET)
  const token = await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("1d")
    .setIssuedAt()
    .sign(secret)
  return token
}

export async function verifyToken(token) {
  try {
    const secret = new TextEncoder().encode(JWT_SECRET)
    const { payload } = await jwtVerify(token, secret)
    return payload
  } catch {
    return null
  }
}
