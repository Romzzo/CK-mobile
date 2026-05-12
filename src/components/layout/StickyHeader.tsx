"use client";

import { Search, Crown } from "lucide-react";
import Link from "next/link";

export default function StickyHeader({ solid }: { solid: boolean }) {
  const fg = solid ? "var(--ink-soft)" : "#fff";
  const divider = solid ? "var(--line)" : "rgba(255,255,255,0.35)";
  return (
    <header
      className="fixed left-1/2 top-0 z-40 w-full max-w-[480px] -translate-x-1/2 transition-colors duration-300"
      style={{
        backgroundColor: solid ? "rgba(255,255,255,0.92)" : "transparent",
        backdropFilter: solid ? "blur(16px)" : "none",
        borderBottom: solid ? "1px solid var(--line)" : "1px solid transparent",
      }}
    >
      <div className="flex h-14 items-center gap-3 px-4">
        <Link
          href="/"
          className="shrink-0 text-[15px] font-extrabold tracking-tight transition-colors duration-300"
          style={{ color: solid ? "var(--ink)" : "#fff" }}
        >
          clipart
          <span style={{ color: solid ? "var(--brand)" : "rgba(255,255,255,0.8)" }}>korea</span>
        </Link>

        <Link
          href="/search"
          className="flex h-9 flex-1 items-center gap-2 rounded-full px-3.5 transition-opacity duration-300"
          style={{
            opacity: solid ? 1 : 0,
            pointerEvents: solid ? "auto" : "none",
            backgroundColor: "var(--surface-muted)",
            color: "var(--ink-mute)",
          }}
        >
          <Search size={15} className="shrink-0" />
          <span className="truncate text-[13px]">이미지, 아이콘, 폰트 검색</span>
        </Link>

        <div className="flex shrink-0 items-center gap-2.5">
          <Link
            href="/membership"
            className="flex items-center gap-1 text-[13px] font-semibold transition-colors duration-300"
            style={{ color: fg }}
          >
            <Crown size={13} />
            멤버십
          </Link>
          <span className="h-3 w-px" style={{ backgroundColor: divider }} />
          <Link
            href="/login"
            className="text-[13px] font-semibold transition-colors duration-300"
            style={{ color: fg }}
          >
            로그인
          </Link>
        </div>
      </div>
    </header>
  );
}
