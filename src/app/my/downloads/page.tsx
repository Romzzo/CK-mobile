"use client";

import { ArrowLeft, Download, Calendar } from "lucide-react";
import { useRouter } from "next/navigation";
import { mockItems } from "@/lib/mockData";

const downloadHistory = mockItems.map((item, i) => ({
  ...item,
  downloadedAt: `2026-05-${String(12 - i).padStart(2, "0")}`,
})).slice(0, 10);

export default function DownloadsPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="sticky top-0 z-50 bg-white border-b border-gray-100 px-4 h-14 flex items-center gap-3">
        <button onClick={() => router.back()} className="p-1 -ml-1">
          <ArrowLeft size={22} className="text-gray-700" />
        </button>
        <h1 className="text-base font-bold text-gray-900">다운로드 이력</h1>
      </header>

      <div className="px-4 py-2">
        {downloadHistory.map((item) => (
          <button
            key={item.id}
            onClick={() => router.push(`/content/${item.id}`)}
            className="w-full flex items-center gap-3 py-3 border-b border-gray-100 last:border-0"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={item.imageUrl} alt={item.title} className="w-14 h-14 rounded-xl object-cover flex-shrink-0" />
            <div className="flex-1 min-w-0 text-left">
              <p className="text-sm font-medium text-gray-800 truncate">{item.title}</p>
              <p className="text-xs text-gray-400 mt-0.5">{item.type}</p>
              <div className="flex items-center gap-1 mt-1">
                <Calendar size={10} className="text-gray-300" />
                <span className="text-[11px] text-gray-400">{item.downloadedAt}</span>
              </div>
            </div>
            <Download size={16} className="text-gray-300 flex-shrink-0" />
          </button>
        ))}
      </div>
    </div>
  );
}
