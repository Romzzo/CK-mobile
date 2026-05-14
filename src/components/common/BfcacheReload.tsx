"use client";

import { useEffect } from "react";

/**
 * bfcache(back-forward cache) 복원 후에도 React state/이벤트 핸들러가 stale 상태로 남아
 * 입력·검색이 안 먹히는 케이스 방어. persisted=true 면 진짜 reload 강제.
 *
 * 모바일 사파리는 PTR 등에서 bfcache 복원을 적극적으로 활용해 이 문제가 두드러짐.
 */
export default function BfcacheReload() {
  useEffect(() => {
    const onPageShow = (e: PageTransitionEvent) => {
      if (e.persisted) window.location.reload();
    };
    window.addEventListener("pageshow", onPageShow);
    return () => window.removeEventListener("pageshow", onPageShow);
  }, []);

  return null;
}
