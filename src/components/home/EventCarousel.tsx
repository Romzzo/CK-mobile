"use client";

import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { useRef } from "react";
import Link from "next/link";

const events = [
  { id: 1, tag: "신규 가입", title: "신규가입 50% 할인", desc: "1년 라이선스 기준가에서 반값", path: "/membership" },
  { id: 2, tag: "크리에이터", title: "크리에이터 라이선스", desc: "198,000원 → 132,000원 / 6개월", path: "/membership" },
  { id: 3, tag: "무료 회원", title: "무료회원 평생 혜택", desc: "폰트 3,000종 · K-이미지 · PPT 무료", path: "/membership" },
];

export default function EventCarousel() {
  const plugin = useRef(Autoplay({ delay: 4000, stopOnInteraction: true }));

  return (
    <section className="pt-7">
      <div className="flex items-baseline justify-between px-4">
        <h2 className="text-[16px] font-bold text-ink">진행 중인 이벤트</h2>
        <Link href="/membership" className="text-[13px] font-medium text-ink-mute">
          전체 보기
        </Link>
      </div>

      <div className="mt-3 px-4">
        <Carousel plugins={[plugin.current]} opts={{ loop: true }} className="w-full">
          <CarouselContent className="-ml-2">
            {events.map((e) => (
              <CarouselItem key={e.id} className="basis-[86%] pl-2">
                <Link
                  href={e.path}
                  className="block rounded-2xl border border-line bg-surface p-4"
                >
                  <span className="text-[11px] font-bold text-brand">{e.tag}</span>
                  <p className="mt-1 text-[15px] font-bold text-ink">{e.title}</p>
                  <p className="mt-0.5 text-[13px] text-ink-soft">{e.desc}</p>
                </Link>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  );
}
