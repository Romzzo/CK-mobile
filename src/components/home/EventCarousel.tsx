"use client";

import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { useRef } from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import SectionHeader from "@/components/home/SectionHeader";

const events = [
  { id: 1, tag: "신규 가입", title: "신규가입 50% 할인", desc: "1년 라이선스 기준가에서 반값", path: "/membership" },
  { id: 2, tag: "크리에이터", title: "크리에이터 라이선스", desc: "198,000원 → 132,000원 / 6개월", path: "/membership" },
  { id: 3, tag: "무료 회원", title: "무료회원 평생 혜택", desc: "폰트 3,000종 · K-이미지 · PPT 무료", path: "/membership" },
];

export default function EventCarousel() {
  const plugin = useRef(Autoplay({ delay: 4000, stopOnInteraction: true }));

  return (
    <section className="pt-8">
      <div className="px-4">
        <SectionHeader title="진행 중인 이벤트" href="/membership" action="전체 보기" />
      </div>

      <div className="mt-3 px-4">
        <Carousel plugins={[plugin.current]} opts={{ loop: true }} className="w-full">
          <CarouselContent className="-ml-2">
            {events.map((e) => (
              <CarouselItem key={e.id} className="basis-[86%] pl-2">
                <Link
                  href={e.path}
                  className="flex items-center justify-between gap-3 rounded-2xl border border-line bg-surface p-4"
                >
                  <div className="min-w-0">
                    <span className="text-[11px] font-bold text-brand">{e.tag}</span>
                    <p className="mt-1 truncate text-[15px] font-bold text-ink">{e.title}</p>
                    <p className="mt-0.5 truncate text-[13px] text-ink-soft">{e.desc}</p>
                  </div>
                  <ChevronRight size={18} className="shrink-0 text-ink-mute" />
                </Link>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  );
}
