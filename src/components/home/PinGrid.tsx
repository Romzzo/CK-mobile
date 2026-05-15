"use client";

import { SearchX } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import LikeButton from "@/components/ui/LikeButton";
import { MASONRY } from "@/components/ui/masonry";

// 검색 결과 0건일 때 추천할 인기 키워드 (하드코딩 — 추후 운영 데이터 연동)
const POPULAR_KEYWORDS = [
  "배경화면",
  "사람",
  "비즈니스",
  "자연",
  "음식",
  "여행",
  "패턴",
  "크리스마스",
];

interface PexelsPhoto {
  id: number;
  width: number;
  height: number;
  alt: string;
  src: { portrait: string; landscape: string; medium: string; small: string };
}

function PinCard({ photo, index, idsParam }: { photo: PexelsPhoto; index: number; idsParam: string }) {
  const [liked, setLiked] = useState(false);
  const aspect = photo.width && photo.height ? photo.width / photo.height : 1;
  // 콘텐츠 타입 뱃지 (mock — 실제론 콘텐츠 메타에서 옴)
  //  - 의료뷰티: 초상권 계약이 완료된 인물사진
  //  - AI: 생성형 AI 이미지
  const isAI = index === 0 || index === 5 || index === 9;
  const isMedical = index === 2 || index === 7;

  return (
    <Link
      href={`/content/${photo.id}?ids=${idsParam}&idx=${index}`}
      className={`relative block ${MASONRY.tight.item}`}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={photo.src.medium}
        alt={photo.alt || ""}
        loading="lazy"
        className="block w-full bg-surface-muted"
        style={{ aspectRatio: aspect }}
      />

      {isMedical ? (
        <span
          className="absolute left-2 top-2 rounded-full px-2 py-0.5 text-[10px] font-bold text-white"
          style={{ backgroundColor: "rgba(0,0,0,0.4)" }}
        >
          의료뷰티
        </span>
      ) : isAI ? (
        <span
          className="absolute left-2 top-2 rounded-full px-2 py-0.5 text-[10px] font-bold text-white"
          style={{ backgroundColor: "color-mix(in srgb, var(--brand) 40%, transparent)" }}
        >
          AI
        </span>
      ) : null}

      <LikeButton liked={liked} onToggle={() => setLiked((v) => !v)} />
    </Link>
  );
}

const SKELETON_RATIOS = [3 / 4, 1, 4 / 3, 2 / 3, 4 / 5, 3 / 5];
const PER_PAGE = 12;

// Pexels 는 다운로드/등록 정렬을 제공하지 않아 프로토타입 차원에서
// 정렬값별로 Pexels 페이지 시작점을 어긋나게 띄움. 무한 스크롤은 이 시작점 위로 page 를 +1 씩 가산.
const SORT_PAGE_OFFSET: Record<string, number> = {
  추천순: 0,
  다운로드순: 10,
  등록순: 20,
};

// query/sort 가 바뀌면 부모(/search 페이지)에서 key 를 새로 줘 컴포넌트가 remount 된다.
// 그래서 내부 reset 로직 없이 page=1 부터 자연스럽게 다시 시작.
export default function PinGrid({
  query,
  sort = "추천순",
  onSelect,
}: {
  query?: string;
  sort?: string;
  onSelect?: (keyword: string) => void;
}) {
  const [photos, setPhotos] = useState<PexelsPhoto[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    let cancelled = false;
    if (page === 1) setLoading(true);
    else setLoadingMore(true);

    const pexelsPage = (SORT_PAGE_OFFSET[sort] ?? 0) + page;
    const params = new URLSearchParams({
      per_page: String(PER_PAGE),
      page: String(pexelsPage),
    });
    if (query) params.set("query", query);

    fetch(`/api/pexels?${params.toString()}`)
      .then((r) => r.json())
      .then((data) => {
        if (cancelled) return;
        const next = Array.isArray(data.photos) ? data.photos : [];
        setPhotos((prev) => (page === 1 ? next : [...prev, ...next]));
        if (next.length < PER_PAGE) setHasMore(false);
      })
      .catch(() => {
        if (!cancelled) setHasMore(false);
      })
      .finally(() => {
        if (cancelled) return;
        setLoading(false);
        setLoadingMore(false);
      });

    return () => {
      cancelled = true;
    };
  }, [page, sort, query]);

  // 무한 스크롤 sentinel — 마지막 카드 가까이 보이면 다음 페이지 로드
  const sentinelRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (!hasMore || loading || loadingMore) return;
    const el = sentinelRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setPage((p) => p + 1);
        }
      },
      { rootMargin: "320px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [hasMore, loading, loadingMore]);

  const idsParam = photos.map((p) => p.id).join(",");

  // 초기 로딩(페이지 1) — 스켈레톤
  if (loading) {
    return (
      <div className={MASONRY.tight.grid}>
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={i}
            className={`w-full animate-pulse bg-surface-muted ${MASONRY.tight.item}`}
            style={{ aspectRatio: SKELETON_RATIOS[i % SKELETON_RATIOS.length] }}
          />
        ))}
      </div>
    );
  }

  // 검색 쿼리가 있는데 결과 0건 — empty state (docs/spec-search-empty-state.md)
  if (photos.length === 0 && query) {
    return (
      <div className="flex flex-col items-center px-6 pb-16 pt-16 text-center">
        <SearchX size={56} strokeWidth={1.5} className="mb-5 text-ink-mute" />

        <p className="text-[16px] font-medium text-ink">
          <strong className="font-bold">{query}</strong> 검색 결과가 없어요
        </p>

        <p className="mt-2 text-[13px] leading-relaxed text-ink-soft">
          철자가 맞는지 확인하거나
          <br />더 짧은 키워드로 검색해보세요
        </p>

        <div className="mt-6 w-full">
          <p className="mb-2 text-left text-[12px] font-bold text-ink-mute">인기 키워드</p>
          <div className="flex gap-2 overflow-x-auto pb-1 [&::-webkit-scrollbar]:hidden [scrollbar-width:none]">
            {POPULAR_KEYWORDS.map((kw) => (
              <button
                key={kw}
                onClick={() => onSelect?.(kw)}
                className="shrink-0 rounded-full border border-line bg-surface px-3.5 py-1.5 text-[13px] text-ink-soft"
              >
                {kw}
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className={MASONRY.tight.grid}>
        {photos.map((photo, i) => (
          <PinCard key={photo.id} photo={photo} index={i} idsParam={idsParam} />
        ))}
      </div>

      {hasMore ? (
        <div ref={sentinelRef} className="flex h-16 items-center justify-center">
          {loadingMore ? (
            <span className="text-[12px] text-ink-mute">불러오는 중...</span>
          ) : null}
        </div>
      ) : (
        <div className="py-6 text-center text-[12px] text-ink-mute">
          모든 결과를 다 봤어요
        </div>
      )}
    </>
  );
}
