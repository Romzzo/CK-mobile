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

function getAspectRatio(w: number, h: number): "tall" | "square" | "wide" {
  if (h > w * 1.15) return "tall";
  if (w > h * 1.15) return "wide";
  return "square";
}

const ratioClass = {
  tall: "aspect-[3/4]",
  square: "aspect-square",
  wide: "aspect-[3/2]",
};

function PinCard({ photo, index }: { photo: PexelsPhoto; index: number }) {
  const [liked, setLiked] = useState(false);
  const ratio = getAspectRatio(photo.width, photo.height);
  const isPremium = index === 4 || index === 7;
  const isNew = index < 3;

  return (
    <Link
      href={`/content/${photo.id}`}
      className="relative block overflow-hidden rounded-xl bg-surface-muted"
    >
      <div className={`${ratioClass[ratio]} w-full`}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={photo.src.medium}
          alt={photo.alt || ""}
          loading="lazy"
          className="h-full w-full object-cover"
        />
      </div>

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
        aria-label="찜하기"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setLiked((v) => !v);
        }}
        className="absolute bottom-2 right-2 grid h-8 w-8 place-items-center rounded-full bg-white/90 shadow-sm"
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

export default function PinGrid() {
  const [photos, setPhotos] = useState<PexelsPhoto[]>([]);

  useEffect(() => {
    fetch("/api/pexels?per_page=12")
      .then((r) => r.json())
      .then((data) => { if (data.photos) setPhotos(data.photos); })
      .catch(() => {});
  }, []);

  const cols = [
    photos.filter((_, i) => i % 2 === 0),
    photos.filter((_, i) => i % 2 === 1),
  ];

  return (
    <div className="flex gap-2">
      {photos.length === 0 ? (
        [0, 1].map((col) => (
          <div key={col} className="flex flex-1 flex-col gap-2">
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="aspect-[3/4] w-full animate-pulse rounded-xl bg-surface-muted" />
            ))}
          </div>
        ))
      ) : (
        cols.map((col, i) => (
          <div key={i} className="flex flex-1 flex-col gap-2">
            {col.map((photo, idx) => (
              <PinCard key={photo.id} photo={photo} index={i * 6 + idx} />
            ))}
          </div>
        ))
      )}
    </div>
  );
}
