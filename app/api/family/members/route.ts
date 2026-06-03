import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { db } from "@/lib/db"
import { familyMembers, familyTree } from "@/lib/db/schema"
import { eq } from "drizzle-orm"
import { headers } from "next/headers"

export async function GET() {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const members = await db.select().from(familyMembers)
  return NextResponse.json(members)
}

export async function POST(req: NextRequest) {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const body = await req.json()
  const { fullName, gender, birthDate, deathDate, bio, avatarUrl, parentId } = body

  if (!fullName) return NextResponse.json({ error: "fullName required" }, { status: 400 })

  const [member] = await db.insert(familyMembers).values({
    fullName, gender, birthDate, deathDate, bio, avatarUrl,
  }).returning()

  // Self-reference row
  await db.insert(familyTree).values({ ancestor: member.id, descendant: member.id, depth: 0 })

  // Connect to parent if provided
  if (parentId) {
    const ancestors = await db
      .select()
      .from(familyTree)
      .where(eq(familyTree.descendant, parentId))

    await db.insert(familyTree).values([
      ...ancestors.map((a) => ({ ancestor: a.ancestor, descendant: member.id, depth: a.depth + 1 })),
    ])
  }

  return NextResponse.json(member)
}
