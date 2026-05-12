"use client";

import { Search } from "lucide-react";
import Link from "next/link";

export default function StickyHeader() {
  return (
    <header
      className="sticky top-0 z-40 border-b border-line"
      style={{ backgroundColor: "rgba(255,255,255,0.92)", backdropFilter: "blur(16px)" }}
    >
      <div className="flex h-14 items-center gap-3 px-4">
        <Link href="/" className="shrink-0 text-[15px] font-extrabold tracking-tight text-ink">
          clipart<span className="text-brand">korea</span>
        </Link>

        <Link
          href="/search"
          className="flex h-9 flex-1 items-center gap-2 rounded-full bg-surface-muted px-3.5 text-ink-mute"
        >
          <Search size={15} className="shrink-0" />
          <span className="truncate text-[13px]">이미지, 아이콘, 폰트 검색</span>
        </Link>

        <Link href="/login" className="shrink-0 px-1 text-[13px] font-semibold text-ink-soft">
          로그인
        </Link>
      </div>
    </header>
  );
}
