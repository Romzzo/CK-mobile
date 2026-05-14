"use client";

import { ChevronUp } from "lucide-react";
import { useEffect, useState } from "react";

/**
 * 화면 우하단 floating "맨 위로" 버튼.
 * - 일정 임계치 이상 스크롤되면 페이드인, 그 이전엔 숨김
 * - BottomNav(58px + safe-area) 위로 띄움
 * - z-40 — 바텀시트 오버레이(z-55+) 보다는 아래라 시트 열릴 때 자연스럽게 가려짐
 */
export default function ScrollTopButton({ threshold = 400 }: { threshold?: number }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > threshold);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);

  return (
    <button
      type="button"
      aria-label="맨 위로"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="fixed right-4 z-40 grid h-11 w-11 place-items-center rounded-full bg-surface text-ink-soft shadow-lg transition-opacity duration-200"
      style={{
        bottom: "calc(env(safe-area-inset-bottom, 0px) + 74px)",
        opacity: visible ? 1 : 0,
        pointerEvents: visible ? "auto" : "none",
        border: "1px solid var(--line)",
      }}
    >
      <ChevronUp size={20} />
    </button>
  );
}
