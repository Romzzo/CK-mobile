"use client";

import { ArrowLeft } from "lucide-react";
import type { ReactNode } from "react";
import { useRouter } from "next/navigation";

export default function PageHeader({
  title,
  subtitle,
  fallbackHref = "/",
  right,
}: {
  title: string;
  subtitle?: string;
  fallbackHref?: string;
  right?: ReactNode;
}) {
  const router = useRouter();

  const goBack = () => {
    if (typeof window !== "undefined" && window.history.length > 1) router.back();
    else router.push(fallbackHref);
  };

  return (
    <header
      className="pt-safe sticky top-0 z-40 border-b border-line"
      style={{ backgroundColor: "rgba(255,255,255,0.92)", backdropFilter: "blur(16px)" }}
    >
      <div className="flex h-14 items-center gap-2 px-2">
        <button aria-label="뒤로" onClick={goBack} className="shrink-0 p-2.5 text-ink-soft">
          <ArrowLeft size={22} />
        </button>
        <div className="min-w-0 flex-1">
          <h1 className="truncate text-[16px] font-bold leading-tight tracking-tight text-ink">{title}</h1>
          {subtitle ? <p className="truncate text-[11px] text-ink-mute">{subtitle}</p> : null}
        </div>
        {right}
      </div>
    </header>
  );
}
