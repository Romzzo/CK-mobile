"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function PromoBanner() {
  return (
    <section className="px-4 pt-5">
      <h1 className="text-[22px] font-bold leading-snug tracking-tight text-ink">
        찾던 이미지,
        <br />
        여기 다 있어요
      </h1>
      <p className="mt-1.5 text-[13px] text-ink-soft">
        일러스트 · 사진 · 아이콘 · AI 이미지 · 폰트 1,500만+
      </p>

      <Link
        href="/membership"
        className="relative mt-4 block overflow-hidden rounded-2xl bg-brand p-5 text-white"
      >
        <div
          className="pointer-events-none absolute -right-8 -top-10 h-36 w-36 rounded-full"
          style={{ backgroundColor: "rgba(255,255,255,0.12)" }}
        />
        <span className="text-[11px] font-bold tracking-[0.18em] text-white/65">WELCOME OFFER</span>
        <p className="mt-1.5 text-[19px] font-bold leading-tight">첫 구매 94% 할인</p>
        <p className="mt-1 text-[13px] text-white/85">
          5컷 라이선스 150,000원 → <span className="font-semibold">9,000원</span>
          <span className="text-white/55"> · VAT 별도</span>
        </p>
        <span className="mt-3 inline-flex items-center gap-1 text-[13px] font-semibold">
          혜택 받기 <ArrowRight size={14} />
        </span>
      </Link>
    </section>
  );
}
