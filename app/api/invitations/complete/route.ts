import { NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/db"
import { invitations } from "@/lib/db/schema"
import { eq } from "drizzle-orm"

export async function POST(req: NextRequest) {
  const { token, name } = await req.json()
  if (!token || !name) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 })
  }

  const [invite] = await db
    .select()
    .from(invitations)
    .where(eq(invitations.token, token))

  if (!invite || invite.usedAt || invite.expiresAt < new Date()) {
    return NextResponse.json({ error: "Invalid or expired token" }, { status: 410 })
  }

  await db
    .update(invitations)
    .set({ usedAt: new Date() })
    .where(eq(invitations.token, token))

  return NextResponse.json({ ok: true, role: invite.role })
}
