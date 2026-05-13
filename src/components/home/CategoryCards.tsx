import Link from "next/link";
import SectionHeader from "@/components/home/SectionHeader";
import { CATEGORIES } from "@/data/curated";

export default function CategoryCards() {
  return (
    <section className="px-4 pt-8">
      <SectionHeader title="카테고리" href="/category" action="전체 보기" />

      <div className="mt-3 grid grid-cols-3 gap-2.5">
        {CATEGORIES.map((c) => (
          <Link
            key={c.type}
            href={`/category/${c.type}`}
            className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-surface-muted"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={c.image} alt="" className="absolute inset-0 h-full w-full object-cover" />
            <div
              className="absolute inset-0"
              style={{ background: "linear-gradient(to top, rgba(0,0,0,0.58), rgba(0,0,0,0) 56%)" }}
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
