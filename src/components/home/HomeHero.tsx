"use client";

import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState, type FormEvent, type RefObject } from "react";

// Pexels 미연결(키 없음)·로딩 중 폴백
const HERO_FALLBACK = "https://picsum.photos/seed/ck-hero-studio/1200/720";

const hotKeywords = ["여름 배경", "꽃 일러스트", "비즈니스 아이콘", "AI 이미지"];

export default function HomeHero({ searchRef }: { searchRef: RefObject<HTMLDivElement | null> }) {
  const router = useRouter();
  const [q, setQ] = useState("");
  const [heroImg, setHeroImg] = useState<string>(HERO_FALLBACK);

  useEffect(() => {
    fetch("/api/pexels?query=colorful%20creative%20studio&per_page=1")
      .then((r) => r.json())
      .then((d) => {
        const url = d?.photos?.[0]?.src?.landscape;
        if (url) setHeroImg(url);
      })
      .catch(() => {});
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
              placeholder="이미지, 아이콘, 폰트 검색"
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
