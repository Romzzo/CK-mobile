"use client";

import Link from "next/link";
import { trendingKeywords } from "@/lib/mockData";
import SectionHeader from "@/components/home/SectionHeader";

export default function TrendingKeywords() {
  return (
    <section className="px-4 pt-8">
      <SectionHeader title="지금 많이 찾는 키워드" subtitle="실시간 인기 검색어 TOP 10" />

      <div className="mt-3 flex flex-wrap gap-2">
        {trendingKeywords.map((kw, i) => (
          <Link
            key={kw}
            href={`/search?q=${encodeURIComponent(kw)}`}
            className="flex items-center gap-1.5 rounded-full border border-line bg-surface px-3 py-2 text-[13px] text-ink-soft"
          >
            <span
              className="text-[11px] font-bold"
              style={{ color: i < 3 ? "var(--brand)" : "var(--ink-mute)" }}
            >
              {i + 1}
            </span>
            {kw}
          </Link>
        ))}
      </div>
    </section>
  );
}
