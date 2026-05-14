"use client";

import { Suspense, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import SearchBar from "@/components/search/SearchBar";
import FilterBar from "@/components/search/FilterBar";
import RecentSearches from "@/components/search/RecentSearches";
import PinGrid from "@/components/home/PinGrid";
import ScrollRestore from "@/components/common/ScrollRestore";
import BottomNav from "@/components/layout/BottomNav";
import { useRecentSearches } from "@/lib/useRecentSearches";

function SearchContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const query = (searchParams.get("q") ?? "").trim();
  const hasQuery = query.length > 0;
  const { add: addRecent } = useRecentSearches();

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
            <div className="px-4 py-3.5">
              <span className="text-[13px] text-ink-mute">
                <span className="font-bold text-ink">&ldquo;{query}&rdquo;</span> 검색 결과
              </span>
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
