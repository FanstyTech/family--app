"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { GlassCard } from "@/components/ui/glass-card"
import { 
  Heart, 
  MessageCircle, 
  Share2, 
  Send, 
  Sparkles, 
  PenTool, 
  Image as ImageIcon, 
  Calendar as CalendarIcon, 
  MoreHorizontal 
} from "lucide-react"

// Types
type Post = {
  id: string
  author: {
    name: string
    avatar: string
    role: string
  }
  type: "text" | "photo" | "event"
  content: string
  mediaUrl?: string
  eventDetails?: {
    date: string
    location: string
  }
  likes: number
  liked: boolean
  commentsCount: number
  createdAt: string
}

const MOCK_POSTS: Post[] = [
  {
    id: "1",
    author: {
      name: "أحمد بن عبد الرحمن",
      avatar: "👨‍💼",
      role: "الأب"
    },
    type: "photo",
    content: "لقطة مميزة من اجتماع العائلة الأسبوع الماضي في المزرعة. كانت لحظات لا تُنسى ولله الحمد ❤️🏡",
    mediaUrl: "https://images.unsplash.com/photo-1543807535-eceef0bc6599?auto=format&fit=crop&q=80&w=1200",
    likes: 12,
    liked: false,
    commentsCount: 4,
    createdAt: "منذ ساعتين"
  },
  {
    id: "2",
    author: {
      name: "سارة عبد الله",
      avatar: "👩‍⚕️",
      role: "الابنة"
    },
    type: "event",
    content: "ندعو الجميع لحضور حفل العشاء المقام بمناسبة تخرج أخي خالد من الجامعة يوم الخميس القادم بمشيئة الله 🎉🎓",
    eventDetails: {
      date: "الخميس، 10 يونيو - 08:30 مساءً",
      location: "قاعة الضيافة الكبرى"
    },
    likes: 24,
    liked: true,
    commentsCount: 9,
    createdAt: "منذ 5 ساعات"
  },
  {
    id: "3",
    author: {
      name: "خالد أحمد",
      avatar: "👨‍🎓",
      role: "الابن"
    },
    type: "text",
    content: "شكراً لكل من بارك وسأل بمناسبة التخرج، فخور جداً بكوني أنتمي لهذه العائلة العظيمة والدعم المستمر الذي حظيت به منهم طوال مسيرتي الدراسية. محبتي لكم جميعاً 🌹",
    likes: 31,
    liked: false,
    commentsCount: 15,
    createdAt: "أمس"
  }
]

