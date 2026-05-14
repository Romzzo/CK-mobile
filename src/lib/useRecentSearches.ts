"use client";

import { useCallback, useEffect, useState } from "react";

const KEY = "ck-recent-searches";
const MAX = 10;

function read(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((v): v is string => typeof v === "string");
  } catch {
    return [];
  }
}

function write(list: string[]) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(KEY, JSON.stringify(list));
  } catch {
    /* quota or disabled storage — ignore */
  }
}

/**
 * 최근 검색어 — localStorage 기반.
 * - add(kw): 중복 제거 + 맨 앞으로, 최대 MAX 개 유지
 * - remove(kw) / clearAll()
 * - 다른 탭에서 변경 시 storage 이벤트로 동기화
 *
 * SSR 안전을 위해 초기엔 빈 배열, 마운트 후 localStorage 로드.
 */
export function useRecentSearches() {
  const [list, setList] = useState<string[]>([]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setList(read());

    const onStorage = (e: StorageEvent) => {
      if (e.key === KEY) setList(read());
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const add = useCallback((kw: string) => {
    const t = kw.trim();
    if (!t) return;
    setList((prev) => {
      const next = [t, ...prev.filter((k) => k !== t)].slice(0, MAX);
      write(next);
      return next;
    });
  }, []);

  const remove = useCallback((kw: string) => {
    setList((prev) => {
      const next = prev.filter((k) => k !== kw);
      write(next);
      return next;
    });
  }, []);

  const clearAll = useCallback(() => {
    write([]);
    setList([]);
  }, []);

  return { list, add, remove, clearAll };
}
