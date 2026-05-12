"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { X } from "lucide-react";

export default function OnboardingBanner({ onClose }: { onClose: () => void }) {
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const raf = requestAnimationFrame(() => setShown(true));
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div
      className="fixed bottom-0 left-1/2 z-40 w-full max-w-[480px] -translate-x-1/2 px-3"
      style={{ paddingBottom: "calc(58px + env(safe-area-inset-bottom) + 8px)", pointerEvents: "none" }}
    >
      <div
        className="flex items-center gap-2.5 rounded-2xl px-4 py-3 shadow-lg"
        style={{
          backgroundColor: "var(--brand)",
          transform: shown ? "translateY(0)" : "translateY(160%)",
          transition: "transform 0.32s cubic-bezier(0.16,1,0.3,1)",
          pointerEvents: "auto",
        }}
      >
        <div className="min-w-0 flex-1">
          <p className="text-[14px] font-bold leading-snug text-white">지금 가입하면 AI 크레딧 1,000개</p>
          <p className="mt-0.5 text-[12px] text-white/75">무료로 시작해보세요</p>
        </div>
        <Link
          href="/signup"
          className="shrink-0 rounded-xl bg-white px-3 py-2 text-[13px] font-bold text-brand"
        >
          가입하기 →
        </Link>
        <button onClick={onClose} aria-label="닫기" className="-mr-1 shrink-0 p-1 text-white/70">
          <X size={16} />
        </button>
      </div>
    </div>
  );
}
