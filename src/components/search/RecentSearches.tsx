"use client";

import { Clock, X } from "lucide-react";
import { trendingKeywords } from "@/lib/mockData";
import SectionHeader from "@/components/home/SectionHeader";
import { useRecentSearches } from "@/lib/useRecentSearches";

export default function RecentSearches({ onSelect }: { onSelect: (keyword: string) => void }) {
  const { list: recent, remove, clearAll } = useRecentSearches();

  return (
    <div className="px-4 py-5">
      {recent.length > 0 ? (
        <div className="mb-7">
          <div className="flex items-center justify-between">
            <h2 className="text-[15px] font-bold text-ink">최근 검색어</h2>
            <button onClick={clearAll} className="text-[13px] text-ink-mute">
              전체 삭제
            </button>
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            {recent.map((keyword) => (
              <div
                key={keyword}
                className="flex items-center gap-1.5 rounded-full bg-surface-muted px-3 py-2"
              >
                <Clock size={12} className="text-ink-mute" />
                <button onClick={() => onSelect(keyword)} className="text-[13px] text-ink-soft">
                  {keyword}
                </button>
                <button aria-label="삭제" onClick={() => remove(keyword)} className="p-0.5 text-ink-mute">
                  <X size={11} />
                </button>
              </div>
            ))}
          </div>
        </div>
      ) : null}

      <div>
        <SectionHeader title="인기 검색어" subtitle="많이 찾는 키워드 TOP 10" />
        <div className="mt-3 grid grid-cols-2 gap-x-3 gap-y-3">
          {trendingKeywords.map((keyword, i) => (
            <button
              key={keyword}
              onClick={() => onSelect(keyword)}
              className="flex items-center gap-2.5 text-left text-[14px] text-ink-soft"
            >
              <span
                className="w-4 text-[13px] font-bold"
                style={{ color: i < 3 ? "var(--brand)" : "var(--ink-mute)" }}
              >
                {i + 1}
              </span>
              {keyword}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
