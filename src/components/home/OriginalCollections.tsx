"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import SectionHeader from "@/components/home/SectionHeader";

const collections = [
  { title: "AI캐릭터", sub: "다양한 3D 캐릭터", keyword: "AI캐릭터", href: "/category/ai" },
  { title: "킨포크 라이프", sub: "완벽하지 않아도 괜찮아요", keyword: "킨포크", href: "/search?q=킨포크" },
  { title: "결혼의계절", sub: "눈부신 계절의 우리", keyword: "결혼", href: "/search?q=결혼" },
  { title: "푸른 자연", sub: "자연의 아름다움", keyword: "자연", href: "/search?q=자연" },
];

export default function OriginalCollections() {
  const [imgs, setImgs] = useState<Record<string, string | null>>({});

  useEffect(() => {
    collections.forEach((c) => {
      fetch(`/api/pexels?query=${encodeURIComponent(c.keyword)}&per_page=1`)
        .then((r) => r.json())
        .then((data) => {
          const url = data?.photos?.[0]?.src?.portrait ?? null;
          if (url) setImgs((prev) => ({ ...prev, [c.keyword]: url }));
        })
        .catch(() => {});
    });
  }, []);

  return (
    <section className="pt-8">
      <div className="px-4">
        <SectionHeader title="클립아트코리아 오리지널" />
      </div>

      <div className="no-scrollbar mt-3 flex gap-3 overflow-x-auto px-4 pb-1">
        {collections.map((c) => (
          <Link key={c.keyword} href={c.href} className="shrink-0">
            <div className="relative aspect-[3/4] w-36 overflow-hidden rounded-2xl bg-surface-muted">
              {imgs[c.keyword] ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={imgs[c.keyword]!} alt="" className="absolute inset-0 h-full w-full object-cover" />
              ) : (
                <div className="absolute inset-0 animate-pulse bg-surface-muted" />
              )}
              <div
                className="absolute inset-0"
                style={{ background: "linear-gradient(to top, rgba(0,0,0,0.62), rgba(0,0,0,0) 60%)" }}
              />
              <div className="absolute inset-x-3 bottom-3">
                <p className="text-[14px] font-bold leading-tight text-white">{c.title}</p>
                <p className="mt-0.5 truncate text-[11px] text-white/75">{c.sub}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
