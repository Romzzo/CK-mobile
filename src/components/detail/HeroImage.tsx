"use client";

import { useEffect, useState } from "react";

/**
 * 콘텐츠 상세 hero 이미지.
 * - Pexels CDN cold load 같은 느린 응답 시 회색 빈 영역 대신 pulse 스켈레톤 노출
 * - 404·hotlink 등 실패 시 fallback 으로 자동 swap (onError)
 */
export default function HeroImage({
  src,
  fallback,
  alt,
}: {
  src: string;
  fallback: string;
  alt: string;
}) {
  const [current, setCurrent] = useState(src);
  const [loaded, setLoaded] = useState(false);

  // src prop 변경(스와이프) 시 동기화 + 스켈레톤 재진입
  useEffect(() => {
    setCurrent(src);
    setLoaded(false);
  }, [src]);

  return (
    <>
      {!loaded ? (
        <div
          aria-hidden
          className="absolute inset-0 animate-pulse bg-surface-muted"
        />
      ) : null}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={current}
        alt={alt}
        onLoad={() => setLoaded(true)}
        onError={() => {
          if (current !== fallback) {
            setLoaded(false);
            setCurrent(fallback);
          } else {
            setLoaded(true);
          }
        }}
        className="relative h-full w-full object-cover transition-opacity duration-200"
        style={{ opacity: loaded ? 1 : 0 }}
      />
    </>
  );
}
