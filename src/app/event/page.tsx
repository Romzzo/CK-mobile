import Link from "next/link";
import { ChevronRight } from "lucide-react";
import PageHeader from "@/components/layout/PageHeader";
import BottomNav from "@/components/layout/BottomNav";
import { events } from "@/lib/events";

export default function EventListPage() {
  return (
    <div className="min-h-dvh bg-surface-muted pb-28">
      <PageHeader title="진행 중인 이벤트" fallbackHref="/" />

      <main className="px-4 pb-2 pt-5">
        <p className="text-[13px] text-ink-soft">지금 받을 수 있는 혜택을 확인해보세요</p>

        <div className="mt-4 flex flex-col gap-3">
          {events.map((e) => (
            <Link
              key={e.id}
              href={e.href}
              className="relative flex h-[96px] items-center justify-between gap-3 overflow-hidden rounded-2xl px-5"
              style={{ backgroundColor: "var(--brand-soft)" }}
            >
              <div
                className="pointer-events-none absolute -right-6 -top-8 h-28 w-28 rounded-full"
                style={{ backgroundColor: "rgba(122,61,234,0.10)" }}
              />
              <div className="relative min-w-0">
                <span className="text-[11px] font-bold text-brand">{e.tag}</span>
                <p className="mt-0.5 truncate text-[15px] font-bold text-ink">{e.title}</p>
                <p className="mt-0.5 truncate text-[12px] text-ink-soft">{e.desc}</p>
              </div>
              <ChevronRight size={20} className="relative shrink-0 text-brand/70" />
            </Link>
          ))}
        </div>
      </main>

      <BottomNav />
    </div>
  );
}
