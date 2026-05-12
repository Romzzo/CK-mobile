"use client";

import { Clock, X, TrendingUp } from "lucide-react";
import { useState } from "react";
import { trendingKeywords } from "@/lib/mockData";

const initialRecent = ["여름 배경", "비즈니스 아이콘", "꽃 일러스트", "AI 배경", "인물 사진"];

export default function RecentSearches({ onSelect }: { onSelect: (keyword: string) => void }) {
  const [recent, setRecent] = useState(initialRecent);

  const remove = (keyword: string) => setRecent((prev) => prev.filter((k) => k !== keyword));
  const clearAll = () => setRecent([]);

  return (
    <div className="px-4 py-4">
      {/* 최근 검색어 */}
      {recent.length > 0 && (
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-bold text-gray-800">최근 검색어</span>
            <button onClick={clearAll} className="text-xs text-gray-400">전체 삭제</button>
          </div>
          <div className="flex flex-wrap gap-2">
            {recent.map((keyword) => (
              <div key={keyword} className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 rounded-full">
                <Clock size={11} className="text-gray-400" />
                <button onClick={() => onSelect(keyword)} className="text-xs text-gray-700">{keyword}</button>
                <button onClick={() => remove(keyword)} className="p-0.5">
                  <X size={10} className="text-gray-400" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 인기 검색어 */}
      <div>
        <div className="flex items-center gap-1.5 mb-3">
          <TrendingUp size={14} style={{ color: "var(--ck-primary)" }} />
          <span className="text-sm font-bold text-gray-800">인기 검색어</span>
        </div>
        <div className="grid grid-cols-2 gap-y-2">
          {trendingKeywords.map((keyword, i) => (
            <button
              key={keyword}
              onClick={() => onSelect(keyword)}
              className="flex items-center gap-2 text-sm text-gray-700 text-left"
            >
              <span className="w-5 text-xs font-bold" style={{ color: i < 3 ? "var(--ck-primary)" : "#9CA3AF" }}>
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
