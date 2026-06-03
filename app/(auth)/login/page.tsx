"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { authClient } from "@/lib/auth-client"
import { GlassCard } from "@/components/ui/glass-card"
import { Mail, CheckCircle2, AlertCircle, ArrowRight } from "lucide-react"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError("")

    const { error: err } = await authClient.signIn.magicLink({
      email,
      callbackURL: "/feed",
    })

    setLoading(false)
    if (err) {
      setError("حدث خطأ أثناء إرسال الرابط، يرجى المحاولة مجدداً")
    } else {
      setSent(true)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden bg-[var(--bg)] aurora">
      {/* Decorative Glow Spots */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-[var(--accent)]/10 rounded-full blur-[100px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[var(--accent-2)]/10 rounded-full blur-[120px] animate-pulse" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30, filter: "blur(6px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-md relative z-10"
      >
        <GlassCard className="p-8 md:p-10 space-y-8 shadow-2xl border border-[var(--glass-border)]">
          {/* Logo / Header */}
          <div className="text-center space-y-3">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-tr from-[var(--accent)] to-[var(--accent-2)] flex items-center justify-center shadow-lg shadow-[var(--accent)]/30 text-3xl">
              👨‍👩‍👧‍👦
            </div>
            <h1 className="text-3xl font-extrabold tracking-tight gradient-text">عائلتنا</h1>
            <p className="text-[var(--color-text-muted)] text-sm">
              مساحة رقمية خاصة تشرق بوجود عائلتنا
            </p>
          </div>

          <AnimatePresence mode="wait">
            {!sent ? (
              <motion.form
                key="form"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                onSubmit={handleSubmit}
                className="space-y-5"
              >
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-[var(--color-text-muted)] block">
                    البريد الإلكتروني
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@example.com"
                      required
                      dir="ltr"
                      className="premium-input pl-11 text-left"
                    />
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-text-faint)]" />
                  </div>
                </div>

                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-2 p-3.5 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs justify-center"
                  >
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{error}</span>
                  </motion.div>
                )}

                <button
                  type="submit"
                  disabled={loading || !email}
                  className="premium-btn-primary w-full h-12"
                >
                  {loading ? (
                    <span className="flex items-center justify-center gap-2">
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      جاري إرسال الرابط...
                    </span>
                  ) : (
                    <>
                      <span>إرسال رابط الدخول الآمن</span>
                      <ArrowRight className="w-4 h-4 rotate-180" />
                    </>
                  )}
                </button>
              </motion.form>
            ) : (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="text-center space-y-4 py-4"
              >
                <div className="w-16 h-16 mx-auto rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                  <CheckCircle2 className="w-8 h-8 text-emerald-400" />
                </div>
                <div className="space-y-1.5">
                  <p className="font-semibold text-lg text-[var(--color-text)]">تفقد بريدك الإلكتروني!</p>
                  <p className="text-sm text-[var(--color-text-muted)] px-4 leading-relaxed">
                    أرسلنا رابط تسجيل الدخول الآمن إلى:
                    <br />
                    <span className="text-[var(--color-accent)] font-medium dir-ltr inline-block mt-1">{email}</span>
                  </p>
                </div>
                <div className="pt-2">
                  <button
                    onClick={() => { setSent(false); setEmail("") }}
                    className="text-xs text-[var(--color-text-muted)] hover:text-[var(--color-text)] underline underline-offset-4 transition-colors"
                  >
                    إرسال إلى بريد آخر
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </GlassCard>

        {/* Footer Invite Link */}
        <p className="text-center text-xs text-[var(--color-text-faint)] mt-6">
          لديك رمز دعوة؟{" "}
          <a href="/join" className="text-[var(--color-accent)] font-semibold hover:underline transition-all">
            انضم بالرابط هنا
          </a>
        </p>
      </motion.div>
    </div>
  )
}
