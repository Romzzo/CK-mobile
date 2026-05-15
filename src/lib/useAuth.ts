"use client";

import { useEffect, useState } from "react";

const KEY = "ck-auth";

/**
 * 프로토타입 인증 목업.
 * localStorage 에 ck-auth=1 을 두면 로그인 상태로 간주.
 * 실제 API 연동 시 이 훅을 진짜 세션 체크 로직으로 교체하면 됨.
 *
 * mounted: SSR/하이드레이션 직후엔 항상 false 로 시작해야 mismatch 가 안 생김.
 *   소비자 측에서 isLoggedIn 으로 분기하는 UI 가 있으면 mounted=false 동안엔
 *   "비로그인 깜빡임"을 피하기 위해 placeholder/null 렌더 권장.
 */
export function useAuth() {
  const [mounted, setMounted] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsLoggedIn(localStorage.getItem(KEY) === "1");
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);

    // 다른 탭에서 로그인/로그아웃 시 동기화
    const onStorage = (e: StorageEvent) => {
      if (e.key === KEY) setIsLoggedIn(e.newValue === "1");
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const login = () => {
    if (typeof window !== "undefined") localStorage.setItem(KEY, "1");
    setIsLoggedIn(true);
  };

  const logout = () => {
    if (typeof window !== "undefined") localStorage.removeItem(KEY);
    setIsLoggedIn(false);
  };

  return { isLoggedIn, mounted, login, logout };
}
