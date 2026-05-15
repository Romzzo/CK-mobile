"use client";

import { ChevronRight, Paintbrush, Sparkles, Gift, BadgePercent } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import Autoplay from "embla-carousel-autoplay";
import { useRef } from "react";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import SectionHeader from "@/components/home/SectionHeader";

type ColorKey = "purple" | "blue" | "green" | "orange";

// 우하단 장식 아이콘:
// - iconSrc 가 있으면 public/tools/ 의 PNG/SVG 자산(예: "/tools/credit.png")을 렌더
// - 없으면 Icon(lucide) 폴백 렌더
// 3D 일러스트 느낌을 원하면 public/tools/ 에 파일 두고 iconSrc 만 채우면 됨.
const tools: ReadonlyArray<{
  title: string;
  sub: string;
  cta: string;
  href: string;
  color: ColorKey;
  Icon: LucideIcon;
  iconSrc?: string;
}> = [
  {
    title: "포토샵 없이 바로 편집",
    sub: "설치 없이 웹에서 · 무료 체험 가능",
    cta: "지금 만들어보기",
    href: "https://editor.clipartkorea.co.kr/editor",
    color: "purple",
    Icon: Paintbrush,
  },
  {
    title: "가입하면 1,000크레딧",
    sub: "초상권 걱정 없는 AI 이미지",
    cta: "무료로 시작하기",
    href: "https://www.clipartkorea.co.kr/aistudio",
    color: "blue",
    Icon: Sparkles,
  },
  {
    title: "매일 무료 콘텐츠",
    sub: "AI이미지 · 폰트 · K-이미지 매일 제공",
    cta: "무료 혜택 보기",
    href: "/free",
    color: "green",
    Icon: Gift,
  },
  {
    title: "라이선스 최대 50% 할인",
    sub: "기간 한정 · 기업/개인 모두 적용",
    cta: "할인 확인하기",
    href: "/membership",
    color: "orange",
    Icon: BadgePercent,
  },
];

const ctaColorMap: Record<ColorKey, string> = {
  purple: "text-brand",
  blue: "text-blue-500",
  green: "text-emerald-500",
  orange: "text-orange-500",
};

const iconBgMap: Record<ColorKey, string> = {
  purple: "rgba(126, 60, 234, 0.12)",
  blue: "rgba(59, 130, 246, 0.12)",
  green: "rgba(16, 185, 129, 0.12)",
  orange: "rgba(249, 115, 22, 0.12)",
};

const iconColorMap: Record<ColorKey, string> = {
  purple: "var(--brand)",
  blue: "#3B82F6",
  green: "#10B981",
  orange: "#F97316",
};

export default function ToolCards() {
  const plugin = useRef(Autoplay({ delay: 3500, stopOnInteraction: true }));

  return (
    <section className="pt-8">
      <div className="px-4">
        <SectionHeader title="놓치면 아까운 혜택" />
      </div>

      <div className="mt-3 px-4">
        <Carousel
          plugins={[plugin.current]}
          opts={{ loop: true, align: "start", duration: 10, dragFree: false, skipSnaps: false }}
          className="w-full"
        >
          <CarouselContent className="-ml-3">
            {tools.map((t) => (
              <CarouselItem key={t.href} className="basis-[72%] max-w-[260px] pl-3">
                <a
                  href={t.href}
                  target={t.href.startsWith("http") ? "_blank" : undefined}
                  rel={t.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="relative flex h-[140px] flex-col overflow-hidden rounded-2xl border border-line bg-surface p-4"
                >
                  <p className="text-[15px] font-bold leading-snug text-ink">{t.title}</p>
                  <p className="mt-1 text-[12px] leading-snug text-ink-mute">{t.sub}</p>
                  <span
                    className={`mt-auto inline-flex items-center gap-0.5 pt-3 text-[12px] font-semibold ${ctaColorMap[t.color]}`}
                  >
                    {t.cta}
                    <ChevronRight size={13} />
                  </span>

                  {/* 우하단 장식 아이콘 */}
                  <div
                    className="pointer-events-none absolute bottom-3 right-3 grid h-12 w-12 place-items-center rounded-full"
                    style={{ backgroundColor: iconBgMap[t.color] }}
                  >
                    {t.iconSrc ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={t.iconSrc} alt="" className="h-9 w-9 object-contain" />
                    ) : (
                      <t.Icon size={22} strokeWidth={1.8} style={{ color: iconColorMap[t.color] }} />
                    )}
                  </div>
                </a>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  );
}
