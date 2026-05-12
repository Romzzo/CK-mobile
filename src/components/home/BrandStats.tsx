"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

const stats = [
  { value: "1,500만+", label: "콘텐츠" },
  { value: "300만+", label: "회원" },
  { value: "20년+", label: "운영" },
];

export default function BrandStats() {
  return (
    <section className="px-4 pt-7">
      <div className="rounded-2xl border border-line bg-surface p-5">
        <p className="text-[13px] font-medium text-ink-soft">국내 최대 스톡 이미지 플랫폼</p>

        <div className="mt-3 grid grid-cols-3 gap-2">
          {stats.map((s) => (
            <div key={s.label}>
              <p className="text-[18px] font-bold leading-none text-ink">{s.value}</p>
              <p className="mt-1 text-[12px] text-ink-mute">{s.label}</p>
            </div>
          ))}
        </div>

        <Link
          href="/membership"
          className="mt-4 flex items-center justify-center gap-1.5 rounded-xl bg-brand py-3 text-[14px] font-semibold text-white"
        >
          무료로 시작하기 <ArrowRight size={15} />
        </Link>
      </div>
    </section>
  );
}
