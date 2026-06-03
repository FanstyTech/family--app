"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import {
  Users, Image as ImageIcon, Calendar, Network,
  ArrowLeft, Heart, MapPin, Clock, Sparkles, ShieldCheck,
} from "lucide-react"
import { ThemeToggle } from "@/components/shared/theme-toggle"

/* ─── Demo data (public showcase) ─── */
const STATS = [
  { icon: Users,     value: "1000+", label: "فرد في العائلة" },
  { icon: ImageIcon, value: "٢٤٠",   label: "صورة وذكرى"     },
  { icon: Calendar,  value: "١٨",    label: "فعالية سنوية"   },
  { icon: Network,   value: "٥",     label: "أجيال"          },
]

const TREE = {
  root:     { name: "الجد عبدالله", initials: "ع", c: "#6d5bb5" },
  children: [
    { name: "أحمد",   initials: "أ", c: "#3b6fb5", kids: ["محمد", "سارة"] },
    { name: "خالد",   initials: "خ", c: "#3b6fb5", kids: ["نورة"] },
    { name: "فاطمة",  initials: "ف", c: "#a8487e", kids: ["ريم", "ليان"] },
  ],
}

const NEWS = [
  { author: "أحمد بن عبدالرحمن", time: "قبل ساعتين", text: "لقطة مميزة من اجتماع العائلة الأسبوع الماضي في المزرعة 🌿 الحمدلله", likes: 24, color: "#3b6fb5" },
  { author: "سارة عبدالله",      time: "أمس",        text: "مبروك تخرّج خالد من كلية الهندسة 🎓 فخورين فيك يا بطل!", likes: 41, color: "#a8487e" },
  { author: "محمد أحمد",         time: "قبل ٣ أيام",  text: "تذكير: اجتماع العائلة الشهري يوم الجمعة القادم بإذن الله 📅", likes: 18, color: "#6d5bb5" },
]

const PHOTOS = [
  "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&q=80&w=600",
  "https://images.unsplash.com/photo-1543807535-eceef0bc6599?auto=format&fit=crop&q=80&w=600",
  "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&q=80&w=600",
  "https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?auto=format&fit=crop&q=80&w=600",
  "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=600",
  "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&q=80&w=600",
  "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&q=80&w=600",
  "https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&q=80&w=600",
]

const EVENTS = [
  { day: "١٢", month: "يونيو", title: "اجتماع العائلة الشهري", place: "استراحة العائلة - الشمالية", time: "٦:٠٠ مساءً", tag: "اجتماع" },
  { day: "٢٠", month: "يونيو", title: "حفل عشاء تخرّج خالد", place: "قاعة الضيافة الكبرى", time: "٨:٣٠ مساءً", tag: "احتفال" },
]

const fade = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
}

