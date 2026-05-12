"use client";

import { TrendingUp } from "lucide-react";
import { useRouter } from "next/navigation";
import { trendingKeywords } from "@/lib/mockData";

export default function TrendingKeywords() {
  const router = useRouter();

  return (
    <div className="px-4 mt-4">
      <div className="flex items-center gap-1.5 mb-2.5">
        <TrendingUp size={14} style={{ color: "var(--ck-primary)" }} />
        <span className="text-xs font-semibold text-gray-500">지금 인기 검색어</span>
      </div>
      <div className="flex flex-wrap gap-1.5">
        {trendingKeywords.map((keyword, i) => (
          <button
            key={keyword}
            onClick={() => router.push(`/search?q=${encodeURIComponent(keyword)}`)}
            className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-white border border-gray-200 text-xs text-gray-600 hover:border-purple-300 transition-colors"
          >
            <span className="text-[10px] font-bold" style={{ color: "var(--ck-primary-light)" }}>
              {i + 1}
            </span>
            {keyword}
          </button>
        ))}
      </div>
    </div>
  );
}
