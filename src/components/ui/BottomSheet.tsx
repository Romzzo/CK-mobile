"use client";

import { useEffect, useId, type ReactNode } from "react";

/**
 * 모바일 표준 바텀시트.
 * - z-index 토큰(z-overlay/z-sheet)으로 BottomNav(z-nav) 위에 안전하게 노출
 * - safe-area pb 자동 처리
 * - a11y: role="dialog" + aria-modal + aria-labelledby + Escape 닫기
 */
export default function BottomSheet({
  open,
  onClose,
  title,
  children,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
}) {
  const titleId = useId();

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <>
      <div
        aria-hidden
        className="fixed inset-0 z-overlay"
        style={{ backgroundColor: "rgba(0,0,0,0.4)" }}
        onClick={onClose}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="fixed bottom-0 left-1/2 z-sheet w-full max-w-[480px] -translate-x-1/2 rounded-t-2xl bg-surface px-4 pt-4"
        style={{ paddingBottom: "calc(env(safe-area-inset-bottom, 0px) + 24px)" }}
      >
        <div className="mx-auto mb-4 h-1 w-10 rounded-full bg-line" />
        <p id={titleId} className="mb-1 text-[15px] font-bold text-ink">
          {title}
        </p>
        <div className="max-h-[60vh] overflow-y-auto">{children}</div>
      </div>
    </>
  );
}
