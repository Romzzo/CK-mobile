"use client";

import { useState } from "react";
import { ChevronRight } from "lucide-react";
import PageHeader from "@/components/layout/PageHeader";
import BottomNav from "@/components/layout/BottomNav";
import Footer from "@/components/layout/Footer";
import { updates, UPDATE_CATEGORIES } from "@/data/updates";

export default function UpdatePage() {
  const [activeCategory, setActiveCategory] = useState<string>("전체");

  const filtered =
    activeCategory === "전체"
      ? updates
      : updates.filter((u) => u.category === activeCategory);

  return (
    <div className="min-h-dvh bg-surface-muted">
      <PageHeader title="업데이트" subtitle="매주 새로 올라오는 콘텐츠" fallbackHref="/" />

      {/* ── 카테고리 필터 칩 ── */}
      <div className="border-b border-line bg-surface">
        <div className="no-scrollbar flex gap-2 overflow-x-auto px-4 pb-2 pt-3">
          {UPDATE_CATEGORIES.map((c) => {
            const active = activeCategory === c;
            return (
              <button
                key={c}
                onClick={() => setActiveCategory(c)}
                className="shrink-0 rounded-full px-3.5 py-2 text-[13px] font-medium transition-colors"
                style={
                  active
                    ? { backgroundColor: "var(--ink)", color: "#fff" }
                    : { backgroundColor: "var(--surface-muted)", color: "var(--ink-soft)" }
                }
              >
                {c}
              </button>
            );
          })}
        </div>
      </div>

      {/* ── 주차별 업데이트 카드 리스트 ── */}
      <div className="flex flex-col gap-4 px-4 pt-4">
        {filtered.length === 0 ? (
          <div className="rounded-2xl border border-line bg-surface px-5 py-12 text-center">
            <p className="text-[14px] font-semibold text-ink">해당 카테고리의 업데이트가 없어요</p>
            <p className="mt-1 text-[12px] text-ink-mute">다른 카테고리를 선택해 보세요.</p>
          </div>
        ) : (
          filtered.map((u) => (
            <article
              key={u.id}
              className="overflow-hidden rounded-2xl border border-line bg-surface"
            >
              <div className="flex items-center justify-between border-b border-line px-4 py-3">
                <div className="min-w-0">
                  <p className="text-[13px] font-bold text-ink">
                    {u.year}년 {u.month}월 {u.week}주차
                  </p>
                  <p className="mt-0.5 text-[11px] text-ink-mute">{u.dateRange}</p>
                </div>
                <a
                  href={u.pcUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex shrink-0 items-center gap-0.5 text-[12px] font-semibold text-brand"
                >
                  더보기
                  <ChevronRight size={13} />
                </a>
              </div>

              <div className="grid grid-cols-4 gap-px bg-line">
                {u.thumbnails.slice(0, 4).map((src, i) =>
                  src ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      key={i}
                      src={src}
                      alt=""
                      className="aspect-square w-full bg-surface-muted object-cover"
                    />
                  ) : (
                    <div
                      key={i}
                      className="aspect-square w-full animate-pulse bg-surface-muted"
                    />
                  ),
                )}
              </div>

              <div className="flex items-center justify-between px-4 py-2.5">
                <span className="text-[11px] text-ink-mute">
                  총 {u.count.toLocaleString()}개 콘텐츠 업데이트
                </span>
                <span
                  className="rounded-full px-2 py-0.5 text-[10px] font-semibold"
                  style={{ backgroundColor: "var(--brand-soft)", color: "var(--brand)" }}
                >
                  {u.category}
                </span>
              </div>
            </article>
          ))
        )}
      </div>

      <div className="mt-6">
        <Footer />
      </div>

      <BottomNav />
    </div>
  );
}
