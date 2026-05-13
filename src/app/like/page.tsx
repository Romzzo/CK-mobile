"use client";

import { Heart } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { mockItems } from "@/lib/mockData";
import PageHeader from "@/components/layout/PageHeader";
import BottomNav from "@/components/layout/BottomNav";

const initialLiked = mockItems.filter((_, i) => i % 2 === 0);
const typeFilters = ["전체", "일러스트", "사진", "아이콘", "AI이미지", "PPT"];

const contentNo = (id: number) => `ta0225a${String(id).padStart(5, "0")}`;

export default function LikePage() {
  const router = useRouter();
  const [items, setItems] = useState(initialLiked);
  const [activeType, setActiveType] = useState("전체");

  const filtered = activeType === "전체" ? items : items.filter((i) => i.type === activeType);
  const remove = (id: number) => setItems((prev) => prev.filter((i) => i.id !== id));
  const idsParam = filtered.map((i) => i.id).join(",");
  const cols = [filtered.filter((_, i) => i % 2 === 0), filtered.filter((_, i) => i % 2 === 1)];

  return (
    <div className="min-h-dvh bg-surface-muted pb-28">
      <PageHeader
        title="좋아요한 콘텐츠"
        subtitle={items.length > 0 ? `${items.length}개` : undefined}
        fallbackHref="/"
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
              style={active
                ? { backgroundColor: "var(--ink)", color: "#fff" }
                : { backgroundColor: "var(--surface-muted)", color: "var(--ink-soft)" }}
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
        <div className="px-3 pt-3">
          <div className="flex gap-2.5">
            {cols.map((col, ci) => (
              <div key={ci} className="flex flex-1 flex-col gap-2.5">
                {col.map((item) => (
                  <div key={item.id} className="relative overflow-hidden rounded-xl bg-surface">
                    <button
                      onClick={() => router.push(`/content/${item.id}?ids=${idsParam}&idx=${filtered.indexOf(item)}`)}
                      className="block w-full"
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={item.imageUrl} alt={item.title} className="h-40 w-full object-cover" />
                    </button>
                    <button
                      aria-label="좋아요 해제"
                      onClick={() => remove(item.id)}
                      className="absolute right-1.5 top-1.5 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 shadow-sm"
                    >
                      <Heart size={15} style={{ color: "var(--danger)" }} fill="var(--danger)" />
                    </button>
                    <div className="p-2">
                      <p className="truncate text-[12px] font-medium text-ink-soft">{contentNo(item.id)}</p>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      )}

      <BottomNav />
    </div>
  );
}
