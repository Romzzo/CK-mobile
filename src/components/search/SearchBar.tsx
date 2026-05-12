"use client";

import { Search, X, ArrowLeft } from "lucide-react";
import { useRef, useEffect } from "react";
import { useRouter } from "next/navigation";

interface SearchBarProps {
  value: string;
  onChange: (v: string) => void;
  onClear: () => void;
}

export default function SearchBar({ value, onChange, onClear }: SearchBarProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <div className="sticky top-0 z-50 bg-white border-b border-gray-100 px-4 py-3 flex items-center gap-3">
      <button onClick={() => router.back()} className="flex-shrink-0 p-1 -ml-1">
        <ArrowLeft size={22} className="text-gray-700" />
      </button>

      <div className="flex-1 flex items-center gap-2 bg-gray-100 rounded-full px-4 h-10">
        <Search size={15} className="text-gray-400 flex-shrink-0" />
        <input
          ref={inputRef}
          type="search"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="이미지, 아이콘, 폰트 검색"
          className="flex-1 bg-transparent text-sm text-gray-800 outline-none placeholder:text-gray-400"
        />
        {value && (
          <button onClick={onClear} className="flex-shrink-0 p-0.5">
            <X size={14} className="text-gray-400" />
          </button>
        )}
      </div>
    </div>
  );
}
