"use client";

import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { useRef } from "react";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

const events = [
  {
    id: 1,
    tag: "WELCOME OFFER",
    title: "첫 구매 94% OFF",
    desc: "5컷 15만원 → 단 9,000원 (부가세 별도)",
    bg: "#1E0A4A",
    accent: "#A78BFA",
    path: "/membership",
  },
  {
    id: 2,
    tag: "PROMOTION",
    title: "신규가입 50% 할인",
    desc: "1년 라이선스 기준가에서 반값",
    bg: "#0C1A3A",
    accent: "#60A5FA",
    path: "/membership",
  },
  {
    id: 3,
    tag: "CREATOR",
    title: "크리에이터 라이선스",
    desc: "198,000원 → 132,000원 / 6개월",
    bg: "#0D2818",
    accent: "#34D399",
    path: "/membership",
  },
  {
    id: 4,
    tag: "FREE",
    title: "무료회원 평생혜택",
    desc: "폰트 3,000종 · K-이미지 · PPT 무료",
    bg: "#2A0F1E",
    accent: "#F472B6",
    path: "/membership",
  },
];

export default function EventCarousel() {
  const router = useRouter();
  const plugin = useRef(Autoplay({ delay: 3500, stopOnInteraction: true }));

  return (
    <div className="mt-5 px-4">
      <div className="flex items-center justify-between mb-3">
        <span className="text-sm font-bold text-gray-900">진행 중인 이벤트</span>
        <button className="text-xs font-medium" style={{ color: "var(--ck-primary)" }}>전체보기</button>
      </div>
      <Carousel plugins={[plugin.current]} opts={{ loop: true }} className="w-full">
        <CarouselContent className="-ml-3">
          {events.map((event) => (
            <CarouselItem key={event.id} className="pl-3 basis-[88%]">
              <div
                onClick={() => router.push(event.path)}
                className="relative rounded-2xl px-5 py-4 overflow-hidden h-28 flex flex-col justify-between cursor-pointer"
                style={{ backgroundColor: event.bg }}
              >
                {/* 오른쪽 accent 라인 장식 */}
                <div
                  className="absolute right-0 top-0 bottom-0 w-1 rounded-r-2xl"
                  style={{ backgroundColor: event.accent }}
                />

                <div>
                  <span
                    className="text-[10px] font-bold tracking-widest"
                    style={{ color: event.accent }}
                  >
                    {event.tag}
                  </span>
                  <h3 className="text-white font-bold text-base leading-snug mt-1">{event.title}</h3>
                  <p className="text-gray-400 text-xs mt-0.5">{event.desc}</p>
                </div>

                <button className="self-start flex items-center gap-1 text-xs font-semibold" style={{ color: event.accent }}>
                  자세히 보기 <ArrowRight size={11} />
                </button>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
}
