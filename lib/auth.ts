import { betterAuth } from "better-auth"
import { drizzleAdapter } from "better-auth/adapters/drizzle"
import { magicLink } from "better-auth/plugins"
import { Resend } from "resend"
import { db } from "./db"
import { user, session, account, verification, profiles } from "./db/schema"

const resend = new Resend(process.env.RESEND_API_KEY || "re_placeholder")

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
    schema: { user, session, account, verification },
  }),
  plugins: [
    magicLink({
      sendMagicLink: async ({ email, url }) => {
        console.log("[magic-link] sending to:", email, "url:", url)
        const result = await resend.emails.send({
          from: process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev",
          to: email,
          subject: "تسجيل الدخول إلى تطبيق العائلة",
          html: `
            <div dir="rtl" style="font-family: Arial; max-width: 500px; margin: 0 auto; padding: 24px;">
              <h2 style="color: #7c3aed;">مرحباً بك في تطبيق العائلة 👨‍👩‍👧‍👦</h2>
              <p>اضغط على الزر أدناه لتسجيل الدخول:</p>
              <a href="${url}" style="
                display: inline-block;
                background: linear-gradient(135deg, #7c3aed, #2563eb);
                color: white;
                padding: 12px 32px;
                border-radius: 8px;
                text-decoration: none;
                font-weight: bold;
                margin: 16px 0;
              ">تسجيل الدخول</a>
              <p style="color: #666; font-size: 14px;">الرابط صالح لمدة 10 دقائق فقط.</p>
            </div>
          `,
        })
        console.log("[magic-link] resend result:", JSON.stringify(result))
      },
    }),
  ],
  databaseHooks: {
    user: {
      create: {
        after: async (newUser) => {
          await db.insert(profiles).values({
            id: newUser.id,
            fullName: newUser.name ?? "",
          })
        },
      },
    },
  },
})

export type Session = typeof auth.$Infer.Session
