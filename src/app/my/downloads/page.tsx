"use client";

import { Download, Calendar } from "lucide-react";
import { useRouter } from "next/navigation";
import { mockItems } from "@/lib/mockData";
import PageHeader from "@/components/layout/PageHeader";

const downloadHistory = mockItems
  .map((item, i) => ({ ...item, downloadedAt: `2026-05-${String(12 - i).padStart(2, "0")}` }))
  .slice(0, 10);

export default function DownloadsPage() {
  const router = useRouter();

  return (
    <div className="min-h-dvh bg-surface">
      <PageHeader title="다운로드 이력" fallbackHref="/my" />

      <div className="px-4 py-2">
        {downloadHistory.map((item) => (
          <button
            key={item.id}
            onClick={() => router.push(`/content/${item.id}`)}
            className="flex w-full items-center gap-3 border-b border-line py-3 last:border-0"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={item.imageUrl} alt={item.title} className="h-14 w-14 shrink-0 rounded-xl object-cover" />
            <div className="min-w-0 flex-1 text-left">
              <p className="truncate text-[14px] font-medium text-ink">{item.title}</p>
              <p className="mt-0.5 text-[12px] text-ink-mute">{item.type}</p>
              <div className="mt-1 flex items-center gap-1">
                <Calendar size={10} className="text-ink-mute" />
                <span className="text-[11px] text-ink-mute">{item.downloadedAt}</span>
              </div>
            </div>
            <Download size={16} className="shrink-0 text-ink-mute" />
          </button>
        ))}
      </div>
    </div>
  );
}
