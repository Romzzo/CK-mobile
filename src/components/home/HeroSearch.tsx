"use client";

import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { forwardRef } from "react";

const hotKeywords = ["여름 배경", "꽃 일러스트", "비즈니스 아이콘", "AI 이미지", "PPT 템플릿"];

const HeroSearch = forwardRef<HTMLDivElement>((_, ref) => {
  const router = useRouter();

  return (
    <div
      className="relative px-5 pt-14 pb-12 overflow-hidden"
      style={{
        background: "linear-gradient(160deg, #0D0820 0%, #1E0A4A 35%, #3B1080 70%, #5B21B6 100%)",
      }}
    >
      {/* 배경 — 은은한 노이즈 느낌의 원 하나만 */}
      <div className="absolute top-0 right-0 w-72 h-72 rounded-full opacity-[0.06]"
        style={{ background: "radial-gradient(circle, #C084FC, transparent)" }} />

      {/* 타이틀 */}
      <div className="relative z-10 mb-6">
        <p className="text-purple-400 text-xs font-medium tracking-widest uppercase mb-2">
          1,500만+ 콘텐츠 · 무제한 다운로드
        </p>
        <h1 className="text-white text-[26px] font-bold leading-tight tracking-tight">
          원하는 이미지를<br />지금 바로 찾아보세요
        </h1>
      </div>

      {/* 검색바 — ref 연결 */}
      <div ref={ref} className="relative z-10 mb-5">
        <button
          onClick={() => router.push("/search")}
          className="w-full flex items-center gap-3 bg-white rounded-2xl px-4 shadow-2xl"
          style={{ height: "52px" }}
        >
          <Search size={17} className="text-gray-400 flex-shrink-0" />
          <span className="text-gray-400 text-sm flex-1 text-left">이미지, 아이콘, 폰트 검색</span>
          <div
            className="flex-shrink-0 px-4 py-2 rounded-xl text-xs font-semibold text-white"
            style={{ backgroundColor: "var(--ck-primary)" }}
          >
            검색
          </div>
        </button>
      </div>

      {/* 인기 키워드 */}
      <div className="relative z-10 flex gap-2 flex-wrap">
        {hotKeywords.map((kw) => (
          <button
            key={kw}
            onClick={() => router.push(`/search?q=${encodeURIComponent(kw)}`)}
            className="text-xs px-3 py-1.5 rounded-full text-purple-200 font-medium border border-purple-700/60 bg-purple-900/30 hover:bg-purple-800/40 transition-colors"
          >
            {kw}
          </button>
        ))}
      </div>
    </div>
  );
});

HeroSearch.displayName = "HeroSearch";
export default HeroSearch;
