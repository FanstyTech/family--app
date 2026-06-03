"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { GlassCard } from "@/components/ui/glass-card"
import { 
  Plus, 
  Calendar as CalendarIcon, 
  MapPin, 
  Clock, 
  Check, 
  Users, 
  X, 
  Sparkles,
  ArrowLeft
} from "lucide-react"

type FamilyEvent = {
  id: string
  title: string
  description: string
  date: {
    day: string
    month: string
    year: string
    raw: string // YYYY-MM-DD
  }
  time: string
  location: string
  type: "gathering" | "celebration" | "wedding" | "other"
  attendees: { name: string; avatar: string }[]
  joined: boolean
}

const INITIAL_EVENTS: FamilyEvent[] = [
  {
    id: "1",
    title: "اجتماع العائلة الشهري الدوري ☕",
    description: "نجتمع جميعاً في استراحة المزرعة لتبادل الأحاديث وقضاء وقت ممتع، العشاء سيكون بوفيه مفتوح بمشاركة الجميع.",
    date: { day: "12", month: "يونيو", year: "2026", raw: "2026-06-12" },
    time: "06:00 مساءً",
    location: "استراحة العائلة - المزرعة الشمالية",
    type: "gathering",
    attendees: [
      { name: "أحمد عبد الرحمن", avatar: "👨" },
      { name: "سارة عبد الله", avatar: "👩" },
      { name: "خالد أحمد", avatar: "👦" }
    ],
    joined: false
  },
  {
    id: "2",
    title: "حفل عشاء تخرج خالد 🎓",
    description: "بمناسبة تخرجه بتفوق من كلية الهندسة، تدعوكم العائلة لمشاركتنا فرحتنا وتناول وجبة العشاء والاحتفاء بمهندسنا الجديد.",
    date: { day: "20", month: "يونيو", year: "2026", raw: "2026-06-20" },
    time: "08:30 مساءً",
    location: "قاعة الضيافة الكبرى - حي الياسمين",
    type: "celebration",
    attendees: [
      { name: "أحمد عبد الرحمن", avatar: "👨" },
      { name: "سارة عبد الله", avatar: "👩" },
      { name: "خالد أحمد", avatar: "👦" },
      { name: "فاطمة محمد", avatar: "👩" },
      { name: "صالح أحمد", avatar: "👨" }
    ],
    joined: true
  },
  {
    id: "3",
    title: "عقيقة المولود الجديد لعلي 👶",
    description: "يسر علي وفاطمة دعوتكم لمشاركتهم فرحة قدوم مولودهم الجديد وتناول طعام العقيقة في منزلهم العامر.",
    date: { day: "05", month: "مايو", year: "2026", raw: "2026-05-05" },
    time: "07:00 مساءً",
    location: "منزل علي - حي الملقا",
    type: "celebration",
    attendees: [
      { name: "أحمد عبد الرحمن", avatar: "👨" },
      { name: "سارة عبد الله", avatar: "👩" },
      { name: "فاطمة محمد", avatar: "👩" }
    ],
    joined: true
  }
]

