"use client";

import { useEffect, useState } from "react";

/**
 * 콘텐츠 상세 hero 이미지.
 * Pexels CDN 이 특정 id 에서 404·hotlink 차단 등으로 실패하는 케이스를
 * onError 로 잡아 fallback 으로 자동 전환.
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

  // src prop 변경(스와이프로 새 콘텐츠 진입) 시 동기화
  useEffect(() => {
    setCurrent(src);
  }, [src]);

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={current}
      alt={alt}
      onError={() => {
        if (current !== fallback) setCurrent(fallback);
      }}
      className="h-full w-full object-cover"
    />
  );
}
