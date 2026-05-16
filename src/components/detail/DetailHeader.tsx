"use client";

import { ArrowLeft, Share2, MoreVertical } from "lucide-react";
import { useRouter } from "next/navigation";

export default function DetailHeader({
  pageCount,
}: {
  pageCount?: { current: number; total: number };
}) {
  const router = useRouter();

  return (
    <header
      className="pt-safe sticky top-0 z-nav border-b border-line"
      style={{ backgroundColor: "rgba(255,255,255,0.92)", backdropFilter: "blur(16px)" }}
    >
      <div className="relative flex h-14 items-center justify-between px-2">
        <button aria-label="뒤로" onClick={() => router.back()} className="p-2.5 text-ink-soft">
          <ArrowLeft size={22} />
        </button>

        {pageCount ? (
          <div
            className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-[12px] font-semibold text-ink-mute"
            aria-live="polite"
          >
            {pageCount.current} / {pageCount.total}
          </div>
        ) : null}

        <div className="flex items-center">
          <button aria-label="공유" className="p-2.5 text-ink-soft">
            <Share2 size={20} />
          </button>
          <button aria-label="더보기" className="p-2.5 text-ink-soft">
            <MoreVertical size={20} />
          </button>
        </div>
      </div>
    </header>
  );
}
