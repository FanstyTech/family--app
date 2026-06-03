import { betterFetch } from "@better-fetch/fetch"
import type { Session } from "@/lib/auth"
import { NextResponse, type NextRequest } from "next/server"

const PUBLIC_PREFIXES = ["/login", "/join"]

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  // الصفحة الرئيسية "/" = لاندنغ عامة (مطابقة تامة)، + صفحات الدخول
  const isPublic = pathname === "/" || PUBLIC_PREFIXES.some((p) => pathname.startsWith(p))
  if (isPublic) return NextResponse.next()

  const { data: session } = await betterFetch<Session>("/api/auth/get-session", {
    baseURL: request.nextUrl.origin,
    headers: { cookie: request.headers.get("cookie") ?? "" },
  })

  if (!session) {
    return NextResponse.redirect(new URL("/login", request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}
