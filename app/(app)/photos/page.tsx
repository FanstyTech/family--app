"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { GlassCard } from "@/components/ui/glass-card"
import { Plus, Heart, Eye, X, Upload, Calendar, User, Tag } from "lucide-react"

type FamilyPhoto = {
  id: string
  title: string
  url: string
  uploader: string
  date: string
  category: "all" | "trips" | "events" | "daily"
  likes: number
  liked: boolean
}

const INITIAL_PHOTOS: FamilyPhoto[] = [
  {
    id: "1",
    title: "رحلتنا البرية الشتوية",
    url: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&q=80&w=1200",
    uploader: "أحمد بن عبد الرحمن",
    date: "25 يناير 2026",
    category: "trips",
    likes: 18,
    liked: false
  },
  {
    id: "2",
    title: "جمعة العيد السنوية 🎈",
    url: "https://images.unsplash.com/photo-1543807535-eceef0bc6599?auto=format&fit=crop&q=80&w=1200",
    uploader: "سارة عبد الله",
    date: "12 أبريل 2026",
    category: "events",
    likes: 32,
    liked: true
  },
  {
    id: "3",
    title: "خالد وصالح في الحديقة",
    url: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&q=80&w=1200",
    uploader: "خالد أحمد",
    date: "3 مايو 2026",
    category: "daily",
    likes: 15,
    liked: false
  },
  {
    id: "4",
    title: "شروق الشمس من شرفة البيت",
    url: "https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?auto=format&fit=crop&q=80&w=1200",
    uploader: "فاطمة محمد",
    date: "14 مايو 2026",
    category: "daily",
    likes: 21,
    liked: false
  },
  {
    id: "5",
    title: "تكريم خالد في الجامعة 🎓",
    url: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=1200",
    uploader: "أحمد بن عبد الرحمن",
    date: "1 يونيو 2026",
    category: "events",
    likes: 45,
    liked: true
  },
  {
    id: "6",
    title: "يوم الشواء العائلي 🥩",
    url: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&q=80&w=1200",
    uploader: "صالح أحمد",
    date: "28 مايو 2026",
    category: "trips",
    likes: 27,
    liked: false
  }
]

