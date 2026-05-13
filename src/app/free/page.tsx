"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown, ChevronRight, AlertTriangle } from "lucide-react";
import PageHeader from "@/components/layout/PageHeader";
import BottomNav from "@/components/layout/BottomNav";

const benefits = [
  { title: "이달의 무료 AI이미지", desc: "멤버십 전용 AI이미지를 이번 달에만 무료로", badge: "1컷/일 (월 최대 9컷)" },
  { title: "5만 컷의 무료이미지", desc: "포토·일러스트·PPT 등 다양한 디자인 소스", badge: "5컷/일" },
  { title: "무료폰트", desc: "저작권 클린 폰트 상업적으로 안심 사용", badge: "무제한" },
  { title: "한국관광공사 K-이미지", desc: "한국관광공사 제공 다채로운 K-이미지", badge: "20컷/일" },
];

const guide = [
  "무료콘텐츠는 다운로드 후 30일 이내로 사용 가능합니다.",
  "상업적 목적 사용 가능하나, 제품 디자인/패키지 등은 별도 라이선스 필요합니다.",
  "자세한 무료콘텐츠 사용범위는 PC에서 확인 가능합니다.",
];

export default function FreeContentPage() {
  const [openGuide, setOpenGuide] = useState(false);

  return (
    <div className="min-h-dvh bg-surface-muted pb-28">
      <PageHeader title="무료 콘텐츠" fallbackHref="/" />

      {/* 1. 헤더 배너 (다크) */}
      <section className="px-5 pb-7 pt-7 text-white" style={{ background: "linear-gradient(135deg, #221A3D, #14101F)" }}>
        <h1 className="text-[20px] font-bold leading-snug">상업적으로 이용가능한 콘텐츠가 매일 무료!</h1>
        <p className="mt-2 text-[13px] text-white/75">5만 컷 이상의 콘텐츠를 지금 무료로 만나보세요.</p>
        <Link
          href="/signup"
          className="mt-4 inline-flex items-center gap-1 rounded-xl bg-white px-4 py-2.5 text-[13px] font-bold text-brand"
        >
          무료 회원가입 <ChevronRight size={14} />
        </Link>
      </section>

      {/* 2. PC 안내 */}
      <div className="mx-4 mt-4 flex items-center gap-2 rounded-xl border border-amber-200 bg-amber-50 px-3.5 py-3 text-[12px] text-amber-800">
        <AlertTriangle size={15} className="shrink-0 text-amber-500" />
        무료콘텐츠 검색 및 다운로드는 PC에서 가능합니다.
      </div>

      {/* 3. 무료회원 혜택 */}
      <section className="px-4 pt-6">
        <h2 className="text-[16px] font-bold text-ink">무료회원 혜택 한눈에 보기 😍</h2>
        <div className="mt-3 grid grid-cols-2 gap-2.5">
          {benefits.map((b) => (
            <div key={b.title} className="flex flex-col rounded-2xl border border-line bg-surface p-4">
              <p className="text-[13px] font-bold leading-snug text-ink">{b.title}</p>
              <p className="mt-1.5 text-[11px] leading-snug text-ink-soft">{b.desc}</p>
              <span className="mt-auto inline-block self-start rounded-full bg-brand-soft px-2 py-0.5 text-[10px] font-bold text-brand">
                {b.badge}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* 4. 프로모션 배너 */}
      <Link
        href="/signup"
        className="mx-4 mt-6 flex items-center justify-between gap-3 rounded-2xl px-5 py-5 text-white"
        style={{ backgroundImage: "linear-gradient(135deg, #7C3AED, #4F46E5)" }}
      >
        <div>
          <p className="text-[13px] text-white/80">지금 가입하면 누구나</p>
          <p className="mt-0.5 text-[16px] font-bold leading-snug">에디터 30일 무료 사용 가능!</p>
        </div>
        <ChevronRight size={20} className="shrink-0 text-white/80" />
      </Link>

      {/* 5. 사용 가이드 */}
      <div className="mx-4 mt-3">
        <button
          onClick={() => setOpenGuide((v) => !v)}
          className="flex w-full items-center justify-between rounded-2xl border border-line bg-surface px-5 py-3.5"
        >
          <span className="text-[13px] font-semibold text-ink">사용 가이드</span>
          <ChevronDown
            size={16}
            className="text-ink-mute"
            style={{ transform: openGuide ? "rotate(180deg)" : "none", transition: "transform 0.2s" }}
          />
        </button>
        {openGuide ? (
          <ul className="mt-2 flex flex-col gap-2 rounded-2xl bg-surface px-5 py-4">
            {guide.map((g) => (
              <li key={g} className="flex gap-2 text-[12px] leading-relaxed text-ink-mute">
                <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-ink-mute" />
                {g}
              </li>
            ))}
          </ul>
        ) : null}
      </div>

      {/* 6. 하단 CTA */}
      <section className="px-4 pt-7">
        <p className="text-center text-[15px] font-bold text-ink">지금, 무료로 이용해 보세요</p>
        <Link
          href="/signup"
          className="mt-3 flex items-center justify-center gap-1.5 rounded-2xl py-4 text-[15px] font-semibold text-white"
          style={{ backgroundColor: "var(--ink)" }}
        >
          무료 회원가입 <ChevronRight size={16} />
        </Link>
      </section>

      <BottomNav />
    </div>
  );
}
