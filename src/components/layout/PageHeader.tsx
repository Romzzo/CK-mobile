"use client";

import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function PageHeader({
  title,
  subtitle,
  fallbackHref = "/",
}: {
  title: string;
  subtitle?: string;
  fallbackHref?: string;
}) {
  const router = useRouter();

  const goBack = () => {
    if (typeof window !== "undefined" && window.history.length > 1) router.back();
    else router.push(fallbackHref);
  };

  return (
    <header
      className="sticky top-0 z-40 flex h-14 items-center gap-3 border-b border-line px-4"
      style={{ backgroundColor: "rgba(255,255,255,0.92)", backdropFilter: "blur(16px)" }}
    >
      <button aria-label="뒤로" onClick={goBack} className="-ml-1 shrink-0 p-1 text-ink-soft">
        <ArrowLeft size={22} />
      </button>
      <div className="min-w-0">
        <h1 className="truncate text-[16px] font-bold leading-tight tracking-tight text-ink">{title}</h1>
        {subtitle ? <p className="truncate text-[11px] text-ink-mute">{subtitle}</p> : null}
      </div>
    </header>
  );
}
