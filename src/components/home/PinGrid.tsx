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

export default function PinGrid({ query }: { query?: string }) {
  const [photos, setPhotos] = useState<PexelsPhoto[]>([]);

  useEffect(() => {
    const url = query
      ? `/api/pexels?query=${encodeURIComponent(query)}&per_page=12`
      : "/api/pexels?per_page=12";
    fetch(url)
      .then((r) => r.json())
      .then((data) => { if (data.photos) setPhotos(data.photos); })
      .catch(() => {});
  }, [query]);

  const idsParam = photos.map((p) => p.id).join(",");

  return (
    <div className="columns-2 gap-px">
      {photos.length === 0
        ? Array.from({ length: 12 }).map((_, i) => (
            <div
              key={i}
              className="mb-px w-full animate-pulse break-inside-avoid bg-surface-muted"
              style={{ aspectRatio: SKELETON_RATIOS[i % SKELETON_RATIOS.length] }}
            />
          ))
        : photos.map((photo, i) => (
            <PinCard key={photo.id} photo={photo} index={i} idsParam={idsParam} />
          ))}
    </div>
  );
}
