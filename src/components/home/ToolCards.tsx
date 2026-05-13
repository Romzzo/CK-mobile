"use client";

import { ChevronRight } from "lucide-react";
import { useEffect, useRef } from "react";
import SectionHeader from "@/components/home/SectionHeader";

const tools = [
  {
    title: "포토샵 없이 바로 편집",
    sub: "설치 없이 웹에서 · 무료 체험 가능",
    cta: "지금 만들어보기",
    href: "https://editor.clipartkorea.co.kr/editor",
    color: "purple",
  },
  {
    title: "가입하면 1,000크레딧",
    sub: "초상권 걱정 없는 AI 이미지",
    cta: "무료로 시작하기",
    href: "https://www.clipartkorea.co.kr/aistudio",
    color: "blue",
  },
  {
    title: "매일 무료 콘텐츠",
    sub: "AI이미지 · 폰트 · K-이미지 매일 제공",
    cta: "무료 혜택 보기",
    href: "/free",
    color: "green",
  },
  {
    title: "라이선스 최대 50% 할인",
    sub: "기간 한정 · 기업/개인 모두 적용",
    cta: "할인 확인하기",
    href: "/membership",
    color: "orange",
  },
] as const;

const ctaColorMap: Record<(typeof tools)[number]["color"], string> = {
  purple: "text-brand",
  blue: "text-blue-500",
  green: "text-emerald-500",
  orange: "text-orange-500",
};

export default function ToolCards() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const indexRef = useRef(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const scrollTo = (idx: number) => {
    const el = scrollRef.current;
    if (!el) return;
    const cards = el.querySelectorAll<HTMLElement>("a");
    if (!cards[idx]) return;
    el.scrollTo({ left: cards[idx].offsetLeft - 16, behavior: "smooth" });
  };

  const startAutoplay = () => {
    timerRef.current = setInterval(() => {
      indexRef.current = (indexRef.current + 1) % tools.length;
      scrollTo(indexRef.current);
    }, 3500);
  };

  const resetAutoplay = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    startAutoplay();
  };

  useEffect(() => {
    startAutoplay();
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className="pt-8">
      <div className="px-4">
        <SectionHeader title="놓치면 아까운 혜택" />
      </div>

      <div
        ref={scrollRef}
        onTouchStart={resetAutoplay}
        className="mt-3 flex gap-3 overflow-x-auto px-4 snap-x snap-mandatory [scroll-padding-left:1rem] [&::-webkit-scrollbar]:hidden [scrollbar-width:none] [-ms-overflow-style:none]"
      >
        {tools.map((t) => (
          <a
            key={t.href}
            href={t.href}
            target={t.href.startsWith("http") ? "_blank" : undefined}
            rel={t.href.startsWith("http") ? "noopener noreferrer" : undefined}
            className="snap-start flex h-[140px] w-[72vw] max-w-[260px] flex-shrink-0 flex-col rounded-2xl border border-line bg-surface p-4"
          >
            <p className="text-[15px] font-bold leading-snug text-ink">{t.title}</p>
            <p className="mt-1 text-[12px] leading-snug text-ink-mute">{t.sub}</p>
            <span className={`mt-auto inline-flex items-center gap-0.5 pt-3 text-[12px] font-semibold ${ctaColorMap[t.color]}`}>
              {t.cta}
              <ChevronRight size={13} />
            </span>
          </a>
        ))}
        <div className="w-4 shrink-0" />
      </div>
    </section>
  );
}
