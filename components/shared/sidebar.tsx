"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { ThemeToggle } from "./theme-toggle"
import { signOut } from "@/lib/auth-client"
import { Home, Image, Calendar, Network, User, LogOut } from "lucide-react"

const NAV = [
  { href: "/feed",    icon: Home,     label: "الرئيسية"     },
  { href: "/photos",  icon: Image,    label: "الصور"        },
  { href: "/events",  icon: Calendar, label: "الفعاليات"    },
  { href: "/tree",    icon: Network,  label: "شجرة العائلة" },
  { href: "/profile", icon: User,     label: "ملفي"         },
]

export function Sidebar() {
  const pathname = usePathname()
  const router   = useRouter()

  return (
    <>
      {/* ── Desktop Sidebar — Full-height floating pill ── */}
      <aside className="hidden md:flex fixed right-4 top-4 bottom-4 z-40
        flex-col items-center py-4 px-2 gap-1
        glass border border-[var(--glass-border)]
        rounded-2xl shadow-2xl shadow-black/20 w-14">

        {/* Nav — takes all available space, centered vertically */}
        <nav className="flex-1 flex flex-col items-center justify-center gap-1.5 w-full">
          {NAV.map((item) => {
            const active = pathname === item.href
            const Icon   = item.icon
            return (
              <Link
                key={item.href}
                href={item.href}
                title={item.label}
                className={cn(
                  "relative flex items-center justify-center w-10 h-10 rounded-xl transition-all duration-200",
                  active
                    ? "text-white"
                    : "text-[var(--text-muted)] hover:text-[var(--text)] hover:bg-[var(--surface-2)]"
                )}
              >
                {active && (
                  <motion.div
                    layoutId="nav-active"
                    className="absolute inset-0 rounded-xl bg-gradient-to-br from-[var(--accent)] to-[var(--accent-2)]"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.35 }}
                  />
                )}
                <Icon className="relative w-[18px] h-[18px] shrink-0" />
              </Link>
            )
          })}
        </nav>

        {/* Bottom actions */}
        <div className="flex flex-col items-center gap-1 shrink-0">
          <div className="w-6 h-px bg-[var(--border)] mb-1" />
          <ThemeToggle />
          <button
            title="تسجيل الخروج"
            onClick={() => signOut().then(() => router.push("/login"))}
            className="flex items-center justify-center w-10 h-10 rounded-xl
              text-[var(--text-muted)] hover:text-red-400 hover:bg-red-500/5 transition-all"
          >
            <LogOut className="w-[18px] h-[18px]" />
          </button>
        </div>
      </aside>

      {/* ── Mobile Bottom Nav ── */}
      <nav className="md:hidden fixed bottom-3 left-3 right-3 z-40">
        <div className="glass flex items-center justify-around py-2.5 px-2
          shadow-2xl shadow-black/20 border border-[var(--glass-border)] rounded-2xl">
          {NAV.map((item) => {
            const active = pathname === item.href
            const Icon   = item.icon
            return (
              <Link key={item.href} href={item.href}
                className={cn(
                  "relative flex flex-col items-center gap-1 px-3 py-1.5 rounded-xl transition-all duration-200",
                  active ? "text-[var(--accent)]" : "text-[var(--text-faint)]"
                )}
              >
                {active && (
                  <motion.div layoutId="mob-active"
                    className="absolute inset-0 rounded-xl bg-[var(--accent)]/10"
                    transition={{ type: "spring", bounce: 0.1, duration: 0.35 }}
                  />
                )}
                <Icon className={cn("relative w-5 h-5", active ? "text-[var(--accent)]" : "")} />
                <span className="relative text-[9px] font-medium leading-none">{item.label}</span>
              </Link>
            )
          })}
        </div>
      </nav>
    </>
  )
}