export default function PhotosPage() {
  const [photos, setPhotos] = useState<FamilyPhoto[]>(INITIAL_PHOTOS)
  const [filter, setFilter] = useState<"all" | "trips" | "events" | "daily">("all")
  
  // Lightbox & Upload states
  const [activePhoto, setActivePhoto] = useState<FamilyPhoto | null>(null)
  const [uploadOpen, setUploadOpen] = useState(false)
  
  // Form states
  const [newTitle, setNewTitle] = useState("")
  const [newCategory, setNewCategory] = useState<"trips" | "events" | "daily">("daily")
  const [newUrl, setNewUrl] = useState("")

  const filteredPhotos = photos.filter(p => filter === "all" || p.category === filter)

  // Like Toggle
  const toggleLike = (e: React.MouseEvent, id: string) => {
    e.stopPropagation()
    setPhotos(prev => prev.map(p => {
      if (p.id === id) {
        return { ...p, likes: p.liked ? p.likes - 1 : p.likes + 1, liked: !p.liked }
      }
      return p
    }))
  }

  // Handle Photo Submit
  const handleUpload = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newTitle || !newUrl) return

    const newPhoto: FamilyPhoto = {
      id: Date.now().toString(),
      title: newTitle,
      url: newUrl,
      uploader: "أنت (العضو الحالي)",
      date: "الآن",
      category: newCategory,
      likes: 0,
      liked: false
    }

    setPhotos([newPhoto, ...photos])
    setNewTitle("")
    setNewUrl("")
    setUploadOpen(false)
  }

  const categoryLabels = {
    all: "الكل",
    trips: "رحلات ونزهات",
    events: "أعياد ومناسبات",
    daily: "يوميات"
  }

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-3xl font-extrabold tracking-tight gradient-text">ألبوم الصور</h1>
          <p className="text-[var(--color-text-muted)] text-sm">ذكرياتنا العائلية مصورة ومحفوظة بحب</p>
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setUploadOpen(true)}
          className="premium-btn-primary flex items-center gap-2 self-start sm:self-auto shadow-lg shadow-[var(--accent)]/15"
        >
          <Plus className="w-4 h-4" />
          <span>إضافة صورة للذكريات</span>
        </motion.button>
      </div>

      {/* Category Tabs */}
      <div className="flex gap-1.5 overflow-x-auto pb-2 scrollbar-none">
        {(["all", "trips", "events", "daily"] as const).map(tab => {
          const active = filter === tab
          return (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all duration-200 ${
                active
                  ? "bg-gradient-to-r from-[var(--accent)] to-[var(--accent-2)] text-white shadow-md shadow-[var(--accent)]/10"
                  : "bg-[var(--surface-2)] text-[var(--color-text-muted)] border border-[var(--border)] hover:bg-[var(--surface-3)] hover:text-[var(--color-text)]"
              }`}
            >
              {categoryLabels[tab]}
            </button>
          )
        })}
      </div>

      {/* Photos Masonry/Grid Grid */}
      <motion.div 
        layout
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
      >
        <AnimatePresence mode="popLayout">
          {filteredPhotos.map((photo, idx) => (
            <motion.div
              layout
              key={photo.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              onClick={() => setActivePhoto(photo)}
              className="group cursor-pointer aspect-[4/3] rounded-2xl overflow-hidden relative border border-[var(--glass-border)] shadow-md hover:shadow-2xl hover:border-[var(--border-hover)] transition-all duration-300"
            >
              {/* Image */}
              <img 
                src={photo.url} 
                alt={photo.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
              />
              
              {/* Premium Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/10 opacity-60 md:opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5 text-white" />
              
              <div className="absolute inset-x-0 bottom-0 p-5 z-10 flex flex-col justify-end translate-y-3 md:translate-y-6 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                <span className="text-[10px] bg-white/25 backdrop-blur-md text-white px-2 py-0.5 rounded-full font-medium self-start mb-2 border border-white/10 flex items-center gap-1">
                  <Tag className="w-2.5 h-2.5" />
                  <span>{categoryLabels[photo.category]}</span>
                </span>
                <h3 className="font-bold text-base line-clamp-1 mb-1 text-slate-100">{photo.title}</h3>
                
                <div className="flex items-center justify-between text-xs text-slate-300 mt-2 pt-2 border-t border-white/10">
                  <span className="flex items-center gap-1.5">
                    <span className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center text-xs">👤</span>
                    <span>{photo.uploader}</span>
                  </span>
                  
                  <button 
                    onClick={(e) => toggleLike(e, photo.id)}
                    className={`flex items-center gap-1.5 px-2 py-1 rounded-lg transition-colors ${
                      photo.liked ? "text-red-400 bg-red-500/10" : "hover:text-white"
                    }`}
                  >
                    <Heart className={`w-3.5 h-3.5 ${photo.liked ? "fill-current" : ""}`} />
                    <span>{photo.likes}</span>
                  </button>
                </div>
              </div>

              {/* View Overlay Button (center) */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md border border-white/20 flex items-center justify-center text-white shadow-lg shadow-black/15">
                  <Eye className="w-5 h-5" />
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Lightbox Modal (Image Viewer) */}
      <AnimatePresence>
        {activePhoto && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActivePhoto(null)}
              className="absolute inset-0 bg-black/95 backdrop-blur-md"
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ type: "spring", bounce: 0.15 }}
              className="relative max-w-4xl w-full flex flex-col gap-4 z-10"
            >
              {/* Close Button */}
              <button
                onClick={() => setActivePhoto(null)}
                className="absolute top-4 right-4 z-20 w-10 h-10 rounded-xl bg-white/10 hover:bg-white/20 border border-white/10 text-white flex items-center justify-center transition-all"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Main Image */}
              <div className="w-full aspect-[4/3] max-h-[70vh] rounded-2xl overflow-hidden border border-white/10 bg-black/30 shadow-2xl relative">
                <img src={activePhoto.url} className="w-full h-full object-contain" alt={activePhoto.title} />
              </div>

              {/* Photo Meta details */}
              <div className="p-5 rounded-2xl bg-white/5 border border-white/10 text-white space-y-3 backdrop-blur-md">
                <div className="flex justify-between items-start gap-4">
                  <div className="space-y-1">
                    <h2 className="text-xl font-bold">{activePhoto.title}</h2>
                    <div className="flex flex-wrap gap-x-4 gap-y-1.5 text-xs text-slate-400">
                      <span className="flex items-center gap-1">
                        <User className="w-3.5 h-3.5 text-[var(--accent)]" />
                        <span>بواسطة: {activePhoto.uploader}</span>
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-[var(--accent)]" />
                        <span>التاريخ: {activePhoto.date}</span>
                      </span>
                    </div>
                  </div>
                  
                  <button 
                    onClick={(e) => toggleLike(e, activePhoto.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold border transition-all ${
                      activePhoto.liked 
                        ? "bg-red-500/20 border-red-500/30 text-red-400" 
                        : "bg-white/5 border-white/10 text-slate-200 hover:bg-white/10"
                    }`}
                  >
                    <Heart className={`w-4 h-4 ${activePhoto.liked ? "fill-current" : ""}`} />
                    <span>{activePhoto.likes} إعجاب</span>
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Mock Upload Photo Modal */}
      <AnimatePresence>
        {uploadOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setUploadOpen(false)}
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
                  <Upload className="w-5 h-5 text-[var(--accent)]" />
                  <span>إضافة صورة للألبوم</span>
                </h2>
                <button 
                  onClick={() => setUploadOpen(false)} 
                  className="text-[var(--color-text-faint)] hover:text-[var(--color-text)] transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleUpload} className="space-y-4">
                {/* Title */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-[var(--color-text-muted)]">عنوان الصورة *</label>
                  <input
                    type="text"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    placeholder="مثال: رحلة العيد البحرية"
                    required
                    className="premium-input"
                  />
                </div>

                {/* Category */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-[var(--color-text-muted)]">تصنيف الصورة</label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value as any)}
                    className="premium-input text-sm"
                  >
                    <option value="trips">رحلات ونزهات</option>
                    <option value="events">أعياد ومناسبات</option>
                    <option value="daily">يوميات</option>
                  </select>
                </div>

                {/* URL */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-[var(--color-text-muted)]">رابط الصورة (Unsplash أو رابط ويب) *</label>
                  <input
                    type="url"
                    value={newUrl}
                    onChange={(e) => setNewUrl(e.target.value)}
                    placeholder="https://images.unsplash.com/..."
                    required
                    dir="ltr"
                    className="premium-input text-left text-xs"
                  />
                </div>

                <div className="flex gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setUploadOpen(false)}
                    className="premium-btn-secondary flex-1 py-2.5"
                  >
                    إلغاء
                  </button>
                  <button
                    type="submit"
                    disabled={!newTitle || !newUrl}
                    className="premium-btn-primary flex-1 py-2.5"
                  >
                    حفظ الصورة
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
