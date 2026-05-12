"use client";

import Link from "next/link";

const items = [
  { label: "일러스트", type: "illust", seed: "ck-cat-illust" },
  { label: "사진", type: "photo", seed: "ck-cat-photo" },
  { label: "아이콘", type: "icon", seed: "ck-cat-icon" },
  { label: "AI 이미지", type: "ai", seed: "ck-cat-ai" },
  { label: "PPT 템플릿", type: "ppt", seed: "ck-cat-ppt" },
  { label: "폰트", type: "font", seed: "ck-cat-font" },
];

export default function CategoryCards() {
  return (
    <section className="px-4 pt-7">
      <div className="flex items-baseline justify-between">
        <h2 className="text-[16px] font-bold text-ink">카테고리</h2>
        <Link href="/search" className="text-[13px] font-medium text-ink-mute">
          전체 보기
        </Link>
      </div>

      <div className="mt-3 grid grid-cols-3 gap-2.5">
        {items.map((c) => (
          <Link
            key={c.type}
            href={`/category/${c.type}`}
            className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-surface-muted"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`https://picsum.photos/seed/${c.seed}/240/300`}
              alt=""
              className="absolute inset-0 h-full w-full object-cover"
            />
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
