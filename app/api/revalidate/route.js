import { revalidatePath } from "next/cache"

export async function GET(request) {
  const secret = request.nextUrl.searchParams.get("secret")
  
  if (secret !== process.env.REVALIDATE_SECRET) {
    return Response.json({ message: "Invalid secret" }, { status: 401 })
  }

  try {
    revalidatePath("/projects")
    revalidatePath("/skills") 

    return Response.json({ revalidated: true })
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 })
  }
}
