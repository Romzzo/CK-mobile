"use client";

import { Heart, Lock } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import { mockItems, type ContentItem } from "@/lib/mockData";

const ratioClass: Record<ContentItem["aspectRatio"], string> = {
  tall: "aspect-[3/4]",
  square: "aspect-square",
  wide: "aspect-[3/2]",
};

function PinCard({ item }: { item: ContentItem }) {
  const [liked, setLiked] = useState(false);

  return (
    <Link
      href={`/content/${item.id}`}
      className="relative block overflow-hidden rounded-xl bg-surface-muted"
    >
      <div className={`${ratioClass[item.aspectRatio]} w-full`}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={item.imageUrl}
          alt={item.title}
          loading="lazy"
          className="h-full w-full object-cover"
        />
      </div>

      {item.isPremium ? (
        <span
          className="absolute left-2 top-2 flex items-center gap-1 rounded-full px-1.5 py-0.5 text-[10px] font-semibold text-white"
          style={{ backgroundColor: "rgba(0,0,0,0.55)" }}
        >
          <Lock size={9} /> PRO
        </span>
      ) : item.isNew ? (
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

export default function PinGrid({ items = mockItems }: { items?: ContentItem[] }) {
  const cols = [
    items.filter((_, i) => i % 2 === 0),
    items.filter((_, i) => i % 2 === 1),
  ];

  return (
    <div className="flex gap-2">
      {cols.map((col, i) => (
        <div key={i} className="flex flex-1 flex-col gap-2">
          {col.map((item) => (
            <PinCard key={item.id} item={item} />
          ))}
        </div>
      ))}
    </div>
  );
}
