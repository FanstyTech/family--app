"use client"

import { useState } from "react"
import { FamilyTree } from "@/components/tree/family-tree"
import { Users, GitFork, Heart } from "lucide-react"

export default function TreePage() {
  const [count, setCount] = useState(0)

  return (
    <div className="flex flex-col gap-4" style={{ height: "calc(100vh - 7rem)" }}>

      {/* Header */}
      <div className="flex items-center justify-between shrink-0">
        <div>
          <h1 className="text-2xl font-bold gradient-text">شجرة العائلة</h1>
          <p className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>
            اضغط على أي فرد للتعديل — اضغط + لإضافة ابن/ابنة
          </p>
        </div>

        {/* Stats pills */}
        <div className="hidden sm:flex items-center gap-2">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold"
            style={{ background: "var(--surface)", border: "1px solid var(--border)" }}>
            <Users className="w-3.5 h-3.5" style={{ color: "var(--accent)" }} />
            <span style={{ color: "var(--text)" }}>{count}</span>
            <span style={{ color: "var(--text-muted)" }}>فرد</span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs"
            style={{ background: "var(--surface)", border: "1px solid var(--border)", color: "var(--text-muted)" }}>
            <GitFork className="w-3.5 h-3.5" style={{ color: "#3b82f6" }} />
            <span>علاقات الأبناء</span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs"
            style={{ background: "var(--surface)", border: "1px solid var(--border)", color: "var(--text-muted)" }}>
            <Heart className="w-3.5 h-3.5" style={{ color: "#d946ef" }} />
            <span>الزواج</span>
          </div>
        </div>
      </div>

      {/* Tree canvas */}
      <div className="flex-1 min-h-0 rounded-2xl overflow-hidden"
        style={{ border: "1px solid var(--glass-border)", boxShadow: "0 8px 40px rgba(0,0,0,0.2)" }}>
        <FamilyTree onCountChange={setCount} />
      </div>
    </div>
  )
}