export default function LandingPage() {
  return (
    <div className="min-h-screen overflow-x-hidden">

      {/* ─── Top Nav ─── */}
      <header className="fixed top-0 inset-x-0 z-50">
        <div className="max-w-7xl mx-auto px-4 md:px-6 mt-3">
          <div className="glass flex items-center justify-between px-4 py-2.5 rounded-2xl">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl flex items-center justify-center text-sm shadow-lg"
                style={{ background: "linear-gradient(135deg, var(--accent), var(--accent-2))" }}>👨‍👩‍👦</div>
              <span className="font-bold gradient-text">عائلتنا</span>
            </div>
            <div className="flex items-center gap-2">
              <ThemeToggle />
              <Link href="/login"
                className="px-4 py-2 rounded-xl text-xs font-semibold text-white shadow-lg transition-all hover:opacity-90"
                style={{ background: "linear-gradient(135deg, var(--accent), var(--accent-2))" }}>
                تسجيل الدخول
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* ─── Hero ─── */}
      <section className="relative aurora pt-36 pb-24 px-4">
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div {...fade}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium mb-6"
            style={{ background: "var(--surface)", border: "1px solid var(--border)", color: "var(--text-muted)" }}>
            <Sparkles className="w-3.5 h-3.5" style={{ color: "var(--accent)" }} />
            مساحة العائلة الرقمية الخاصة
          </motion.div>

          <motion.h1 {...fade} transition={{ ...fade.transition, delay: 0.05 }}
            className="text-4xl md:text-6xl font-extrabold leading-[1.15] mb-5">
            عائلتنا في
            <span className="gradient-text"> مكان واحد</span>
            <br />نحفظ ذكرياتنا ونصل أرحامنا
          </motion.h1>

          <motion.p {...fade} transition={{ ...fade.transition, delay: 0.1 }}
            className="text-base md:text-lg mb-8 max-w-xl mx-auto leading-relaxed"
            style={{ color: "var(--text-muted)" }}>
            شجرة عائلة تفاعلية، ألبوم صور مشترك، فعاليات ومناسبات، وآخر أخبار العائلة — كل ذلك في تطبيق خاص وآمن لعائلتك فقط.
          </motion.p>

          <motion.div {...fade} transition={{ ...fade.transition, delay: 0.15 }}
            className="flex items-center justify-center gap-3">
            <Link href="/login"
              className="group px-6 py-3 rounded-xl text-sm font-bold text-white shadow-xl flex items-center gap-2 transition-all hover:opacity-90"
              style={{ background: "linear-gradient(135deg, var(--accent), var(--accent-2))" }}>
              ابدأ الآن
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            </Link>
            <a href="#tree"
              className="px-6 py-3 rounded-xl text-sm font-semibold transition-all hover:bg-[var(--surface-2)]"
              style={{ background: "var(--surface)", border: "1px solid var(--border)", color: "var(--text)" }}>
              استكشف المزايا
            </a>
          </motion.div>
        </div>
      </section>

      {/* ─── Stats ─── */}
      <section className="px-4 -mt-10 relative z-10">
        <motion.div {...fade}
          className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
          {STATS.map((s, i) => (
            <div key={i} className="glass rounded-2xl p-5 text-center">
              <s.icon className="w-5 h-5 mx-auto mb-2" style={{ color: "var(--accent)" }} />
              <p className="text-2xl font-extrabold" style={{ color: "var(--text)" }}>{s.value}</p>
              <p className="text-[11px] mt-0.5" style={{ color: "var(--text-muted)" }}>{s.label}</p>
            </div>
          ))}
        </motion.div>
      </section>

      {/* ─── Family Tree Preview ─── */}
      <section id="tree" className="px-4 py-24">
        <motion.div {...fade} className="text-center mb-12">
          <SectionTag icon={Network} text="شجرة العائلة" />
          <h2 className="text-3xl md:text-4xl font-bold mt-3">تصفّح جذورك بسهولة</h2>
          <p className="mt-3 text-sm max-w-md mx-auto" style={{ color: "var(--text-muted)" }}>
            شجرة تفاعلية تربط الأجيال — أضف، عدّل، واكتشف صلة قرابتك بكل فرد.
          </p>
        </motion.div>

        {/* Mini static tree */}
        <motion.div {...fade}
          className="max-w-5xl mx-auto glass rounded-3xl p-8 md:p-14 overflow-hidden relative">
          <div className="flex flex-col items-center gap-7">
            {/* Root */}
            <TreeCard {...TREE.root} big />
            <Connector />
            {/* Children row */}
            <div className="flex items-start justify-center gap-5 md:gap-10 flex-wrap">
              {TREE.children.map((ch, i) => (
                <div key={i} className="flex flex-col items-center gap-3">
                  <TreeCard name={ch.name} initials={ch.initials} c={ch.c} />
                  <div className="w-px h-5" style={{ background: "var(--border)" }} />
                  <div className="flex gap-2">
                    {ch.kids.map((k, j) => (
                      <span key={j} className="text-[10px] px-2.5 py-1.5 rounded-lg font-medium"
                        style={{ background: "var(--surface-2)", border: "1px solid var(--border)", color: "var(--text-muted)" }}>
                        {k}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <Link href="/login"
            className="mt-10 mx-auto w-fit px-5 py-2.5 rounded-xl text-xs font-bold text-white flex items-center gap-2 shadow-lg transition-all hover:opacity-90"
            style={{ background: "linear-gradient(135deg, var(--accent), var(--accent-2))" }}>
            افتح الشجرة الكاملة
            <ArrowLeft className="w-3.5 h-3.5" />
          </Link>
        </motion.div>
      </section>

      {/* ─── Latest News ─── */}
      <section className="px-4 py-12">
        <motion.div {...fade} className="text-center mb-10">
          <SectionTag icon={Sparkles} text="آخر الأخبار" />
          <h2 className="text-3xl md:text-4xl font-bold mt-3">تابع أخبار العائلة</h2>
        </motion.div>

        <motion.div {...fade} className="max-w-6xl mx-auto grid md:grid-cols-3 gap-5">
          {NEWS.map((n, i) => (
            <div key={i} className="glass rounded-2xl p-5 flex flex-col gap-3">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0"
                  style={{ background: `linear-gradient(135deg, ${n.color}, var(--accent-2))` }}>
                  {n.author[0]}
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-bold truncate" style={{ color: "var(--text)" }}>{n.author}</p>
                  <p className="text-[10px]" style={{ color: "var(--text-faint)" }}>{n.time}</p>
                </div>
              </div>
              <p className="text-xs leading-relaxed flex-1" style={{ color: "var(--text-muted)" }}>{n.text}</p>
              <div className="flex items-center gap-1.5 text-[11px]" style={{ color: "var(--text-faint)" }}>
                <Heart className="w-3.5 h-3.5" style={{ color: "#ec4899" }} />
                {n.likes} إعجاب
              </div>
            </div>
          ))}
        </motion.div>
      </section>

      {/* ─── Photo Gallery ─── */}
      <section className="px-4 py-12">
        <motion.div {...fade} className="text-center mb-10">
          <SectionTag icon={ImageIcon} text="ألبوم الصور" />
          <h2 className="text-3xl md:text-4xl font-bold mt-3">ذكرياتنا محفوظة بحب</h2>
        </motion.div>

        <motion.div {...fade} className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
          {PHOTOS.map((src, i) => (
            <div key={i} className="group relative aspect-[4/3] rounded-2xl overflow-hidden"
              style={{ border: "1px solid var(--glass-border)" }}>
              <img src={src} alt="" loading="lazy"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          ))}
        </motion.div>
      </section>

      {/* ─── Upcoming Events ─── */}
      <section className="px-4 py-12">
        <motion.div {...fade} className="text-center mb-10">
          <SectionTag icon={Calendar} text="الفعاليات القادمة" />
          <h2 className="text-3xl md:text-4xl font-bold mt-3">مواعيد تجمعنا</h2>
        </motion.div>

        <motion.div {...fade} className="max-w-4xl mx-auto space-y-3">
          {EVENTS.map((e, i) => (
            <div key={i} className="glass rounded-2xl p-4 flex items-center gap-4">
              <div className="shrink-0 w-14 h-14 rounded-xl flex flex-col items-center justify-center text-white"
                style={{ background: "linear-gradient(135deg, var(--accent), var(--accent-2))" }}>
                <span className="text-lg font-extrabold leading-none">{e.day}</span>
                <span className="text-[9px] mt-0.5">{e.month}</span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[9px] px-2 py-0.5 rounded-full font-medium"
                    style={{ background: "var(--accent)", color: "#fff" }}>{e.tag}</span>
                  <h3 className="text-sm font-bold truncate" style={{ color: "var(--text)" }}>{e.title}</h3>
                </div>
                <div className="flex flex-wrap gap-x-4 gap-y-1 text-[11px]" style={{ color: "var(--text-muted)" }}>
                  <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{e.place}</span>
                  <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{e.time}</span>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </section>

      {/* ─── Final CTA ─── */}
      <section className="px-4 py-24">
        <motion.div {...fade}
          className="max-w-5xl mx-auto glass rounded-3xl p-10 md:p-16 text-center relative overflow-hidden">
          <div className="absolute inset-0 opacity-50 pointer-events-none"
            style={{ background: "radial-gradient(ellipse at 50% 0%, var(--accent-glow), transparent 70%)" }} />
          <div className="relative z-10">
            <ShieldCheck className="w-10 h-10 mx-auto mb-4" style={{ color: "var(--accent)" }} />
            <h2 className="text-3xl md:text-4xl font-bold mb-3">مساحتكم خاصة وآمنة</h2>
            <p className="text-sm mb-8 max-w-md mx-auto" style={{ color: "var(--text-muted)" }}>
              الدخول بدعوة فقط — لا أحد خارج العائلة يرى المحتوى. ابدأوا بناء أرشيف عائلتكم اليوم.
            </p>
            <Link href="/login"
              className="inline-flex px-7 py-3.5 rounded-xl text-sm font-bold text-white shadow-xl items-center gap-2 transition-all hover:opacity-90"
              style={{ background: "linear-gradient(135deg, var(--accent), var(--accent-2))" }}>
              انضم لعائلتك الآن
              <ArrowLeft className="w-4 h-4" />
            </Link>
          </div>
        </motion.div>
      </section>

      {/* ─── Footer ─── */}
      <footer className="px-4 py-8 text-center text-xs" style={{ color: "var(--text-faint)" }}>
        <div className="flex items-center justify-center gap-2 mb-2">
          <span className="text-lg">👨‍👩‍👧‍👦</span>
          <span className="font-bold gradient-text">عائلتنا</span>
        </div>
        صُنع بحب لعائلتنا · {new Date().getFullYear()}
      </footer>
    </div>
  )
}

/* ─── Sub-components ─── */
function SectionTag({ icon: Icon, text }: { icon: any; text: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold"
      style={{ background: "var(--surface)", border: "1px solid var(--border)", color: "var(--accent)" }}>
      <Icon className="w-3.5 h-3.5" />
      {text}
    </span>
  )
}

function TreeCard({ name, initials, c, big }: { name: string; initials: string; c: string; big?: boolean }) {
  return (
    <div className="flex items-center gap-2 rounded-2xl px-3 py-2 shadow-lg"
      style={{ background: "var(--surface)", border: `1.5px solid ${c}55` }}>
      <div className={`${big ? "w-11 h-11 text-base" : "w-9 h-9 text-sm"} rounded-full flex items-center justify-center text-white font-bold shrink-0`}
        style={{ background: `linear-gradient(135deg, ${c}, var(--accent-2))` }}>
        {initials}
      </div>
      <span className={`${big ? "text-sm" : "text-xs"} font-bold whitespace-nowrap`} style={{ color: "var(--text)" }}>{name}</span>
    </div>
  )
}

function Connector() {
  return <div className="w-px h-6" style={{ background: "linear-gradient(var(--accent), transparent)" }} />
}
