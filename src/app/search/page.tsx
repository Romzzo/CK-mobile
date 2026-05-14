"use client";

import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { SlidersHorizontal, Check } from "lucide-react";
import SearchBar from "@/components/search/SearchBar";
import FilterBar from "@/components/search/FilterBar";
import RecentSearches from "@/components/search/RecentSearches";
import PinGrid from "@/components/home/PinGrid";
import ScrollRestore from "@/components/common/ScrollRestore";
import BottomNav from "@/components/layout/BottomNav";
import { useRecentSearches } from "@/lib/useRecentSearches";

const SORT_OPTIONS = ["추천순", "다운로드순", "등록순"];

function SearchContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const query = (searchParams.get("q") ?? "").trim();
  const hasQuery = query.length > 0;
  const { add: addRecent } = useRecentSearches();

  const [activeSort, setActiveSort] = useState("추천순");
  const [sortOpen, setSortOpen] = useState(false);

  useEffect(() => {
    const stored = sessionStorage.getItem("search_sort");
    if (stored && SORT_OPTIONS.includes(stored)) setActiveSort(stored);
  }, []);

  // 검색 쿼리가 들어올 때마다(직접 URL/입력 제출/최근·인기 키워드 탭 등) 최근 검색어에 누적
  useEffect(() => {
    if (query) addRecent(query);
  }, [query, addRecent]);

  const go = (q: string) => {
    const t = q.trim();
    router.replace(t ? `/search?q=${encodeURIComponent(t)}` : "/search");
  };

  return (
    <div className="min-h-dvh bg-surface-muted">
      <ScrollRestore />
      <SearchBar key={query} initialQuery={query} onSubmit={go} />

      {hasQuery ? (
        <>
          <FilterBar />
          <div className="pb-28">
            <div className="flex items-center justify-between gap-2 px-4 py-3.5">
              <span className="min-w-0 truncate text-[13px] text-ink-mute">
                <span className="font-bold text-ink">&ldquo;{query}&rdquo;</span> 검색 결과
              </span>
              <button
                onClick={() => setSortOpen(true)}
                className="flex shrink-0 items-center gap-1 rounded-full border border-line bg-surface px-3 py-1.5 text-[12px] font-medium text-ink-soft"
              >
                <SlidersHorizontal size={12} />
                {activeSort}
              </button>
            </div>
            <PinGrid key={query} query={query} />
          </div>
        </>
      ) : (
        <div className="pb-28">
          <RecentSearches onSelect={(kw) => go(kw)} />
        </div>
      )}

      <BottomNav />

      {/* ── 정렬 바텀시트 (z-[60] 로 BottomNav 위에 노출) ── */}
      {sortOpen ? (
        <>
          <div
            className="fixed inset-0 z-[55]"
            style={{ backgroundColor: "rgba(0,0,0,0.4)" }}
            onClick={() => setSortOpen(false)}
          />
          <div
            className="fixed bottom-0 left-1/2 z-[60] w-full max-w-[480px] -translate-x-1/2 rounded-t-2xl bg-surface px-4 pt-4"
            style={{ paddingBottom: "calc(env(safe-area-inset-bottom, 0px) + 24px)" }}
          >
            <div className="mx-auto mb-4 h-1 w-10 rounded-full bg-line" />
            <p className="mb-1 text-[15px] font-bold text-ink">정렬 기준</p>
            {SORT_OPTIONS.map((opt) => (
              <button
                key={opt}
                onClick={() => {
                  setActiveSort(opt);
                  sessionStorage.setItem("search_sort", opt);
                  setSortOpen(false);
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
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense>
      <SearchContent />
    </Suspense>
  );
}
