"use client"

import { Handle, Position } from "reactflow"
import { memo } from "react"
import { cn } from "@/lib/utils"
import { Plus, Flame } from "lucide-react"

export type FamilyMember = {
  id: string
  fullName: string
  gender: "male" | "female" | null
  birthDate: string | null
  deathDate: string | null
  avatarUrl: string | null
}

type Props = {
  data: {
    member: FamilyMember
    onEdit: (m: FamilyMember) => void
    onAddChild: (m: FamilyMember) => void
  }
  selected: boolean
}

// First letters of name — formal initials
function initials(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean)
  if (parts.length === 0) return "؟"
  if (parts.length === 1) return parts[0].slice(0, 1)
  return parts[0][0] + parts[1][0]
}

export const PersonNode = memo(({ data, selected }: Props) => {
  const { member, onEdit, onAddChild } = data
  const isMale   = member.gender === "male"
  const isFemale = member.gender === "female"
  const isDead   = !!member.deathDate

  const yr = (d: string | null) => d ? new Date(d).getFullYear() : null
  const birth = yr(member.birthDate)
  const death = yr(member.deathDate)

  const c1 = isMale ? "#3b6fb5" : isFemale ? "#a8487e" : "#6d5bb5"
  const c2 = isMale ? "#4a90c2" : isFemale ? "#c45a96" : "#8b6fc4"

  const handleStyle: React.CSSProperties = {
    background: c1,
    border: "2px solid var(--surface)",
    width: 12,
    height: 12,
    zIndex: 50,
  }

  return (
    <div
      className={cn(
        "group relative w-[158px] cursor-pointer transition-all duration-200",
        isDead && "opacity-70"
      )}
    >
      {/* Top handle (target — لاستقبال الربط من الأب) */}
      <Handle type="target" position={Position.Top}
        style={{ ...handleStyle, top: -6 }}
        className="hover:!scale-125 transition-transform" />

      {/* Card body — الكليك هنا للتعديل (مش على كامل المساحة) */}
      <div
        onClick={() => onEdit(member)}
        className="relative flex items-center gap-2 rounded-2xl px-2 py-1.5 transition-colors duration-200 overflow-hidden"
        style={{
          background: "var(--surface)",
          border: `1.5px solid ${selected ? c1 : "var(--glass-border)"}`,
          boxShadow: selected
            ? `0 0 0 3px ${c1}30, 0 8px 22px ${c1}30`
            : "0 4px 14px rgba(0,0,0,0.25)",
        }}
      >
        {/* Accent edge */}
        <div className="absolute top-1.5 bottom-1.5 right-0 w-[3px] rounded-full"
          style={{ background: `linear-gradient(${c1}, ${c2})` }} />

        {/* Avatar — initials */}
        <div className="relative shrink-0">
          <div className="relative w-9 h-9 rounded-full overflow-hidden z-10 flex items-center justify-center"
            style={{
              background: member.avatarUrl ? "var(--surface-2)" : `linear-gradient(135deg, ${c1}, ${c2})`,
              border: `1.5px solid ${c1}55`,
            }}>
            {member.avatarUrl
              ? <img src={member.avatarUrl} className="w-full h-full object-cover" alt={member.fullName} loading="lazy" />
              : <span className="text-[13px] font-bold text-white select-none">{initials(member.fullName)}</span>
            }
          </div>
          {isDead && (
            <div className="absolute -bottom-0.5 -left-0.5 w-4 h-4 rounded-full z-20 flex items-center justify-center"
              style={{ background: "var(--surface)", border: "1px solid var(--border)" }}>
              <Flame className="w-2 h-2 text-amber-400" />
            </div>
          )}
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0 text-right pl-0.5">
          <p className="text-[10px] font-bold leading-tight truncate" style={{ color: "var(--text)" }}>
            {member.fullName}
          </p>
          <div className="mt-0.5">
            {birth ? (
              <span className="inline-block text-[8px] font-mono px-1.5 py-px rounded"
                style={{ background: `${c1}1a`, color: c2, border: `1px solid ${c1}30` }} dir="ltr">
                {birth}{death ? ` – ${death}` : " –"}
              </span>
            ) : (
              <span className="inline-block text-[8px] px-1.5 py-px rounded"
                style={{ background: "var(--surface-2)", color: "var(--text-muted)" }}>
                {isMale ? "ذكر" : isFemale ? "أنثى" : "—"}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Add child button — في الزاوية السفلية اليسرى (بعيد عن نقطة الربط) */}
      <button
        onClick={(e) => { e.stopPropagation(); onAddChild(member) }}
        title="إضافة ابن/ابنة"
        className="absolute -bottom-2 left-1 z-40
          rounded-full text-white flex items-center justify-center
          opacity-0 group-hover:opacity-100
          transition-opacity duration-200 shadow-lg hover:scale-110 active:scale-95"
        style={{ background: `linear-gradient(135deg, ${c1}, ${c2})`, width: 22, height: 22 }}
      >
        <Plus className="w-3 h-3" />
      </button>

      {/* Bottom handle (source — للسحب وربط ابن) */}
      <Handle type="source" position={Position.Bottom}
        style={{ ...handleStyle, bottom: -6 }}
        className="hover:!scale-125 transition-transform" />
    </div>
  )
})

PersonNode.displayName = "PersonNode"
