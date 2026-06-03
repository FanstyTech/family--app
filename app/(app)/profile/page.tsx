"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { GlassCard } from "@/components/ui/glass-card"
import { 
  User, 
  Settings, 
  Calendar, 
  Award, 
  ShieldAlert, 
  Copy, 
  Check, 
  Mail, 
  Link as LinkIcon, 
  Eye,
  Camera,
  LogOut
} from "lucide-react"

export default function ProfilePage() {
  // Profile form state
  const [fullName, setFullName] = useState("عبد الرحمن أحمد")
  const [role, setRole] = useState("admin") // admin, member
  const [gender, setGender] = useState("male")
  const [birthDate, setBirthDate] = useState("1982-10-15")
  const [bio, setBio] = useState("مهندس برمجيات، أب لثلاثة أطفال رائعين، أحب قضاء عطلة نهاية الأسبوع مع عائلتي في المزرعة.")
  const [saving, setSaving] = useState(false)
  const [savedSuccess, setSavedSuccess] = useState(false)

  // Invitation generation state
  const [inviteEmail, setInviteEmail] = useState("")
  const [inviteRole, setInviteRole] = useState("member")
  const [generatedLink, setGeneratedLink] = useState("")
  const [copied, setCopied] = useState(false)
  const [generating, setGenerating] = useState(false)

  // Handle Profile Update
  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setSavedSuccess(false)
    
    setTimeout(() => {
      setSaving(false)
      setSavedSuccess(true)
      setTimeout(() => setSavedSuccess(false), 3000)
    }, 1200)
  }

  // Handle Invitation Generation
  const handleGenerateInvite = (e: React.FormEvent) => {
    e.preventDefault()
    setGenerating(true)
    
    setTimeout(() => {
      const mockToken = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
      const mockLink = `${window.location.origin}/join/${mockToken}`
      setGeneratedLink(mockLink)
      setGenerating(false)
    }, 1000)
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedLink)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="space-y-8 pb-8">
      {/* Header */}
      <div className="space-y-1">
        <h1 className="text-3xl font-extrabold tracking-tight gradient-text">ملفي الشخصي</h1>
        <p className="text-[var(--color-text-muted)] text-sm">تعديل بياناتك والتحكم في إعدادات الحساب</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column - Card & Statistics */}
        <div className="space-y-6 lg:col-span-1">
          <GlassCard className="p-6 text-center border border-[var(--glass-border)] shadow-xl relative overflow-hidden group">
            {/* Ambient background glow */}
            <div className="absolute -top-10 -left-10 w-24 h-24 bg-[var(--accent)]/10 rounded-full blur-2xl pointer-events-none" />
            
            {/* Avatar with Halo Glow */}
            <div className="relative w-24 h-24 mx-auto mb-4 group/avatar">
              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-[var(--accent)] to-[var(--accent-2)] animate-pulse opacity-45 blur-md" />
              <div className="w-24 h-24 rounded-full border-2 border-[var(--accent)] bg-[var(--surface-2)] flex items-center justify-center text-4xl font-bold relative z-10 overflow-hidden shadow-xl">
                👨
              </div>
              <button className="absolute bottom-0 left-0 w-8 h-8 rounded-full bg-[var(--surface-3)] border border-[var(--border)] flex items-center justify-center text-white z-20 hover:bg-[var(--accent)] hover:text-white transition-all shadow-md">
                <Camera className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Profile Info */}
            <h2 className="font-bold text-lg text-[var(--color-text)]">{fullName}</h2>
            <p className="text-xs text-[var(--color-text-muted)] mt-1 flex items-center justify-center gap-1">
              <ShieldAlert className="w-3.5 h-3.5 text-[var(--accent)]" />
              <span>{role === "admin" ? "مدير العائلة (Admin)" : "عضو العائلة"}</span>
            </p>

            {/* Quick statistics */}
            <div className="grid grid-cols-2 gap-3 mt-6 pt-6 border-t border-[var(--border)] text-xs">
              <div className="p-3.5 rounded-xl bg-[var(--surface-2)] border border-[var(--border)] text-center space-y-1">
                <span className="text-[var(--color-text-muted)] text-[10px] block">تاريخ الانضمام</span>
                <span className="font-semibold text-[var(--color-text)]">يونيو 2026</span>
              </div>
              <div className="p-3.5 rounded-xl bg-[var(--surface-2)] border border-[var(--border)] text-center space-y-1">
                <span className="text-[var(--color-text-muted)] text-[10px] block">المشاركات والذكريات</span>
                <span className="font-semibold text-[var(--color-text)]">14 مشاركة</span>
              </div>
            </div>
          </GlassCard>
        </div>

        {/* Right Column - Edit Form & Admin Panel */}
        <div className="space-y-6 lg:col-span-2">
          
          {/* Profile Edit Form */}
          <GlassCard className="p-6 md:p-8 border border-[var(--glass-border)] shadow-xl space-y-6">
            <h3 className="text-lg font-bold text-[var(--color-text)] flex items-center gap-2 border-b border-[var(--border)] pb-3">
              <Settings className="w-5 h-5 text-[var(--accent)]" />
              <span>تعديل المعلومات الشخصية</span>
            </h3>

            <form onSubmit={handleSave} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Full Name */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-[var(--color-text-muted)]">الاسم الكامل *</label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                    className="premium-input text-sm"
                  />
                </div>

                {/* Birthdate */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-[var(--color-text-muted)]">تاريخ الميلاد *</label>
                  <input
                    type="date"
                    value={birthDate}
                    onChange={(e) => setBirthDate(e.target.value)}
                    required
                    dir="ltr"
                    className="premium-input text-sm text-left"
                  />
                </div>
              </div>

              {/* Bio */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[var(--color-text-muted)]">النبذة والتعريف الشخصي</label>
                <textarea
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  rows={3}
                  className="premium-input text-sm resize-none"
                  placeholder="اكتب شيئاً عن نفسك..."
                />
              </div>

              {/* Gender */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[var(--color-text-muted)]">الجنس</label>
                <div className="flex gap-2">
                  {[
                    { key: "male", label: "👨 ذكر" },
                    { key: "female", label: "👩 أنثى" }
                  ].map(opt => (
                    <button
                      key={opt.key}
                      type="button"
                      onClick={() => setGender(opt.key)}
                      className={`flex-1 py-2.5 rounded-xl text-xs font-semibold border transition-all ${
                        gender === opt.key
                          ? "bg-[var(--accent)]/10 border-[var(--accent)]/30 text-[var(--color-accent)]"
                          : "bg-[var(--surface-2)] border-[var(--border)] text-[var(--color-text-muted)] hover:bg-[var(--surface-3)]"
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex gap-2 items-center pt-2">
                <button
                  type="submit"
                  disabled={saving}
                  className="premium-btn-primary py-2.5 px-6 text-xs flex items-center gap-1.5 shadow-md"
                >
                  {saving ? (
                    <>
                      <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>جاري الحفظ...</span>
                    </>
                  ) : (
                    <span>حفظ التعديلات</span>
                  )}
                </button>
                
                <AnimatePresence>
                  {savedSuccess && (
                    <motion.span 
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0 }}
                      className="text-xs text-emerald-400 font-semibold flex items-center gap-1"
                    >
                      <Check className="w-4 h-4" />
                      <span>تم حفظ البيانات بنجاح!</span>
                    </motion.span>
                  )}
                </AnimatePresence>
              </div>
            </form>
          </GlassCard>

          {/* Admin Tools - Invitation Link Generator */}
          {role === "admin" && (
            <GlassCard className="p-6 md:p-8 border border-[var(--glass-border)] shadow-xl space-y-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--accent-2)]/5 rounded-full blur-2xl pointer-events-none" />
              
              <h3 className="text-lg font-bold text-[var(--color-text)] flex items-center gap-2 border-b border-[var(--border)] pb-3">
                <Award className="w-5 h-5 text-[var(--accent-2)]" />
                <span>لوحة التحكم والدعوات (خاص بالمدراء)</span>
              </h3>

              <p className="text-xs text-[var(--color-text-muted)] leading-relaxed">
                بصفتك مديراً للعائلة، يمكنك توليد رابط دعوة لمشاركته مع أفراد العائلة لينضموا إلى التطبيق مباشرة.
              </p>

              <form onSubmit={handleGenerateInvite} className="space-y-4 pt-1">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="sm:col-span-2 space-y-1.5">
                    <label className="text-xs font-semibold text-[var(--color-text-muted)]">البريد الإلكتروني للمدعو (اختياري)</label>
                    <div className="relative">
                      <input
                        type="email"
                        value={inviteEmail}
                        onChange={(e) => setInviteEmail(e.target.value)}
                        placeholder="name@email.com"
                        dir="ltr"
                        className="premium-input pl-11 text-left text-sm"
                      />
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-text-faint)]" />
                    </div>
                  </div>
                  
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-[var(--color-text-muted)]">الصلاحية</label>
                    <select
                      value={inviteRole}
                      onChange={(e) => setInviteRole(e.target.value)}
                      className="premium-input text-sm"
                    >
                      <option value="member">عضو عادي</option>
                      <option value="admin">مدير (Admin)</option>
                    </select>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={generating}
                  className="premium-btn-primary bg-gradient-to-r from-[var(--accent-2)] to-[var(--accent-3)] py-2.5 px-6 text-xs shadow-md shadow-[var(--accent-2)]/10"
                >
                  {generating ? (
                    <span className="flex items-center gap-1">
                      <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>جاري توليد الرابط...</span>
                    </span>
                  ) : (
                    <span>توليد رابط الدعوة</span>
                  )}
                </button>
              </form>

              {/* Generated Invite Link */}
              <AnimatePresence>
                {generatedLink && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="p-4 rounded-xl bg-[var(--surface-2)] border border-[var(--border)] space-y-3"
                  >
                    <label className="text-xs font-bold text-[var(--color-text-muted)] flex items-center gap-1.5">
                      <LinkIcon className="w-3.5 h-3.5 text-[var(--accent-2)]" />
                      <span>رابط الدعوة المولد بنجاح:</span>
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={generatedLink}
                        readOnly
                        dir="ltr"
                        className="premium-input text-xs pl-4 bg-[var(--surface-3)] font-mono flex-1 select-all"
                      />
                      <button
                        onClick={handleCopy}
                        className={`px-4 rounded-xl flex items-center justify-center border transition-all ${
                          copied 
                            ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400"
                            : "bg-[var(--surface-3)] border-[var(--border)] text-[var(--color-text-muted)] hover:text-[var(--color-text)]"
                        }`}
                        title="نسخ الرابط"
                      >
                        {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                      </button>
                    </div>
                    <p className="text-[10px] text-[var(--color-text-faint)] leading-normal">
                      * صلاحية هذا الرابط 7 أيام فقط. يمكن استخدامه لمرة واحدة فقط لإنشاء حساب عائلي آمن.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </GlassCard>
          )}

        </div>
      </div>
    </div>
  )
}