export default function FeedPage() {
  const [posts, setPosts] = useState<Post[]>(MOCK_POSTS)
  const [newPostContent, setNewPostContent] = useState("")
  const [selectedType, setSelectedType] = useState<"text" | "photo" | "event">("text")

  // Handle Like
  const handleLike = (id: string) => {
    setPosts(prev => prev.map(post => {
      if (post.id === id) {
        return {
          ...post,
          likes: post.liked ? post.likes - 1 : post.likes + 1,
          liked: !post.liked
        }
      }
      return post
    }))
  }

  // Handle Create Post
  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newPostContent.trim()) return

    const newPost: Post = {
      id: Date.now().toString(),
      author: {
        name: "أنت (العضو الحالي)",
        avatar: "👤",
        role: "عضو"
      },
      type: selectedType,
      content: newPostContent,
      likes: 0,
      liked: false,
      commentsCount: 0,
      createdAt: "الآن"
    }

    setPosts([newPost, ...posts])
    setNewPostContent("")
  }

  // Time-based greeting in Arabic
  const getGreeting = () => {
    const hour = new Date().getHours()
    if (hour < 12) return "صباح الخير 👋"
    return "مساء الخير 👋"
  }

  return (
    <div className="space-y-8 pb-10">
      {/* Header with Glass Gradient */}
      <div className="flex justify-between items-center">
        <div className="space-y-1">
          <h1 className="text-3xl font-extrabold tracking-tight gradient-text">{getGreeting()}</h1>
          <p className="text-[var(--color-text-muted)] text-sm">آخر أخبار وفعاليات عائلتنا</p>
        </div>
        <div className="w-10 h-10 rounded-xl bg-[var(--surface-2)] border border-[var(--border)] flex items-center justify-center text-lg">
          ✨
        </div>
      </div>

      {/* Post Creator Widget */}
      <GlassCard className="p-5 border border-[var(--glass-border)] shadow-xl relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-24 h-24 bg-[var(--accent)]/5 rounded-full blur-2xl pointer-events-none" />
        <form onSubmit={handleCreatePost} className="space-y-4">
          <div className="flex gap-3">
            <div className="w-10 h-10 rounded-xl bg-[var(--surface-3)] flex items-center justify-center text-lg shadow-inner">
              👤
            </div>
            <textarea
              value={newPostContent}
              onChange={(e) => setNewPostContent(e.target.value)}
              placeholder="ماذا تحب أن تشارك مع العائلة اليوم؟"
              rows={2}
              className="flex-1 bg-transparent text-sm text-[var(--color-text)] placeholder:text-[var(--color-text-faint)] focus:outline-none resize-none pt-2"
            />
          </div>

          <div className="flex items-center justify-between pt-3 border-t border-[var(--border)]">
            <div className="flex gap-1">
              {[
                { type: "text", icon: PenTool, label: "نص" },
                { type: "photo", icon: ImageIcon, label: "صورة" },
                { type: "event", icon: CalendarIcon, label: "فعالية" }
              ].map(tab => {
                const Icon = tab.icon
                const active = selectedType === tab.type
                return (
                  <button
                    key={tab.type}
                    type="button"
                    onClick={() => setSelectedType(tab.type as any)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 ${
                      active
                        ? "bg-[var(--accent)]/20 text-[var(--color-accent)] border border-[var(--accent)]/20"
                        : "text-[var(--color-text-muted)] hover:text-[var(--color-text)] hover:bg-[var(--surface-2)]"
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{tab.label}</span>
                  </button>
                )
              })}
            </div>

            <button
              type="submit"
              disabled={!newPostContent.trim()}
              className="premium-btn-primary py-2 px-4 text-xs flex items-center gap-1.5 shadow-md shadow-[var(--accent)]/10"
            >
              <span>نشر</span>
              <Send className="w-3 h-3 rotate-180" />
            </button>
          </div>
        </form>
      </GlassCard>

      {/* Feed Posts */}
      <div className="space-y-6">
        <AnimatePresence initial={false}>
          {posts.map((post, idx) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4, delay: idx * 0.05, ease: [0.16, 1, 0.3, 1] }}
            >
              <GlassCard className="p-6 space-y-4 border border-[var(--glass-border)] shadow-md hover:shadow-xl hover:border-[var(--border-hover)] transition-all duration-300">
                {/* Author Info */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[var(--surface-2)] border border-[var(--border)] flex items-center justify-center text-lg shadow-sm">
                      {post.author.avatar}
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="font-bold text-sm text-[var(--color-text)]">{post.author.name}</span>
                        <span className="text-[10px] bg-[var(--accent)]/10 text-[var(--color-accent)] px-2 py-0.5 rounded-full font-medium">
                          {post.author.role}
                        </span>
                      </div>
                      <span className="text-[10px] text-[var(--color-text-faint)] block mt-0.5">{post.createdAt}</span>
                    </div>
                  </div>
                  <button className="text-[var(--color-text-faint)] hover:text-[var(--color-text-muted)] p-1.5 rounded-lg transition-colors">
                    <MoreHorizontal className="w-4 h-4" />
                  </button>
                </div>

                {/* Content */}
                <p className="text-sm text-[var(--color-text)] leading-relaxed whitespace-pre-line">
                  {post.content}
                </p>

                {/* Media Attachment */}
                {post.type === "photo" && post.mediaUrl && (
                  <div className="relative aspect-video rounded-xl overflow-hidden border border-[var(--border)] group">
                    <img 
                      src={post.mediaUrl} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-102"
                      alt="Post media" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/25 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                )}

                {/* Event Details Card */}
                {post.type === "event" && post.eventDetails && (
                  <div className="flex gap-4 p-4 rounded-xl bg-[var(--surface-2)] border border-[var(--border)] relative overflow-hidden group">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-tr from-[var(--accent)] to-[var(--accent-2)] flex flex-col items-center justify-center text-white shrink-0 shadow-md">
                      <span className="text-lg">📅</span>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs font-semibold text-[var(--color-text)]">{post.eventDetails.date}</p>
                      <p className="text-[11px] text-[var(--color-text-muted)] flex items-center gap-1">
                        <span>📍</span>
                        <span>{post.eventDetails.location}</span>
                      </p>
                    </div>
                  </div>
                )}

                {/* Engagement Bar */}
                <div className="flex items-center justify-between pt-3 border-t border-[var(--border)] text-[var(--color-text-muted)] text-xs">
                  <button
                    onClick={() => handleLike(post.id)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-colors duration-200 ${
                      post.liked 
                        ? "text-red-400 bg-red-400/5" 
                        : "hover:text-[var(--color-text)] hover:bg-[var(--surface-2)]"
                    }`}
                  >
                    <Heart className={`w-4 h-4 transition-transform duration-200 active:scale-125 ${post.liked ? "fill-current" : ""}`} />
                    <span>{post.likes}</span>
                  </button>

                  <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg hover:text-[var(--color-text)] hover:bg-[var(--surface-2)] transition-colors duration-200">
                    <MessageCircle className="w-4 h-4" />
                    <span>{post.commentsCount}</span>
                  </button>

                  <button 
                    onClick={() => {
                      navigator.clipboard.writeText(window.location.origin + "/post/" + post.id)
                      alert("تم نسخ رابط المنشور بنجاح!")
                    }}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg hover:text-[var(--color-text)] hover:bg-[var(--surface-2)] transition-colors duration-200"
                  >
                    <Share2 className="w-4 h-4" />
                    <span>مشاركة</span>
                  </button>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  )
}
