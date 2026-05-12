"use client";

import { Search, Bell, ShoppingBag } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

interface HeaderProps {
  onSearchFocus?: () => void;
}

export default function Header({ onSearchFocus }: HeaderProps) {
  const [hasNotification] = useState(true);
  const router = useRouter();

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-100">
      <div className="flex items-center gap-3 px-4 h-14">
        {/* 로고 */}
        <div className="flex-shrink-0">
          <span className="text-lg font-bold" style={{ color: "var(--ck-primary)" }}>
            CLIPART
          </span>
          <span className="text-lg font-bold text-gray-800">KOREA</span>
        </div>

        {/* 검색창 */}
        <button
          className="flex-1 flex items-center gap-2 bg-gray-100 rounded-full px-4 h-9 text-sm text-gray-400"
          onClick={() => { onSearchFocus?.(); router.push("/search"); }}
        >
          <Search size={15} className="text-gray-400 flex-shrink-0" />
          <span className="truncate">이미지, 아이콘, 폰트 검색</span>
        </button>

        {/* 알림 */}
        <button className="relative flex-shrink-0 p-1">
          <Bell size={22} className="text-gray-600" />
          {hasNotification && (
            <span className="absolute top-0.5 right-0.5 w-2 h-2 rounded-full" style={{ backgroundColor: "var(--ck-danger)" }} />
          )}
        </button>

        {/* 장바구니 */}
        <button className="flex-shrink-0 p-1">
          <ShoppingBag size={22} className="text-gray-600" />
        </button>
      </div>
    </header>
  );
}
