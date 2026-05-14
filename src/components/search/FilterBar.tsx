"use client";

import { useState } from "react";

const typeFilters = ["전체", "일러스트", "사진", "아이콘", "AI이미지", "PPT", "폰트", "영상"];

export default function FilterBar() {
  const [activeType, setActiveType] = useState("전체");

  return (
    <div className="border-b border-line bg-surface">
      <div className="no-scrollbar flex gap-2 overflow-x-auto px-4 pb-3 pt-3">
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
    </div>
  );
}
