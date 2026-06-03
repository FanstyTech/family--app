"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { authClient } from "@/lib/auth-client"
import { GlassCard } from "@/components/ui/glass-card"
import { User, Mail, AlertTriangle, CheckCircle2, Loader2, ArrowRight } from "lucide-react"

type InviteStatus = "loading" | "valid" | "invalid" | "expired" | "used"

export default function JoinPage() {
  const { token } = useParams<{ token: string }>()
  const router = useRouter()

  const [status, setStatus] = useState<InviteStatus>("loading")
  const [inviteData, setInviteData] = useState<{ email?: string; role?: string } | null>(null)
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [submitting, setSubmitting] = useState(false)
  const [sent, setSent] = useState(false)

  useEffect(() => {
    fetch(`/api/invitations?token=${token}`)
      .then((r) => r.json())
      .then((data) => {
        if (data.valid) {
          setStatus("valid")
          setInviteData(data)
          if (data.email) setEmail(data.email)
        } else if (data.error === "Already used") {
          setStatus("used")
        } else if (data.error === "Expired") {
          setStatus("expired")
        } else {
          setStatus("invalid")
        }
      })
      .catch(() => setStatus("invalid"))
  }, [token])

  async function handleJoin(e: React.FormEvent) {
    e.preventDefault()
    setSubmitting(true)

    // Update name then send magic link
    await fetch("/api/invitations/complete", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token, name }),
    })

    const { error } = await authClient.signIn.magicLink({
      email,
      callbackURL: "/feed",
    })

    setSubmitting(false)
    if (!error) setSent(true)
  }

  const messages: Record<InviteStatus, { icon: any; title: string; text: string; color: string }> = {
    loading: { icon: Loader2, title: "جاري التحقق...", text: "نحن نتحقق من صحة رابط الدعوة الخاص بك", color: "text-[var(--color-accent)]" },
    invalid: { icon: AlertTriangle, title: "رابط غير صحيح", text: "هذا الرابط غير موجود أو تالف. يرجى التأكد من الرابط الصحيح", color: "text-red-400" },
    expired: { icon: AlertTriangle, title: "انتهت صلاحية الرابط", text: "صلاحية هذا الرابط قد انتهت. اطلب دعوة جديدة من مشرف العائلة", color: "text-amber-400" },
    used: { icon: CheckCircle2, title: "تم الاستخدام مسبقاً", text: "هذه الدعوة تم استخدامها بالفعل لإنشاء الحساب. يمكنك تسجيل الدخول مباشرة", color: "text-emerald-400" },
    valid: { icon: CheckCircle2, title: "دعوة صالحة", text: "", color: "" },
  }

  const CurrentIcon = messages[status]?.icon

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden bg-[var(--bg)] aurora">
      {/* Decorative Glow */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-1/3 right-1/4 w-90 h-90 bg-[var(--accent)]/10 rounded-full blur-[100px] animate-pulse" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30, filter: "blur(6px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-md relative z-10"
      >
        {status !== "valid" ? (
          <GlassCard className="p-8 text-center space-y-6 shadow-2xl border border-[var(--glass-border)]">
            <div className="flex justify-center">
              {status === "loading" ? (
                <Loader2 className="w-12 h-12 text-[var(--accent)] animate-spin" />
              ) : (
                <div className={`w-16 h-16 rounded-full bg-white/5 flex items-center justify-center border border-[var(--border)] ${messages[status]?.color}`}>
                  <CurrentIcon className="w-8 h-8" />
                </div>
              )}
            </div>
            <div className="space-y-2">
              <h1 className="text-2xl font-bold text-[var(--color-text)]">{messages[status]?.title}</h1>
              <p className="text-[var(--color-text-muted)] text-sm px-4 leading-relaxed">{messages[status]?.text}</p>
            </div>
            {(status === "used" || status === "expired" || status === "invalid") && (
              <div className="pt-2">
                <a
                  href="/login"
                  className="premium-btn-secondary w-full"
                >
                  <ArrowRight className="w-4 h-4" />
                  <span>صفحة تسجيل الدخول</span>
                </a>
              </div>
            )}
          </GlassCard>
        ) : !sent ? (
          <GlassCard className="p-8 md:p-10 space-y-8 shadow-2xl border border-[var(--glass-border)]">
            {/* Header */}
            <div className="text-center space-y-3">
              <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-tr from-[var(--accent)] to-[var(--accent-2)] flex items-center justify-center shadow-lg shadow-[var(--accent)]/30 text-3xl">
                🎉
              </div>
              <h1 className="text-3xl font-extrabold gradient-text">مرحباً بك في العائلة!</h1>
              <p className="text-[var(--color-text-muted)] text-sm">
                {inviteData?.role === "admin" ? "أنت تنضم كمدير للمجموعة" : "أنت تنضم كعضو في شجرة العائلة"}
              </p>
            </div>

            <form onSubmit={handleJoin} className="space-y-5">
              {/* Full Name */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-[var(--color-text-muted)] block">الاسم الكامل</label>
                <div className="relative">
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="محمد أحمد"
                    required
                    className="premium-input pr-11 text-right"
                  />
                  <User className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-text-faint)]" />
                </div>
              </div>

              {/* Email Address */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-[var(--color-text-muted)] block">البريد الإلكتروني</label>
                <div className="relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com"
                    required
                    disabled={!!inviteData?.email}
                    dir="ltr"
                    className="premium-input pl-11 text-left disabled:opacity-60"
                  />
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-text-faint)]" />
                </div>
              </div>

              <button
                type="submit"
                disabled={submitting || !name || !email}
                className="premium-btn-primary w-full h-12 mt-2"
              >
                {submitting ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    جاري إنشاء الحساب...
                  </span>
                ) : (
                  <>
                    <span>إنشاء الحساب والانضمام</span>
                    <ArrowRight className="w-4 h-4 rotate-180" />
                  </>
                )}
              </button>
            </form>
          </GlassCard>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <GlassCard className="p-8 text-center space-y-6 shadow-2xl border border-[var(--glass-border)]">
              <div className="w-16 h-16 mx-auto rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                <CheckCircle2 className="w-8 h-8 text-emerald-400 animate-bounce" />
              </div>
              <div className="space-y-2">
                <h1 className="text-2xl font-bold text-[var(--color-text)]">تفقد بريدك الإلكتروني!</h1>
                <p className="text-sm text-[var(--color-text-muted)] px-4 leading-relaxed">
                  تم إرسال رابط تفعيل الحساب إلى:
                  <br />
                  <span className="text-[var(--color-accent)] font-semibold mt-1 inline-block dir-ltr">{email}</span>
                </p>
              </div>
            </GlassCard>
          </motion.div>
        )}
      </motion.div>
    </div>
  )
}
