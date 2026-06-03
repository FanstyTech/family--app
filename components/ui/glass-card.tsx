import { cn } from "@/lib/utils"

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  glow?: boolean
}

export function GlassCard({ className, glow, ...props }: GlassCardProps) {
  return (
    <div
      className={cn(
        "glass transition-all duration-300",
        glow && "hover:shadow-[0_0_24px_rgba(124,58,237,0.2)] hover:border-[rgba(124,58,237,0.25)]",
        className
      )}
      {...props}
    />
  )
}
