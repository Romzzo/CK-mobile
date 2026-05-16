"use client";

import { useEffect, useRef, useState, type ReactNode, type TouchEvent } from "react";
import { useRouter } from "next/navigation";

const SWIPE_THRESHOLD = 50;

interface DetailSwiperProps {
  ids: number[];
  idx: number;
  dir: "next" | "prev" | null;
  children: ReactNode;
}

export default function DetailSwiper({ ids, idx, dir, children }: DetailSwiperProps) {
  const router = useRouter();
  const startX = useRef<number | null>(null);
  const [offset, setOffset] = useState(dir === "next" ? "100%" : dir === "prev" ? "-100%" : "0");
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    if (dir !== "next" && dir !== "prev") return;
    const raf = requestAnimationFrame(() => {
      setAnimate(true);
      setOffset("0");
    });
    return () => cancelAnimationFrame(raf);
  }, [dir]);

  const go = (newIdx: number, direction: "next" | "prev") => {
    router.replace(`/content/${ids[newIdx]}?ids=${ids.join(",")}&idx=${newIdx}&dir=${direction}`);
  };

  const onTouchStart = (e: TouchEvent) => {
    startX.current = e.touches[0]?.clientX ?? null;
  };
  const onTouchEnd = (e: TouchEvent) => {
    if (startX.current === null) return;
    const delta = (e.changedTouches[0]?.clientX ?? startX.current) - startX.current;
    startX.current = null;
    if (delta <= -SWIPE_THRESHOLD && idx < ids.length - 1) go(idx + 1, "next");
    else if (delta >= SWIPE_THRESHOLD && idx > 0) go(idx - 1, "prev");
  };

  return (
    <div onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
      <div
        style={{
          transform: `translateX(${offset})`,
          transition: animate ? "transform 0.28s cubic-bezier(0.16,1,0.3,1)" : undefined,
        }}
      >
        {children}
      </div>
    </div>
  );
}
