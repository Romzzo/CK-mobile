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
    <div
      className="sticky top-0 z-40 flex items-center gap-2.5 border-b border-line px-4 py-2.5"
      style={{ backgroundColor: "rgba(255,255,255,0.92)", backdropFilter: "blur(16px)" }}
    >
      <button
        aria-label="뒤로"
        onClick={() => router.back()}
        className="-ml-1 shrink-0 p-1 text-ink-soft"
      >
        <ArrowLeft size={22} />
      </button>

      <div className="flex h-11 flex-1 items-center gap-2 rounded-full bg-surface-muted px-4">
        <Search size={16} className="shrink-0 text-ink-mute" />
        <input
          ref={inputRef}
          type="search"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="이미지, 아이콘, 폰트 검색"
          className="flex-1 bg-transparent text-[14px] text-ink outline-none placeholder:text-ink-mute"
        />
        {value ? (
          <button aria-label="지우기" onClick={onClear} className="shrink-0 p-0.5 text-ink-mute">
            <X size={15} />
          </button>
        ) : null}
      </div>
    </div>
  );
}
