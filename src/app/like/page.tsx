"use client";

import { Heart, Minus, Lock } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { mockItems } from "@/lib/mockData";
import PageHeader from "@/components/layout/PageHeader";
import BottomNav from "@/components/layout/BottomNav";

const initialLiked = mockItems.filter((_, i) => i % 2 === 0);
const typeFilters = ["전체", "일러스트", "사진", "아이콘", "AI이미지", "PPT"];

const contentNo = (id: number) => `ta0225a${String(id).padStart(5, "0")}`;

const aspectClass = (a: "tall" | "wide" | "square") =>
  a === "tall" ? "aspect-[3/4]" : a === "wide" ? "aspect-[3/2]" : "aspect-square";

export default function LikePage() {
  const router = useRouter();
  const [items, setItems] = useState(initialLiked);
  const [activeType, setActiveType] = useState("전체");
  const [editMode, setEditMode] = useState(false);

  const filtered = activeType === "전체" ? items : items.filter((i) => i.type === activeType);
  const remove = (id: number) => setItems((prev) => prev.filter((i) => i.id !== id));
  const idsParam = filtered.map((i) => i.id).join(",");

  return (
    <div className="min-h-dvh bg-surface-muted pb-28">
      <PageHeader
        title="좋아요한 콘텐츠"
        subtitle={`${items.length}개`}
        fallbackHref="/"
        right={
          items.length > 0 ? (
            <button
              onClick={() => setEditMode((v) => !v)}
              className="shrink-0 px-3 py-2 text-[13px] font-semibold text-ink-soft"
            >
              {editMode ? "완료" : "편집"}
            </button>
          ) : null
        }
      />

      {/* 유형 필터 */}
      <div className="no-scrollbar flex gap-2 overflow-x-auto border-b border-line bg-surface px-4 py-3">
        {typeFilters.map((f) => {
          const active = activeType === f;
          return (
            <button
              key={f}
              onClick={() => setActiveType(f)}
              className="shrink-0 rounded-full px-3.5 py-1.5 text-[13px] font-medium transition-colors"
              style={
                active
                  ? { backgroundColor: "var(--ink)", color: "#fff" }
                  : { backgroundColor: "var(--surface-muted)", color: "var(--ink-soft)" }
              }
            >
              {f}
            </button>
          );
        })}
      </div>

      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-3 py-24">
          <Heart size={40} className="text-line" />
          <p className="text-[14px] text-ink-mute">좋아요한 콘텐츠가 없어요</p>
          <button
            onClick={() => router.push("/")}
            className="mt-1 rounded-full px-4 py-2 text-[14px] font-semibold text-white"
            style={{ backgroundColor: "var(--brand)" }}
          >
            콘텐츠 둘러보기
          </button>
        </div>
      ) : (
        <div className="columns-2 gap-2.5 px-3 pt-3">
          {filtered.map((item, idx) => (
            <div
              key={item.id}
              className="mb-2.5 break-inside-avoid overflow-hidden rounded-xl bg-surface"
            >
              <div
                onClick={
                  editMode
                    ? undefined
                    : () => router.push(`/content/${item.id}?ids=${idsParam}&idx=${idx}`)
                }
                className={`relative ${editMode ? "" : "cursor-pointer"}`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className={`w-full ${aspectClass(item.aspectRatio)} rounded-xl object-cover`}
                />

                {item.isPremium ? (
                  <span
                    className="absolute bottom-1.5 left-1.5 inline-flex items-center gap-1 rounded-md px-1.5 py-0.5 text-[10px] font-bold text-white"
                    style={{ backgroundColor: "rgba(10,8,18,0.65)", backdropFilter: "blur(4px)" }}
                  >
                    <Lock size={9} /> PRO
                  </span>
                ) : null}

                {editMode ? (
                  <button
                    aria-label="좋아요 해제"
                    onClick={(e) => {
                      e.stopPropagation();
                      remove(item.id);
                    }}
                    className="absolute left-1.5 top-1.5 grid h-7 w-7 place-items-center rounded-full bg-white/95 shadow-sm"
                  >
                    <Minus size={14} className="text-ink" />
                  </button>
                ) : null}
              </div>

              <div className="flex items-center justify-between gap-1 px-2 py-1.5">
                <span className="truncate text-[11px] text-ink-mute">{contentNo(item.id)}</span>
                <span
                  className="shrink-0 rounded-full px-2 py-0.5 text-[10px]"
                  style={{ backgroundColor: "var(--surface-muted)", color: "var(--ink-soft)" }}
                >
                  {item.type}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      <BottomNav />
    </div>
  );
}
