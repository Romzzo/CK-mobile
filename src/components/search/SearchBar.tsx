"use client";

import { Search, X, ArrowLeft } from "lucide-react";
import { useState, useRef, useEffect, type FormEvent } from "react";
import { useRouter } from "next/navigation";

interface SearchBarProps {
  initialQuery: string;
  onSubmit: (q: string) => void;
}

export default function SearchBar({ initialQuery, onSubmit }: SearchBarProps) {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [text, setText] = useState(initialQuery);

  useEffect(() => {
    if (!initialQuery) inputRef.current?.focus();
  }, [initialQuery]);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit(text.trim());
    inputRef.current?.blur();
  };

  return (
    <div
      className="pt-safe sticky top-0 z-40 border-b border-line"
      style={{ backgroundColor: "rgba(255,255,255,0.92)", backdropFilter: "blur(16px)" }}
    >
      <div className="flex items-center gap-1.5 px-2 py-2.5">
        <button
          type="button"
          aria-label="뒤로"
          onClick={() => router.back()}
          className="shrink-0 p-2.5 text-ink-soft"
        >
          <ArrowLeft size={22} />
        </button>

        <form
          onSubmit={submit}
          className="flex h-11 min-w-0 flex-1 items-center gap-2 rounded-full bg-surface-muted pl-4 pr-2"
        >
          <Search size={16} className="shrink-0 text-ink-mute" />
          <input
            ref={inputRef}
            type="search"
            enterKeyHint="search"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="한글, 영문, 콘텐츠번호로 검색"
            className="min-w-0 flex-1 bg-transparent text-[14px] text-ink outline-none placeholder:text-ink-mute"
          />
          {text ? (
            <button
              type="button"
              aria-label="지우기"
              onClick={() => {
                setText("");
                onSubmit("");
                inputRef.current?.focus();
              }}
              className="grid h-8 w-8 shrink-0 place-items-center text-ink-mute"
            >
              <X size={15} />
            </button>
          ) : null}
        </form>
      </div>
    </div>
  );
}