export default function EventsPage() {
  const [events, setEvents] = useState<FamilyEvent[]>(INITIAL_EVENTS)
  const [tab, setTab] = useState<"upcoming" | "past">("upcoming")
  const [modalOpen, setModalOpen] = useState(false)

  // Form states
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [dateStr, setDateStr] = useState("")
  const [timeStr, setTimeStr] = useState("")
  const [locationStr, setLocationStr] = useState("")
  const [type, setType] = useState<"gathering" | "celebration" | "wedding" | "other">("gathering")

  // Filter events based on date
  const todayStr = new Date().toISOString().split("T")[0]
  
  const filteredEvents = events.filter(ev => {
    const isPast = ev.date.raw < todayStr
    return tab === "upcoming" ? !isPast : isPast
  })

  // Handle RSVP Join Toggle
  const toggleJoin = (id: string) => {
    setEvents(prev => prev.map(ev => {
      if (ev.id === id) {
        const joined = !ev.joined
        const attendees = joined
          ? [...ev.attendees, { name: "أنت", avatar: "👤" }]
          : ev.attendees.filter(att => att.name !== "أنت")
        return { ...ev, joined, attendees }
      }
      return ev
    }))
  }

  // Handle Create Event
  const handleCreateEvent = (e: React.FormEvent) => {
    e.preventDefault()
    if (!title || !dateStr || !timeStr || !locationStr) return

    const parsedDate = new Date(dateStr)
    const months = ["يناير", "فبراير", "مارس", "أبريل", "مايو", "يونيو", "يوليو", "أغسطس", "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر"]
    
    const newEvent: FamilyEvent = {
      id: Date.now().toString(),
      title,
      description,
      date: {
        day: parsedDate.getDate().toString().padStart(2, "0"),
        month: months[parsedDate.getMonth()],
        year: parsedDate.getFullYear().toString(),
        raw: dateStr
      },
      time: timeStr,
      location: locationStr,
      type,
      attendees: [{ name: "أنت", avatar: "👤" }],
      joined: true
    }

    setEvents([newEvent, ...events])
    setTitle("")
    setDescription("")
    setDateStr("")
    setTimeStr("")
    setLocationStr("")
    setType("gathering")
    setModalOpen(false)
  }

  const typeLabels = {
    gathering: "اجتماع",
    celebration: "احتفال",
    wedding: "مناسبة زواج",
    other: "أخرى"
  }

  const typeColors = {
    gathering: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    celebration: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    wedding: "bg-pink-500/10 text-pink-400 border-pink-500/20",
    other: "bg-blue-500/10 text-blue-400 border-blue-500/20"
  }

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-3xl font-extrabold tracking-tight gradient-text">فعاليات العائلة</h1>
          <p className="text-[var(--color-text-muted)] text-sm">مواعيد ومناسبات تجمعنا دائماً على الخير</p>
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setModalOpen(true)}
          className="premium-btn-primary flex items-center gap-2 self-start sm:self-auto shadow-lg shadow-[var(--accent)]/15"
        >
          <Plus className="w-4 h-4" />
          <span>إنشاء فعالية جديدة</span>
        </motion.button>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-[var(--border)]">
        {[
          { key: "upcoming", label: "الفعاليات القادمة" },
          { key: "past", label: "الفعاليات السابقة" }
        ].map(t => (
          <button
            key={t.key}
            onClick={() => setTab(t.key as any)}
            className={`px-6 py-3.5 text-sm font-semibold relative transition-colors ${
              tab === t.key ? "text-[var(--accent)]" : "text-[var(--color-text-muted)] hover:text-[var(--color-text)]"
            }`}
          >
            {t.label}
            {tab === t.key && (
              <motion.div
                layoutId="active-event-tab"
                className="absolute bottom-0 inset-x-0 h-0.5 bg-gradient-to-r from-[var(--accent)] to-[var(--accent-2)]"
              />
            )}
          </button>
        ))}
      </div>

      {/* Grid List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <AnimatePresence mode="popLayout">
          {filteredEvents.length > 0 ? (
            filteredEvents.map((ev, idx) => (
              <motion.div
                key={ev.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.35, delay: idx * 0.05, ease: [0.16, 1, 0.3, 1] }}
                layout
              >
                <GlassCard className="p-6 border border-[var(--glass-border)] shadow-md hover:shadow-xl hover:border-[var(--border-hover)] transition-all duration-300 flex flex-col justify-between h-full relative overflow-hidden group">
                  <div className="space-y-4">
                    {/* Top Details & DateBadge */}
                    <div className="flex gap-4 items-start">
                      {/* Premium Calendar Badge */}
                      <div className="w-14 h-16 rounded-2xl bg-gradient-to-br from-[var(--accent)] to-[var(--accent-2)] p-[1px] shadow-lg shrink-0">
                        <div className="w-full h-full rounded-[15px] bg-[var(--surface)] flex flex-col items-center justify-center overflow-hidden">
                          <div className="text-[10px] text-white/60 bg-[var(--accent)] w-full py-0.5 text-center font-bold">{ev.date.month}</div>
                          <div className="text-xl font-extrabold text-[var(--color-text)] leading-none mt-1">{ev.date.day}</div>
                          <div className="text-[8px] text-[var(--color-text-faint)] mt-0.5">{ev.date.year}</div>
                        </div>
                      </div>

                      {/* Event Title */}
                      <div className="space-y-1.5 flex-1">
                        <div className="flex flex-wrap gap-2 items-center">
                          <span className={`text-[9px] px-2 py-0.5 rounded-full font-bold border ${typeColors[ev.type]}`}>
                            {typeLabels[ev.type]}
                          </span>
                        </div>
                        <h3 className="font-bold text-base text-[var(--color-text)] leading-snug group-hover:text-[var(--color-accent)] transition-colors">
                          {ev.title}
                        </h3>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-xs text-[var(--color-text-muted)] leading-relaxed line-clamp-3">
                      {ev.description}
                    </p>

                    {/* Metadata (Time / Location) */}
                    <div className="space-y-2 text-xs text-[var(--color-text-muted)] pt-1">
                      <div className="flex items-center gap-2">
                        <Clock className="w-3.5 h-3.5 text-[var(--color-text-faint)]" />
                        <span>الساعة: {ev.time}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-3.5 h-3.5 text-[var(--color-text-faint)]" />
                        <span className="line-clamp-1">{ev.location}</span>
                      </div>
                    </div>

                    {/* RSVP Attendees preview */}
                    {ev.attendees.length > 0 && (
                      <div className="flex items-center gap-2 pt-2 border-t border-[var(--border)]">
                        <Users className="w-3.5 h-3.5 text-[var(--color-text-faint)]" />
                        <div className="flex -space-x-1.5 overflow-hidden">
                          {ev.attendees.slice(0, 4).map((att, i) => (
                            <div 
                              key={i} 
                              className="w-6 h-6 rounded-full bg-[var(--surface-2)] border border-[var(--border)] flex items-center justify-center text-xs shadow-inner"
                              title={att.name}
                            >
                              {att.avatar}
                            </div>
                          ))}
                        </div>
                        <span className="text-[10px] text-[var(--color-text-muted)]">
                          {ev.attendees.length} أكدوا الحضور
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Actions (Join Button) */}
                  {tab === "upcoming" && (
                    <div className="pt-4 mt-4 border-t border-[var(--border)] flex gap-2">
                      <button
                        onClick={() => toggleJoin(ev.id)}
                        className={`flex-1 py-2 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
                          ev.joined
                            ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                            : "bg-[var(--surface-2)] text-[var(--color-text)] border border-[var(--border)] hover:bg-[var(--surface-3)]"
                        }`}
                      >
                        {ev.joined ? (
                          <>
                            <Check className="w-3.5 h-3.5" />
                            <span>سأحضر (تم التأكيد)</span>
                          </>
                        ) : (
                          <span>تأكيد حضور الفعالية</span>
                        )}
                      </button>
                    </div>
                  )}
                </GlassCard>
              </motion.div>
            ))
          ) : (
            <div className="col-span-full py-16 text-center text-[var(--color-text-muted)] space-y-3">
              <div className="text-5xl">📅</div>
              <p className="font-medium text-sm">لا توجد فعاليات في هذا القسم حالياً</p>
            </div>
          )}
        </AnimatePresence>
      </div>

      {/* Modal - Create Event */}
      <AnimatePresence>
        {modalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setModalOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
              className="relative w-full max-w-md glass p-6 space-y-6 z-10 border border-[var(--glass-border)]"
            >
              <div className="flex items-center justify-between border-b border-[var(--border)] pb-3">
                <h2 className="text-lg font-bold text-[var(--color-text)] flex items-center gap-2">
                  <CalendarIcon className="w-5 h-5 text-[var(--accent)]" />
                  <span>إنشاء فعالية عائلية جديدة</span>
                </h2>
                <button 
                  onClick={() => setModalOpen(false)} 
                  className="text-[var(--color-text-faint)] hover:text-[var(--color-text)] transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleCreateEvent} className="space-y-4">
                {/* Title */}
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-[var(--color-text-muted)]">عنوان المناسبة *</label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="مثال: حفل عشاء، اجتماع دوري، خطوبة"
                    required
                    className="premium-input"
                  />
                </div>

                {/* Description */}
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-[var(--color-text-muted)]">وصف وتفاصيل *</label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="اكتب تفاصيل المناسبة للجميع..."
                    rows={3}
                    className="premium-input resize-none"
                  />
                </div>

                {/* Date & Time */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-[var(--color-text-muted)]">التاريخ *</label>
                    <input
                      type="date"
                      value={dateStr}
                      onChange={(e) => setDateStr(e.target.value)}
                      required
                      dir="ltr"
                      className="premium-input text-sm text-left"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-[var(--color-text-muted)]">الوقت *</label>
                    <input
                      type="text"
                      value={timeStr}
                      onChange={(e) => setTimeStr(e.target.value)}
                      placeholder="08:00 مساءً"
                      required
                      className="premium-input text-sm"
                    />
                  </div>
                </div>

                {/* Location */}
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-[var(--color-text-muted)]">الموقع والمكان *</label>
                  <input
                    type="text"
                    value={locationStr}
                    onChange={(e) => setLocationStr(e.target.value)}
                    placeholder="مثال: استراحة العائلة، منزل الوالد"
                    required
                    className="premium-input"
                  />
                </div>

                {/* Type */}
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-[var(--color-text-muted)]">نوع المناسبة</label>
                  <select
                    value={type}
                    onChange={(e) => setType(e.target.value as any)}
                    className="premium-input text-sm"
                  >
                    <option value="gathering">اجتماع دوري</option>
                    <option value="celebration">احتفال/تخرج/مولود</option>
                    <option value="wedding">زواج/خطوبة</option>
                    <option value="other">أخرى</option>
                  </select>
                </div>

                <div className="flex gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setModalOpen(false)}
                    className="premium-btn-secondary flex-1 py-2.5"
                  >
                    إلغاء
                  </button>
                  <button
                    type="submit"
                    disabled={!title || !dateStr || !timeStr || !locationStr}
                    className="premium-btn-primary flex-1 py-2.5"
                  >
                    حفظ المناسبة
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}
