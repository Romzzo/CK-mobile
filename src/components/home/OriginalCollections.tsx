import Link from "next/link";
import SectionHeader from "@/components/home/SectionHeader";
import { ORIGINAL_COLLECTIONS } from "@/data/curated";

export default function OriginalCollections() {
  return (
    <section className="pt-8">
      <div className="px-4">
        <SectionHeader title="클립아트코리아 오리지널" />
      </div>

      <div className="no-scrollbar mt-3 flex gap-3 overflow-x-auto px-4 pb-1">
        {ORIGINAL_COLLECTIONS.map((c) => (
          <Link key={c.keyword} href={c.href} className="shrink-0">
            <div className="relative aspect-[3/4] w-36 overflow-hidden rounded-2xl bg-surface-muted">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={c.image} alt="" className="absolute inset-0 h-full w-full object-cover" />
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
