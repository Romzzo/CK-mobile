"use client";

import { ArrowLeft, Heart, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { mockItems } from "@/lib/mockData";
import BottomNav from "@/components/layout/BottomNav";

const initialLiked = mockItems.filter((_, i) => i % 2 === 0);

const typeFilters = ["전체", "일러스트", "사진", "아이콘", "AI이미지", "PPT"];

export default function LikePage() {
  const router = useRouter();
  const [items, setItems] = useState(initialLiked);
  const [activeType, setActiveType] = useState("전체");

  const filtered = activeType === "전체" ? items : items.filter((i) => i.type === activeType);

  const remove = (id: number) => setItems((prev) => prev.filter((i) => i.id !== id));

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      <header className="sticky top-0 z-50 bg-white border-b border-gray-100 px-4 h-14 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button onClick={() => router.back()} className="p-1 -ml-1">
            <ArrowLeft size={22} className="text-gray-700" />
          </button>
          <h1 className="text-base font-bold text-gray-900">찜 목록</h1>
          <span className="text-xs text-gray-400 font-medium">{items.length}개</span>
        </div>
        <button className="flex items-center gap-1 text-xs text-gray-400 p-1">
          <Trash2 size={14} />
          전체 삭제
        </button>
      </header>

      {/* 유형 필터 */}
      <div className="flex gap-2 overflow-x-auto px-4 py-3 bg-white border-b border-gray-100" style={{ scrollbarWidth: "none" }}>
        {typeFilters.map((f) => (
          <button
            key={f}
            onClick={() => setActiveType(f)}
            className="flex-shrink-0 px-3.5 py-1.5 rounded-full text-xs font-medium transition-all"
            style={activeType === f
              ? { backgroundColor: "var(--ck-primary)", color: "#fff" }
              : { backgroundColor: "#F3F4F6", color: "#4B5563" }}
          >
            {f}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 gap-3">
          <Heart size={40} className="text-gray-200" />
          <p className="text-sm text-gray-400">찜한 콘텐츠가 없어요</p>
          <button
            onClick={() => router.push("/")}
            className="text-sm font-semibold px-4 py-2 rounded-full text-white mt-1"
            style={{ backgroundColor: "var(--ck-primary)" }}
          >
            콘텐츠 둘러보기
          </button>
        </div>
      ) : (
        <div className="px-3 pt-3">
          <div className="flex gap-2.5">
            <div className="flex-1 flex flex-col gap-2.5">
              {filtered.filter((_, i) => i % 2 === 0).map((item) => (
                <div key={item.id} className="relative rounded-xl overflow-hidden bg-gray-100">
                  <button onClick={() => router.push(`/content/${item.id}`)} className="w-full">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={item.imageUrl} alt={item.title} className="w-full h-40 object-cover" />
                  </button>
                  <button
                    onClick={() => remove(item.id)}
                    className="absolute top-2 right-2 w-7 h-7 rounded-full bg-white/90 flex items-center justify-center shadow-sm"
                  >
                    <Heart size={14} style={{ color: "var(--ck-danger)" }} fill="var(--ck-danger)" />
                  </button>
                  <div className="p-2">
                    <p className="text-xs text-gray-700 font-medium truncate">{item.title}</p>
                    <span className="text-[10px] text-gray-400">{item.type}</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex-1 flex flex-col gap-2.5">
              {filtered.filter((_, i) => i % 2 !== 0).map((item) => (
                <div key={item.id} className="relative rounded-xl overflow-hidden bg-gray-100">
                  <button onClick={() => router.push(`/content/${item.id}`)} className="w-full">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={item.imageUrl} alt={item.title} className="w-full h-40 object-cover" />
                  </button>
                  <button
                    onClick={() => remove(item.id)}
                    className="absolute top-2 right-2 w-7 h-7 rounded-full bg-white/90 flex items-center justify-center shadow-sm"
                  >
                    <Heart size={14} style={{ color: "var(--ck-danger)" }} fill="var(--ck-danger)" />
                  </button>
                  <div className="p-2">
                    <p className="text-xs text-gray-700 font-medium truncate">{item.title}</p>
                    <span className="text-[10px] text-gray-400">{item.type}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <BottomNav />
    </div>
  );
}
