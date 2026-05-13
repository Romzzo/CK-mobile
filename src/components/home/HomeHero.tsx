"use client";

import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState, type FormEvent, type RefObject } from "react";
import { HERO_IMAGES, HERO_FALLBACK } from "@/data/hero";

const hotKeywords = ["어버이날", "여름 배경", "AI 이미지", "비즈니스 아이콘", "꽃 일러스트"];

export default function HomeHero({ searchRef }: { searchRef: RefObject<HTMLDivElement | null> }) {
  const router = useRouter();
  const [q, setQ] = useState("");
  // SSR/hydration 일관성을 위해 폴백으로 시작, 클라이언트 마운트 후 랜덤 픽
  const [heroImg, setHeroImg] = useState<string>(HERO_FALLBACK);

  useEffect(() => {
    if (HERO_IMAGES.length === 0) return;
    const pick = HERO_IMAGES[Math.floor(Math.random() * HERO_IMAGES.length)];
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setHeroImg(pick);
  }, []);

  const goSearch = (term: string) => {
    const t = term.trim();
    router.push(t ? `/search?q=${encodeURIComponent(t)}` : "/search");
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    goSearch(q);
  };

  return (
    <section className="relative overflow-hidden" style={{ backgroundColor: "#16101F" }}>
      <div className="absolute inset-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={heroImg} alt="" className="h-full w-full object-cover" />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(12,9,22,0.62) 0%, rgba(12,9,22,0.3) 32%, rgba(12,9,22,0.64) 100%)",
          }}
        />
      </div>

      <div className="relative px-5 pb-[68px]" style={{ paddingTop: "calc(5rem + env(safe-area-inset-top, 0px))" }}>
        <h1 className="text-[26px] font-bold leading-[1.25] tracking-tight text-white">
          일잘러 디자이너의 필수 사이트
          <br />
          <span className="font-normal text-white/85">클립아트코리아</span>
        </h1>

        <div ref={searchRef} className="mt-[30px]">
          <form
            onSubmit={onSubmit}
            className="flex h-[52px] w-full items-center gap-3 rounded-2xl bg-white px-4 shadow-lg"
          >
            <Search size={18} className="shrink-0 text-ink-mute" />
            <input
              type="search"
              enterKeyHint="search"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="한글, 영문, 콘텐츠번호로 검색"
              className="min-w-0 flex-1 bg-transparent text-[14px] text-ink outline-none placeholder:text-ink-mute"
            />
            <button
              type="submit"
              className="shrink-0 rounded-xl px-4 py-2 text-[13px] font-semibold text-white"
              style={{ backgroundColor: "var(--brand)" }}
            >
              검색
            </button>
          </form>
        </div>

        <div className="mt-3 flex flex-wrap gap-2">
          {hotKeywords.map((kw) => (
            <button
              key={kw}
              onClick={() => goSearch(kw)}
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
