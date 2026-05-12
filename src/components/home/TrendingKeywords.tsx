"use client";

import Link from "next/link";
import { trendingKeywords } from "@/lib/mockData";

export default function TrendingKeywords() {
  return (
    <section className="px-4 pt-7">
      <h2 className="text-[16px] font-bold text-ink">지금 많이 찾는 키워드</h2>
      <div className="mt-3 flex flex-wrap gap-2">
        {trendingKeywords.map((kw, i) => (
          <Link
            key={kw}
            href={`/search?q=${encodeURIComponent(kw)}`}
            className="flex items-center gap-1.5 rounded-full border border-line bg-surface px-3 py-2 text-[13px] text-ink-soft"
          >
            <span className="text-[11px] font-bold text-brand">{i + 1}</span>
            {kw}
          </Link>
        ))}
      </div>
    </section>
  );
}
