"use client";

import { Crown } from "lucide-react";

export default function HeroBanner() {
  return (
    <div
      className="mx-4 mt-3 rounded-2xl p-4 flex items-center justify-between overflow-hidden relative"
      style={{
        background: "linear-gradient(135deg, var(--ck-primary) 0%, var(--ck-primary-dark) 100%)",
      }}
    >
      {/* 배경 장식 */}
      <div className="absolute right-0 top-0 w-32 h-32 rounded-full opacity-10 bg-white -translate-y-1/2 translate-x-1/2" />
      <div className="absolute right-8 bottom-0 w-20 h-20 rounded-full opacity-10 bg-white translate-y-1/2" />

      <div className="relative z-10">
        <div className="flex items-center gap-1.5 mb-1">
          <Crown size={14} className="text-yellow-300" fill="currentColor" />
          <span className="text-yellow-300 text-xs font-semibold">프리미엄 멤버십</span>
        </div>
        <p className="text-white font-bold text-base leading-snug">
          무제한 다운로드
          <br />
          <span className="text-purple-200">월 19,900원</span>부터
        </p>
      </div>

      <button className="relative z-10 bg-white text-sm font-bold px-4 py-2 rounded-full flex-shrink-0" style={{ color: "var(--ck-primary)" }}>
        시작하기
      </button>
    </div>
  );
}
