"use client";

import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import type { RefObject } from "react";

// 임시 히어로 배경 — Pexels API 연동 시 큐레이션 이미지로 교체 예정
const HERO_IMAGE = "https://picsum.photos/seed/ck-hero-studio/960/760";

const hotKeywords = ["여름 배경", "꽃 일러스트", "비즈니스 아이콘", "AI 이미지"];

export default function HomeHero({ searchRef }: { searchRef: RefObject<HTMLDivElement | null> }) {
  const router = useRouter();

  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={HERO_IMAGE} alt="" className="h-full w-full object-cover" />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(12,9,22,0.6) 0%, rgba(12,9,22,0.28) 32%, rgba(12,9,22,0.62) 100%)",
          }}
        />
      </div>

      <div className="relative px-5 pb-7 pt-20">
        <h1 className="text-[26px] font-bold leading-[1.25] tracking-tight text-white">
          찾던 이미지,
          <br />
          여기 다 있어요
        </h1>
        <p className="mt-2 text-[13px] text-white/75">
          일러스트 · 사진 · 아이콘 · AI 이미지 · 폰트 1,500만+
        </p>

        <div ref={searchRef} className="mt-5">
          <button
            onClick={() => router.push("/search")}
            className="flex h-[52px] w-full items-center gap-3 rounded-2xl bg-white px-4 text-left shadow-lg"
          >
            <Search size={18} className="shrink-0 text-ink-mute" />
            <span className="flex-1 text-[14px] text-ink-mute">이미지, 아이콘, 폰트 검색</span>
            <span
              className="shrink-0 rounded-xl px-4 py-2 text-[13px] font-semibold text-white"
              style={{ backgroundColor: "var(--brand)" }}
            >
              검색
            </span>
          </button>
        </div>

        <div className="mt-3 flex flex-wrap gap-2">
          {hotKeywords.map((kw) => (
            <button
              key={kw}
              onClick={() => router.push(`/search?q=${encodeURIComponent(kw)}`)}
              className="rounded-full px-3 py-1.5 text-[12px] font-medium text-white"
              style={{ backgroundColor: "rgba(255,255,255,0.18)", backdropFilter: "blur(4px)" }}
            >
              {kw}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
