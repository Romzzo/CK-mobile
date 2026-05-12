"use client";

import { ArrowLeft, Share2, MoreVertical } from "lucide-react";
import { useRouter } from "next/navigation";

export default function DetailHeader() {
  const router = useRouter();

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-sm border-b border-gray-100">
      <div className="flex items-center justify-between px-4 h-14">
        <button onClick={() => router.back()} className="p-1 -ml-1">
          <ArrowLeft size={22} className="text-gray-700" />
        </button>
        <div className="flex items-center gap-2">
          <button className="p-1">
            <Share2 size={20} className="text-gray-600" />
          </button>
          <button className="p-1">
            <MoreVertical size={20} className="text-gray-600" />
          </button>
        </div>
      </div>
    </header>
  );
}
