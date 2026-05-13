"use client";

import { SlidersHorizontal, Check } from "lucide-react";
import { useState } from "react";

const typeFilters = ["전체", "일러스트", "사진", "아이콘", "AI이미지", "PPT", "폰트", "영상"];
const priceFilters = ["전체", "무료", "유료"];
const sortOptions = ["추천순", "다운로드순", "등록순"];

export default function FilterBar() {
  const [activeType, setActiveType] = useState("전체");
  const [activePrice, setActivePrice] = useState("전체");
  const [activeSort, setActiveSort] = useState("추천순");
  const [showSortSheet, setShowSortSheet] = useState(false);

  return (
    <>
      <div className="border-b border-line bg-surface">
        <div
          className="no-scrollbar flex gap-2 overflow-x-auto px-4 pb-2 pt-3"
        >
          {typeFilters.map((f) => {
            const active = activeType === f;
            return (
              <button
                key={f}
                onClick={() => setActiveType(f)}
                className="shrink-0 rounded-full px-3.5 py-2 text-[13px] font-medium transition-colors"
                style={
                  active
                    ? { backgroundColor: "var(--ink)", color: "#fff" }
                    : { backgroundColor: "var(--surface-muted)", color: "var(--ink-soft)" }
                }
              >
                {f}
              </button>
            );
          })}
        </div>

        <div className="flex items-center justify-between gap-2 px-4 pb-3">
          <div className="flex gap-1.5">
            {priceFilters.map((f) => {
              const active = activePrice === f;
              return (
                <button
                  key={f}
                  onClick={() => setActivePrice(f)}
                  className="rounded-full border px-3 py-1.5 text-[12px] font-medium transition-colors"
                  style={
                    active
                      ? { borderColor: "var(--brand)", color: "var(--brand)", backgroundColor: "var(--brand-soft)" }
                      : { borderColor: "var(--line)", color: "var(--ink-mute)", backgroundColor: "var(--surface)" }
                  }
                >
                  {f}
                </button>
              );
            })}
          </div>

          <button
            onClick={() => setShowSortSheet(true)}
            className="flex items-center gap-1 rounded-full border border-line bg-surface px-3 py-1.5 text-[12px] font-medium text-ink-soft"
          >
            <SlidersHorizontal size={12} />
            {activeSort}
          </button>
        </div>
      </div>

      {showSortSheet ? (
        <>
          <div
            className="fixed inset-0 z-40"
            style={{ backgroundColor: "rgba(0,0,0,0.4)" }}
            onClick={() => setShowSortSheet(false)}
          />
          <div className="fixed bottom-0 left-1/2 z-50 w-full max-w-[480px] -translate-x-1/2 rounded-t-2xl bg-surface px-4 pb-8 pt-4">
            <div className="mx-auto mb-4 h-1 w-10 rounded-full bg-line" />
            <p className="mb-1 text-[15px] font-bold text-ink">정렬 기준</p>
            {sortOptions.map((opt) => (
              <button
                key={opt}
                onClick={() => {
                  setActiveSort(opt);
                  setShowSortSheet(false);
                }}
                className="flex w-full items-center justify-between border-b border-line py-3.5 text-left last:border-0"
              >
                <span className="text-[14px] text-ink-soft">{opt}</span>
                {activeSort === opt ? (
                  <span
                    className="grid h-5 w-5 place-items-center rounded-full"
                    style={{ backgroundColor: "var(--brand)" }}
                  >
                    <Check size={11} className="text-white" strokeWidth={3} />
                  </span>
                ) : null}
              </button>
            ))}
          </div>
        </>
      ) : null}
    </>
  );
}
