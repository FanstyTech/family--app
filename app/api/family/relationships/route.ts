import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { db } from "@/lib/db"
import { familyTree, marriages } from "@/lib/db/schema"
import { eq, and } from "drizzle-orm"
import { headers } from "next/headers"

// GET all relationships (parent-child + marriages)
export async function GET() {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const [parentChild, marriageList] = await Promise.all([
    db.select().from(familyTree).where(eq(familyTree.depth, 1)),
    db.select().from(marriages),
  ])

  return NextResponse.json({ parentChild, marriages: marriageList })
}

// POST — add parent-child OR marriage
export async function POST(req: NextRequest) {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const body = await req.json()
  const { type, parentId, childId, person1Id, person2Id, marriageDate } = body

  if (type === "parent-child") {
    const ancestors = await db
      .select()
      .from(familyTree)
      .where(eq(familyTree.descendant, parentId))

    await db.insert(familyTree).values(
      ancestors.map((a) => ({ ancestor: a.ancestor, descendant: childId, depth: a.depth + 1 }))
    ).onConflictDoNothing()

    return NextResponse.json({ ok: true })
  }

  if (type === "marriage") {
    const [marriage] = await db.insert(marriages).values({
      person1Id, person2Id, marriageDate,
    }).returning()
    return NextResponse.json(marriage)
  }

  return NextResponse.json({ error: "Invalid type" }, { status: 400 })
}
