"use client";

import { Heart } from "lucide-react";
import { useState, useEffect } from "react";
import Link from "next/link";

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
      className="relative mb-px block break-inside-avoid"
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

      <button
        aria-label="좋아요"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setLiked((v) => !v);
        }}
        className="absolute bottom-2 right-2 grid h-8 w-8 place-items-center rounded-full bg-white/60 shadow-sm before:absolute before:-inset-2 before:content-['']"
        style={{ backdropFilter: "blur(4px)" }}
      >
        <Heart
          size={15}
          className={liked ? "" : "text-ink-soft"}
          style={liked ? { color: "var(--danger)" } : undefined}
          fill={liked ? "var(--danger)" : "none"}
        />
      </button>
    </Link>
  );
}

const SKELETON_RATIOS = [3 / 4, 1, 4 / 3, 2 / 3, 4 / 5, 3 / 5];

// 한글 받침 유무에 따라 조사 "이/가" 결정. 비한글(영문 등)은 "가" 기본.
function subjectParticle(word: string): string {
  if (!word) return "가";
  const last = word.charCodeAt(word.length - 1);
  if (last >= 0xac00 && last <= 0xd7a3) {
    return (last - 0xac00) % 28 !== 0 ? "이" : "가";
  }
  return "가";
}

export default function PinGrid({ query }: { query?: string }) {
  const [photos, setPhotos] = useState<PexelsPhoto[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const url = query
      ? `/api/pexels?query=${encodeURIComponent(query)}&per_page=12`
      : "/api/pexels?per_page=12";
    fetch(url)
      .then((r) => r.json())
      .then((data) => setPhotos(Array.isArray(data.photos) ? data.photos : []))
      .catch(() => setPhotos([]))
      .finally(() => setLoading(false));
  }, [query]);

  const idsParam = photos.map((p) => p.id).join(",");

  if (loading) {
    return (
      <div className="columns-2 gap-px">
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={i}
            className="mb-px w-full animate-pulse break-inside-avoid bg-surface-muted"
            style={{ aspectRatio: SKELETON_RATIOS[i % SKELETON_RATIOS.length] }}
          />
        ))}
      </div>
    );
  }

  // 검색 쿼리가 있는데 결과 0건 — 안내 메시지
  if (photos.length === 0 && query) {
    return (
      <div className="px-6 pb-12 pt-10 text-center">
        <p className="text-[14px] text-ink-soft">
          <strong className="font-bold text-ink">{query}</strong>
          {subjectParticle(query)} 포함된 검색결과가 없어요.
        </p>
        <p className="mt-1.5 text-[13px] text-ink-mute">
          다른 키워드로 검색해주세요.
        </p>
      </div>
    );
  }

  return (
    <div className="columns-2 gap-px">
      {photos.map((photo, i) => (
        <PinCard key={photo.id} photo={photo} index={i} idsParam={idsParam} />
      ))}
    </div>
  );
}
