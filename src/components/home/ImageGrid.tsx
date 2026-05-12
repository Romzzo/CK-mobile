"use client";

import { ChevronRight } from "lucide-react";
import Link from "next/link";
import PinGrid from "@/components/home/PinGrid";
import SectionHeader from "@/components/home/SectionHeader";

export default function ImageGrid() {
  return (
    <section className="px-3 pt-8">
      <div className="px-1">
        <SectionHeader title="추천 콘텐츠" subtitle="지금 많이 다운로드되는 소스" href="/search" />
      </div>

      <div className="mt-3">
        <PinGrid />
      </div>

      <Link
        href="/search"
        className="mx-1 mt-3 flex items-center justify-center gap-1 rounded-xl border border-line bg-surface py-3.5 text-[14px] font-semibold text-ink-soft"
      >
        추천 콘텐츠 더 보기
        <ChevronRight size={15} />
      </Link>
    </section>
  );
}
