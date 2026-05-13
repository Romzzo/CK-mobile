"use client";

import { useEffect, useState } from "react";

const KEY = "ck-auth";

/**
 * 프로토타입 인증 목업.
 * localStorage 에 ck-auth=1 을 두면 로그인 상태로 간주.
 * 실제 API 연동 시 이 훅을 진짜 세션 체크 로직으로 교체하면 됨.
 */
export function useAuth() {
  // SSR/hydration 일관성: 초기엔 false, 마운트 후 localStorage 확인
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsLoggedIn(localStorage.getItem(KEY) === "1");

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

  return { isLoggedIn, login, logout };
}
