"use client";

import { Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import SearchBar from "@/components/search/SearchBar";
import FilterBar from "@/components/search/FilterBar";
import RecentSearches from "@/components/search/RecentSearches";
import PinGrid from "@/components/home/PinGrid";
import ScrollRestore from "@/components/common/ScrollRestore";
import BottomNav from "@/components/layout/BottomNav";

function SearchContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const query = (searchParams.get("q") ?? "").trim();
  const hasQuery = query.length > 0;

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
          <div className="px-3 pb-28">
            <div className="px-1 py-3.5">
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
