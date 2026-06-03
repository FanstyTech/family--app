import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { db } from "@/lib/db"
import { invitations, profiles } from "@/lib/db/schema"
import { eq } from "drizzle-orm"
import { Resend } from "resend"
import { randomBytes } from "crypto"
import { headers } from "next/headers"

const resend = new Resend(process.env.RESEND_API_KEY || "re_placeholder")

// POST /api/invitations — create invite (admin only)
export async function POST(req: NextRequest) {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const [profile] = await db
    .select()
    .from(profiles)
    .where(eq(profiles.id, session.user.id))

  if (profile?.role !== "admin") {
    return NextResponse.json({ error: "Admins only" }, { status: 403 })
  }

  const body = await req.json()
  const { email, role = "member" } = body

  const token = randomBytes(32).toString("hex")
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 days

  await db.insert(invitations).values({
    token,
    email,
    role,
    createdBy: session.user.id,
    expiresAt,
  })

  const inviteUrl = `${process.env.NEXT_PUBLIC_APP_URL}/join/${token}`

  if (email) {
    await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL ?? "noreply@example.com",
      to: email,
      subject: "دعوة للانضمام إلى تطبيق العائلة",
      html: `
        <div dir="rtl" style="font-family: Arial; max-width: 500px; margin: 0 auto; padding: 24px;">
          <h2 style="color: #7c3aed;">تمت دعوتك للانضمام إلى تطبيق العائلة 🎉</h2>
          <p>اضغط على الزر أدناه لإنشاء حسابك:</p>
          <a href="${inviteUrl}" style="
            display: inline-block;
            background: linear-gradient(135deg, #7c3aed, #2563eb);
            color: white;
            padding: 12px 32px;
            border-radius: 8px;
            text-decoration: none;
            font-weight: bold;
            margin: 16px 0;
          ">
            انضم الآن
          </a>
          <p style="color: #666; font-size: 14px;">الرابط صالح لمدة 7 أيام.</p>
        </div>
      `,
    })
  }

  return NextResponse.json({ token, inviteUrl })
}

// GET /api/invitations?token=xxx — validate token
export async function GET(req: NextRequest) {
  const token = req.nextUrl.searchParams.get("token")
  if (!token) return NextResponse.json({ error: "Missing token" }, { status: 400 })

  const [invite] = await db
    .select()
    .from(invitations)
    .where(eq(invitations.token, token))

  if (!invite) return NextResponse.json({ error: "Invalid token" }, { status: 404 })
  if (invite.usedAt) return NextResponse.json({ error: "Already used" }, { status: 410 })
  if (invite.expiresAt < new Date()) return NextResponse.json({ error: "Expired" }, { status: 410 })

  return NextResponse.json({ valid: true, email: invite.email, role: invite.role })
}
