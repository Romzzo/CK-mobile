"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

const CATEGORIES = [
  { label: "일러스트", type: "illust" },
  { label: "사진", type: "photo" },
  { label: "아이콘", type: "icon" },
  { label: "AI 이미지", type: "ai" },
  { label: "PPT 템플릿", type: "ppt" },
  { label: "폰트", type: "font" },
];

export default function CategoryCards() {
  const [imgs, setImgs] = useState<Record<string, string | null>>({});

  useEffect(() => {
    fetch("/api/pexels?type=categories")
      .then((r) => r.json())
      .then((data) => setImgs(data))
      .catch(() => {});
  }, []);

  return (
    <section className="px-4 pt-7">
      <div className="flex items-baseline justify-between">
        <h2 className="text-[16px] font-bold text-ink">카테고리</h2>
        <Link href="/search" className="text-[13px] font-medium text-ink-mute">
          전체 보기
        </Link>
      </div>

      <div className="mt-3 grid grid-cols-3 gap-2.5">
        {CATEGORIES.map((c) => (
          <Link
            key={c.type}
            href={`/category/${c.type}`}
            className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-surface-muted"
          >
            {imgs[c.type] ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={imgs[c.type]!}
                alt=""
                className="absolute inset-0 h-full w-full object-cover"
              />
            ) : (
              <div className="absolute inset-0 animate-pulse bg-surface-muted" />
            )}
            <div
              className="absolute inset-0"
              style={{ background: "linear-gradient(to top, rgba(0,0,0,0.55), rgba(0,0,0,0) 55%)" }}
            />
            <span className="absolute bottom-2.5 left-3 text-[13px] font-semibold text-white">
              {c.label}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
