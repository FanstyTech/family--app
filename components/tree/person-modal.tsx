"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Save, Trash2, UserPlus, UserCog } from "lucide-react"
import type { FamilyMember } from "./person-node"

type Props = {
  open: boolean
  onClose: () => void
  member?: FamilyMember | null
  parentName?: string
  onSave: (data: Partial<FamilyMember>) => Promise<void>
  onDelete?: () => Promise<void>
}

export function PersonModal({ open, onClose, member, parentName, onSave, onDelete }: Props) {
  const [form, setForm]       = useState({ fullName: "", gender: "", birthDate: "", deathDate: "" })
  const [saving, setSaving]   = useState(false)
  const [deleting, setDeleting] = useState(false)
  const isEdit = !!member

  useEffect(() => {
    setForm(member
      ? { fullName: member.fullName ?? "", gender: member.gender ?? "", birthDate: member.birthDate ?? "", deathDate: member.deathDate ?? "" }
      : { fullName: "", gender: "", birthDate: "", deathDate: "" }
    )
  }, [member, open])

  async function handleSave() {
    if (!form.fullName.trim()) return
    setSaving(true)
    await onSave({ fullName: form.fullName, gender: (form.gender || null) as FamilyMember["gender"], birthDate: form.birthDate || null, deathDate: form.deathDate || null })
    setSaving(false)
    onClose()
  }

  async function handleDelete() {
    if (!onDelete || !confirm("حذف هذا الشخص نهائياً؟")) return
    setDeleting(true)
    await onDelete()
    setDeleting(false)
    onClose()
  }

  const genderColor = form.gender === "male" ? "#3b82f6" : form.gender === "female" ? "#d946ef" : "var(--accent)"

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            className="absolute inset-0 bg-black/70 backdrop-blur-md"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={onClose}
          />

          <motion.div
            className="relative w-full max-w-sm z-10 rounded-2xl overflow-hidden shadow-2xl"
            style={{ background: "var(--surface)", border: "1px solid var(--glass-border)" }}
            initial={{ opacity: 0, scale: 0.88, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.88, y: 24 }}
            transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
          >
            {/* Colored top bar */}
            <div className="h-1 w-full" style={{ background: `linear-gradient(90deg, ${genderColor}, var(--accent-2))` }} />

            {/* Header */}
            <div className="flex items-center gap-3 px-5 py-4 border-b border-[var(--border)]">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                style={{ background: `${genderColor}20`, border: `1px solid ${genderColor}30` }}>
                {isEdit ? <UserCog className="w-4 h-4" style={{ color: genderColor }} />
                        : <UserPlus className="w-4 h-4" style={{ color: genderColor }} />}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-[var(--text)]">
                  {isEdit ? "تعديل بيانات الفرد" : "إضافة فرد جديد"}
                </p>
                {parentName && (
                  <p className="text-xs text-[var(--text-muted)] truncate">
                    ابن/ابنة: <span style={{ color: genderColor }}>{parentName}</span>
                  </p>
                )}
              </div>
              <button onClick={onClose}
                className="w-8 h-8 rounded-xl flex items-center justify-center text-[var(--text-faint)]
                  hover:text-[var(--text)] hover:bg-[var(--surface-2)] transition-all shrink-0">
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Body */}
            <div className="px-5 py-5 space-y-4">
              {/* Name */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-semibold text-[var(--text-muted)] uppercase tracking-wide">
                  الاسم الكامل *
                </label>
                <input
                  value={form.fullName}
                  onChange={e => setForm(f => ({ ...f, fullName: e.target.value }))}
                  placeholder="مثال: عبدالله بن محمد"
                  autoFocus
                  className="w-full px-3.5 py-2.5 rounded-xl text-sm text-[var(--text)]
                    bg-[var(--surface-2)] border border-[var(--border)]
                    placeholder:text-[var(--text-faint)]
                    focus:outline-none focus:ring-2 transition-all"
                  style={{ "--tw-ring-color": genderColor + "40" } as React.CSSProperties}
                />
              </div>

              {/* Gender */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-semibold text-[var(--text-muted)] uppercase tracking-wide">الجنس</label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { value: "male",   label: "ذكر",  color: "#3b82f6", icon: "👨" },
                    { value: "female", label: "أنثى", color: "#d946ef", icon: "👩" },
                  ].map(opt => (
                    <button key={opt.value} type="button"
                      onClick={() => setForm(f => ({ ...f, gender: f.gender === opt.value ? "" : opt.value }))}
                      className="flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-semibold
                        border transition-all duration-200"
                      style={form.gender === opt.value
                        ? { background: opt.color + "15", borderColor: opt.color + "50", color: opt.color }
                        : { background: "var(--surface-2)", borderColor: "var(--border)", color: "var(--text-muted)" }
                      }
                    >
                      <span>{opt.icon}</span>
                      <span>{opt.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Dates */}
              <div className="grid grid-cols-2 gap-3">
                {[
                  { key: "birthDate", label: "الميلاد" },
                  { key: "deathDate", label: "الوفاة"  },
                ].map(({ key, label }) => (
                  <div key={key} className="space-y-1.5">
                    <label className="text-[11px] font-semibold text-[var(--text-muted)] uppercase tracking-wide">
                      {label}
                    </label>
                    <input type="date" dir="ltr"
                      value={form[key as keyof typeof form]}
                      onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))}
                      className="w-full px-3 py-2.5 rounded-xl text-xs text-[var(--text)]
                        bg-[var(--surface-2)] border border-[var(--border)]
                        focus:outline-none focus:ring-2 transition-all"
                      style={{ "--tw-ring-color": genderColor + "30" } as React.CSSProperties}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Footer */}
            <div className="px-5 pb-5 flex gap-2">
              {isEdit && onDelete && (
                <button onClick={handleDelete} disabled={deleting}
                  className="h-10 px-3.5 rounded-xl text-xs font-semibold flex items-center gap-1.5
                    text-red-400 border border-red-500/20 hover:bg-red-500/8 transition-all disabled:opacity-50">
                  <Trash2 className="w-3.5 h-3.5" />
                  {deleting ? "..." : "حذف"}
                </button>
              )}
              <button onClick={onClose}
                className="flex-1 h-10 rounded-xl text-xs font-semibold text-[var(--text-muted)]
                  bg-[var(--surface-2)] hover:bg-[var(--surface-3)] border border-[var(--border)] transition-all">
                إلغاء
              </button>
              <button onClick={handleSave} disabled={saving || !form.fullName.trim()}
                className="flex-1 h-10 rounded-xl text-xs font-bold text-white flex items-center justify-center gap-1.5
                  transition-all disabled:opacity-40"
                style={{ background: `linear-gradient(135deg, var(--accent), ${genderColor})` }}>
                <Save className="w-3.5 h-3.5" />
                {saving ? "..." : isEdit ? "حفظ" : "إضافة"}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
