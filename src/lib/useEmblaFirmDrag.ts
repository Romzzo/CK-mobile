"use client";

import { useEffect } from "react";
import type { CarouselApi } from "@/components/ui/carousel";

/**
 * Embla 캐러셀의 drag 종료 후 commit 안 된 케이스(짧은 드래그 → 스프링백)에서
 * 의도된 방향으로 강제 commit 시켜주는 보조 훅.
 *
 * Embla 내부 commit 임계값(goToNextThreshold ≒ 뷰포트의 20%, 480px 기준 ~96px)이
 * 모바일 가벼운 flick 에는 너무 커서 mushy 한 스프링백이 나옴.
 * 이 훅은 pointer up 시점의 drag 거리가 threshold(기본 30px) 이상이고
 * Embla 가 스냅을 안 옮긴 경우 한 칸만 강제로 scrollNext/Prev.
 */
export function useEmblaFirmDrag(api: CarouselApi | undefined, threshold = 30) {
  useEffect(() => {
    if (!api) return;
    const root = api.rootNode();
    let startX = 0;
    let startSnap = 0;

    const onDown = (e: PointerEvent) => {
      startX = e.clientX;
      startSnap = api.selectedScrollSnap();
    };
    const onUp = (e: PointerEvent) => {
      const dx = e.clientX - startX;
      if (Math.abs(dx) < threshold) return;
      // Embla 의 자체 commit 결정 직후를 한 프레임 뒤에 확인 → 스냅이 안 옮겨졌으면 강제 이동
      requestAnimationFrame(() => {
        if (api.selectedScrollSnap() === startSnap) {
          if (dx < 0) api.scrollNext();
          else api.scrollPrev();
        }
      });
    };

    root.addEventListener("pointerdown", onDown);
    root.addEventListener("pointerup", onUp);
    root.addEventListener("pointercancel", onUp);
    return () => {
      root.removeEventListener("pointerdown", onDown);
      root.removeEventListener("pointerup", onUp);
      root.removeEventListener("pointercancel", onUp);
    };
  }, [api, threshold]);
}
