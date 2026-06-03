import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { db } from "@/lib/db"
import { familyMembers, familyTree } from "@/lib/db/schema"
import { eq } from "drizzle-orm"
import { headers } from "next/headers"

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const { id } = await params
  const body = await req.json()

  const [updated] = await db
    .update(familyMembers)
    .set({
      fullName:  body.fullName,
      gender:    body.gender,
      birthDate: body.birthDate,
      deathDate: body.deathDate,
      bio:       body.bio,
      avatarUrl: body.avatarUrl,
    })
    .where(eq(familyMembers.id, id))
    .returning()

  return NextResponse.json(updated)
}

export async function DELETE(_: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const { id } = await params

  await db.delete(familyTree).where(eq(familyTree.ancestor, id))
  await db.delete(familyTree).where(eq(familyTree.descendant, id))
  await db.delete(familyMembers).where(eq(familyMembers.id, id))

  return NextResponse.json({ ok: true })
}
