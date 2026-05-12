"use client";

import { useEffect } from "react";

/** 검색·카테고리 결과 등에서 콘텐츠 상세 진입 후 뒤로가기 시 스크롤 위치 복원 */
export default function ScrollRestore() {
  useEffect(() => {
    const key = `ck-scroll:${window.location.pathname}${window.location.search}`;

    const saved = sessionStorage.getItem(key);
    if (saved) {
      const target = parseInt(saved, 10);
      if (Number.isFinite(target) && target > 0) {
        let tries = 0;
        const restore = () => {
          window.scrollTo(0, target);
          tries += 1;
          if (window.scrollY < target - 4 && tries < 24) requestAnimationFrame(restore);
        };
        requestAnimationFrame(restore);
      }
    }

    let timer: ReturnType<typeof setTimeout> | null = null;
    const onScroll = () => {
      if (timer) return;
      timer = setTimeout(() => {
        timer = null;
        sessionStorage.setItem(key, String(Math.round(window.scrollY)));
      }, 150);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (timer) clearTimeout(timer);
    };
  }, []);

  return null;
}
