"use client";

import { SlidersHorizontal } from "lucide-react";
import { useState } from "react";

const typeFilters = ["전체", "일러스트", "사진", "아이콘", "AI이미지", "PPT", "폰트", "영상"];
const priceFilters = ["전체", "무료", "유료"];
const sortOptions = ["관련순", "최신순", "인기순", "다운로드순"];

export default function FilterBar() {
  const [activeType, setActiveType] = useState("전체");
  const [activePrice, setActivePrice] = useState("전체");
  const [activeSort, setActiveSort] = useState("관련순");
  const [showSortSheet, setShowSortSheet] = useState(false);

  return (
    <>
      <div className="bg-white border-b border-gray-100">
        {/* 유형 필터 */}
        <div className="flex gap-1.5 overflow-x-auto px-4 pt-3 pb-2 scrollbar-none" style={{ scrollbarWidth: "none" }}>
          {typeFilters.map((f) => (
            <button
              key={f}
              onClick={() => setActiveType(f)}
              className="flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-medium transition-all"
              style={
                activeType === f
                  ? { backgroundColor: "var(--ck-primary)", color: "#fff" }
                  : { backgroundColor: "#F3F4F6", color: "#4B5563" }
              }
            >
              {f}
            </button>
          ))}
        </div>

        {/* 가격 + 정렬 */}
        <div className="flex items-center justify-between px-4 pb-3 gap-2">
          <div className="flex gap-1.5">
            {priceFilters.map((f) => (
              <button
                key={f}
                onClick={() => setActivePrice(f)}
                className="px-3 py-1 rounded-full text-xs font-medium border transition-all"
                style={
                  activePrice === f
                    ? { borderColor: "var(--ck-primary)", color: "var(--ck-primary)", backgroundColor: "#F1E9FD" }
                    : { borderColor: "#E5E7EB", color: "#6B7280", backgroundColor: "#fff" }
                }
              >
                {f}
              </button>
            ))}
          </div>

          <button
            onClick={() => setShowSortSheet(true)}
            className="flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium border border-gray-200 text-gray-600 bg-white"
          >
            <SlidersHorizontal size={12} />
            {activeSort}
          </button>
        </div>
      </div>

      {/* 정렬 바텀 시트 */}
      {showSortSheet && (
        <>
          <div className="fixed inset-0 bg-black/40 z-40" onClick={() => setShowSortSheet(false)} />
          <div className="fixed bottom-0 left-0 right-0 z-50 bg-white rounded-t-2xl px-4 pt-4 pb-8">
            <div className="w-10 h-1 bg-gray-200 rounded-full mx-auto mb-4" />
            <p className="text-sm font-bold text-gray-800 mb-3">정렬 기준</p>
            {sortOptions.map((opt) => (
              <button
                key={opt}
                onClick={() => { setActiveSort(opt); setShowSortSheet(false); }}
                className="w-full flex items-center justify-between py-3 border-b border-gray-50 last:border-0"
              >
                <span className="text-sm text-gray-700">{opt}</span>
                {activeSort === opt && (
                  <span className="w-5 h-5 rounded-full flex items-center justify-center" style={{ backgroundColor: "var(--ck-primary)" }}>
                    <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                      <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                )}
              </button>
            ))}
          </div>
        </>
      )}
    </>
  );
}
