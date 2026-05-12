"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import SearchBar from "@/components/search/SearchBar";
import FilterBar from "@/components/search/FilterBar";
import RecentSearches from "@/components/search/RecentSearches";
import PinGrid from "@/components/home/PinGrid";
import BottomNav from "@/components/layout/BottomNav";

function SearchContent() {
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("q") ?? "");

  useEffect(() => {
    setQuery(searchParams.get("q") ?? "");
  }, [searchParams]);

  const hasQuery = query.trim().length > 0;

  return (
    <div className="min-h-screen bg-surface-muted">
      <SearchBar value={query} onChange={setQuery} onClear={() => setQuery("")} />

      {hasQuery ? (
        <>
          <FilterBar />
          <div className="px-3 pb-28">
            <div className="px-1 py-3.5">
              <span className="text-[13px] text-ink-mute">
                <span className="font-bold text-ink">&ldquo;{query}&rdquo;</span> 검색 결과 1,234개
              </span>
            </div>
            <PinGrid />
          </div>
        </>
      ) : (
        <div className="pb-28">
          <RecentSearches onSelect={(kw) => setQuery(kw)} />
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
