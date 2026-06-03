import { Sidebar } from "@/components/shared/sidebar"

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen">
      <Sidebar />
      {/* padding-right للسماح للمحتوى بعدم الاختباء خلف الـ sidebar الـ floating */}
      <main className="min-h-screen flex flex-col">
        <div className="flex-1 w-full max-w-7xl mx-auto px-6 md:pl-10 md:pr-28 py-8 pb-28 md:pb-10">
          {children}
        </div>
      </main>
    </div>
  )
}
