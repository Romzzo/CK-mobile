"use client";

import { Heart, Lock } from "lucide-react";
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
  const isPremium = index === 4 || index === 7;
  const isNew = index < 3;

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

      {isPremium ? (
        <span
          className="absolute left-2 top-2 flex items-center gap-1 rounded-full px-1.5 py-0.5 text-[10px] font-semibold text-white"
          style={{ backgroundColor: "rgba(0,0,0,0.55)" }}
        >
          <Lock size={9} /> PRO
        </span>
      ) : isNew ? (
        <span className="absolute left-2 top-2 rounded-full bg-brand px-1.5 py-0.5 text-[10px] font-bold text-white">
          NEW
        </span>
      ) : null}

      <button
        aria-label="좋아요"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setLiked((v) => !v);
        }}
        className="absolute bottom-2 right-2 grid h-8 w-8 place-items-center rounded-full bg-white/80 shadow-sm before:absolute before:-inset-2 before:content-['']"
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
