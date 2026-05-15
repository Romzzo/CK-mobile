"use client";

import { Search, Crown } from "lucide-react";
import Link from "next/link";
import BrandLogo from "@/components/brand/BrandLogo";
import { useAuth } from "@/lib/useAuth";

export default function StickyHeader({ solid }: { solid: boolean }) {
  const fg = solid ? "var(--ink-soft)" : "#fff";
  const { isLoggedIn, mounted } = useAuth();
  return (
    <header
      className="pt-safe fixed left-1/2 top-0 z-nav w-full max-w-[480px] -translate-x-1/2 transition-colors duration-300"
      style={{
        background: solid ? "rgba(255,255,255,0.92)" : "linear-gradient(180deg, rgba(0,0,0,0.34), rgba(0,0,0,0))",
        backdropFilter: solid ? "blur(16px)" : "none",
        borderBottom: solid ? "1px solid var(--line)" : "1px solid transparent",
      }}
    >
      <div className="flex h-14 items-center gap-3 px-4">
        <Link
          href="/"
          aria-label="clipartkorea 홈"
          className="shrink-0 transition-colors duration-300"
          style={{ color: solid ? "#ED1765" : "#fff" }}
        >
          <BrandLogo style={{ height: 13, width: "auto" }} />
        </Link>

        <Link
          href="/search"
          className="flex h-9 min-w-0 flex-1 items-center gap-2 rounded-full px-3.5 transition-opacity duration-300"
          style={{
            opacity: solid ? 1 : 0,
            pointerEvents: solid ? "auto" : "none",
            backgroundColor: "var(--surface-muted)",
            color: "var(--ink-mute)",
          }}
        >
          <Search size={15} className="shrink-0" />
          <span className="truncate text-[13px]">한글, 영문, 콘텐츠번호로 검색</span>
        </Link>

        <div className="flex shrink-0 items-center gap-2">
          {!solid ? (
            <Link
              href="/membership"
              className="flex shrink-0 items-center gap-1 text-[13px] font-semibold transition-colors duration-300"
              style={{ color: fg }}
            >
              <Crown size={13} />
              라이선스
            </Link>
          ) : null}
          {!mounted ? (
            // 인증 확정 전: 자리만 차지 (로그인/MY 둘 다 안 그림으로써 깜빡임 방지)
            <span aria-hidden className="block h-8 w-[64px] shrink-0" />
          ) : isLoggedIn ? (
            <Link
              href="/my"
              aria-label="MY"
              className="grid h-8 w-8 shrink-0 place-items-center rounded-full text-[12px] font-bold text-white transition-colors duration-300"
              style={
                solid
                  ? { backgroundColor: "var(--brand)" }
                  : { backgroundColor: "var(--brand)", boxShadow: "0 0 0 1px rgba(255,255,255,0.32)" }
              }
            >
              박
            </Link>
          ) : (
            <Link
              href="/login"
              className="shrink-0 rounded-full px-3 py-2 text-[12px] font-bold transition-colors duration-300"
              style={
                solid
                  ? { backgroundColor: "var(--surface-muted)", color: "var(--ink-soft)", border: "1px solid var(--line)" }
                  : { backgroundColor: "rgba(255,255,255,0.18)", color: "#fff", border: "1px solid rgba(255,255,255,0.32)" }
              }
            >
              로그인
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
