"use client";

import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { useRef, useState } from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import SectionHeader from "@/components/home/SectionHeader";
import { events } from "@/lib/events";
import { useEmblaFirmDrag } from "@/lib/useEmblaFirmDrag";

export default function EventCarousel() {
  const plugin = useRef(Autoplay({ delay: 4000, stopOnInteraction: true }));
  const [api, setApi] = useState<CarouselApi>();
  useEmblaFirmDrag(api);

  return (
    <section className="pt-8">
      <div className="px-4">
        <SectionHeader title="진행 중인 이벤트" href="/event" action="전체 보기" />
      </div>

      <div className="mt-3 px-4">
        <Carousel
          setApi={setApi}
          plugins={[plugin.current]}
          opts={{ loop: true, duration: 10, dragFree: false, skipSnaps: false }}
          className="w-full"
        >
          <CarouselContent className="-ml-2">
            {events.map((e) => (
              <CarouselItem key={e.id} className="basis-[86%] pl-2">
                <Link
                  href={e.href}
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
