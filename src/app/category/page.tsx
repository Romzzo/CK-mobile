"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { ChevronRight } from "lucide-react";
import PageHeader from "@/components/layout/PageHeader";
import BottomNav from "@/components/layout/BottomNav";

const CATEGORIES: { type: string; label: string; desc: string; count?: string; badge?: string }[] = [
  { type: "update", label: "업데이트", desc: "이번 주 새로 올라온 콘텐츠", badge: "NEW" },
  { type: "illust", label: "일러스트", desc: "수채화·라인·캐릭터까지", count: "320만+" },
  { type: "photo", label: "사진", desc: "인물·풍경·음식·비즈니스", count: "580만+" },
  { type: "icon", label: "아이콘", desc: "라인·플랫·3D 아이콘 세트", count: "80만+" },
  { type: "ai", label: "AI 이미지", desc: "AI로 생성한 무한 변형 소스", badge: "NEW" },
  { type: "ppt", label: "PPT 템플릿", desc: "발표 자료·인포그래픽", count: "12만+" },
  { type: "composite", label: "합성·웹", desc: "웹 배너·상세페이지용 합성 소스", count: "5만+" },
  { type: "3d", label: "3D", desc: "리얼한 3D 렌더 오브젝트", badge: "NEW" },
  { type: "png", label: "PNG", desc: "배경 없는 누끼 PNG 소스", count: "30만+" },
];

export default function CategoryIndexPage() {
  const [imgs, setImgs] = useState<Record<string, string | null>>({});

  useEffect(() => {
    fetch("/api/pexels?type=categories")
      .then((r) => r.json())
      .then((data) => setImgs(data))
      .catch(() => {});
  }, []);

  return (
    <div className="min-h-dvh bg-surface-muted">
      <PageHeader title="카테고리" />

      <main className="px-4 pb-28 pt-5">
        <div className="flex flex-col gap-3">
          {CATEGORIES.map((c) => (
            <Link
              key={c.type}
              href={c.type === "update" ? "/update" : `/category/${c.type}`}
              className="relative block h-[100px] overflow-hidden rounded-2xl bg-surface-muted"
            >
              {imgs[c.type] ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={imgs[c.type]!} alt="" className="absolute inset-0 h-full w-full object-cover" />
              ) : (
                <div className="absolute inset-0 animate-pulse bg-surface-muted" />
              )}
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(100deg, rgba(10,8,18,0.74) 0%, rgba(10,8,18,0.32) 58%, rgba(10,8,18,0.06) 100%)",
                }}
              />
              <div className="relative flex h-full items-center justify-between gap-3 px-5">
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-[17px] font-bold text-white">{c.label}</span>
                    {c.badge ? (
                      <span
                        className="rounded-full px-1.5 py-0.5 text-[10px] font-bold text-white"
                        style={{ backgroundColor: "rgba(255,255,255,0.22)", backdropFilter: "blur(4px)" }}
                      >
                        {c.badge}
                      </span>
                    ) : null}
                  </div>
                  <p className="mt-1 truncate text-[12px] text-white/80">{c.desc}</p>
                  {c.count ? <p className="mt-0.5 text-[11px] text-white/55">{c.count}</p> : null}
                </div>
                <ChevronRight size={18} className="shrink-0 text-white/70" />
              </div>
            </Link>
          ))}
        </div>
      </main>

      <BottomNav />
    </div>
  );
}
