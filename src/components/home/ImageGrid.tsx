"use client";

import { Heart, Lock, Sparkles } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { mockItems, type ContentItem } from "@/lib/mockData";

const typeBadgeStyle: Record<string, string> = {
  "일러스트": "bg-purple-100 text-purple-700",
  "사진": "bg-blue-100 text-blue-700",
  "아이콘": "bg-green-100 text-green-700",
  "AI이미지": "bg-pink-100 text-pink-700",
  "PPT": "bg-orange-100 text-orange-700",
  "폰트": "bg-gray-100 text-gray-700",
  "영상": "bg-red-100 text-red-700",
};

function ImageCard({ item }: { item: ContentItem }) {
  const [liked, setLiked] = useState(false);
  const router = useRouter();

  const heightClass = {
    tall: "h-52",
    wide: "h-28",
    square: "h-40",
  }[item.aspectRatio];

  return (
    <div className="relative rounded-xl overflow-hidden bg-gray-100 group" onClick={() => router.push(`/content/${item.id}`)}>
      {/* 이미지 */}
      <div className={`${heightClass} w-full relative`}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={item.imageUrl}
          alt={item.title}
          className="w-full h-full object-cover"
          loading="lazy"
        />

        {/* 프리미엄 오버레이 */}
        {item.isPremium && (
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
        )}

        {/* 뱃지들 */}
        <div className="absolute top-2 left-2 flex gap-1">
          {item.isNew && (
            <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-yellow-400 text-yellow-900">
              NEW
            </span>
          )}
          {item.isPremium && (
            <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-black/60 text-white flex items-center gap-0.5">
              <Lock size={8} />
              PRO
            </span>
          )}
        </div>

        {/* AI 뱃지 */}
        {item.type === "AI이미지" && (
          <div className="absolute top-2 right-2">
            <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full flex items-center gap-0.5" style={{ backgroundColor: "var(--ck-primary)", color: "#fff" }}>
              <Sparkles size={8} />
              AI
            </span>
          </div>
        )}

        {/* 하트 버튼 */}
        <button
          className="absolute bottom-2 right-2 w-7 h-7 rounded-full bg-white/90 flex items-center justify-center shadow-sm"
          onClick={(e) => { e.stopPropagation(); setLiked(!liked); }}
        >
          <Heart
            size={14}
            className={liked ? "" : "text-gray-400"}
            style={liked ? { color: "var(--ck-danger)" } : undefined}
            fill={liked ? "var(--ck-danger)" : "none"}
          />
        </button>
      </div>

      {/* 하단 정보 */}
      <div className="p-2">
        <p className="text-xs text-gray-700 font-medium truncate leading-snug">{item.title}</p>
        <div className="flex items-center justify-between mt-1">
          <span className={`text-[10px] font-medium px-1.5 py-0.5 rounded-full ${typeBadgeStyle[item.type]}`}>
            {item.type}
          </span>
          <span className="text-[10px] text-gray-400">@{item.author}</span>
        </div>
      </div>
    </div>
  );
}

export default function ImageGrid() {
  const left = mockItems.filter((_, i) => i % 2 === 0);
  const right = mockItems.filter((_, i) => i % 2 !== 0);

  return (
    <div className="px-3 mt-4">
      <div className="flex items-center justify-between mb-3 px-1">
        <h2 className="text-sm font-bold text-gray-800">추천 콘텐츠</h2>
        <button className="text-xs font-medium" style={{ color: "var(--ck-primary)" }}>
          더보기
        </button>
      </div>

      {/* 2컬럼 masonry */}
      <div className="flex gap-2.5">
        <div className="flex-1 flex flex-col gap-2.5">
          {left.map((item) => <ImageCard key={item.id} item={item} />)}
        </div>
        <div className="flex-1 flex flex-col gap-2.5">
          {right.map((item) => <ImageCard key={item.id} item={item} />)}
        </div>
      </div>
    </div>
  );
}
