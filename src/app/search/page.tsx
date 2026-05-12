"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import SearchBar from "@/components/search/SearchBar";
import FilterBar from "@/components/search/FilterBar";
import RecentSearches from "@/components/search/RecentSearches";
import ImageGrid from "@/components/home/ImageGrid";
import BottomNav from "@/components/layout/BottomNav";

function SearchContent() {
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("q") ?? "");

  useEffect(() => {
    setQuery(searchParams.get("q") ?? "");
  }, [searchParams]);

  const hasQuery = query.trim().length > 0;

  return (
    <div className="min-h-screen bg-gray-50">
      <SearchBar
        value={query}
        onChange={setQuery}
        onClear={() => setQuery("")}
      />

      {hasQuery ? (
        <>
          <FilterBar />
          <div className="pb-24">
            <div className="px-4 py-3">
              <span className="text-xs text-gray-500">
                <span className="font-semibold text-gray-800">&ldquo;{query}&rdquo;</span> 검색 결과 1,234개
              </span>
            </div>
            <ImageGrid />
          </div>
        </>
      ) : (
        <div className="pb-24">
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
