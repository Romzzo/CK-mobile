"use client";

import { Search, X, ArrowLeft, Camera } from "lucide-react";
import { useState, useRef, useEffect, type FormEvent, type ChangeEvent } from "react";
import { useRouter } from "next/navigation";

interface SearchBarProps {
  initialQuery: string;
  onSubmit: (q: string) => void;
}

export default function SearchBar({ initialQuery, onSubmit }: SearchBarProps) {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const [text, setText] = useState(initialQuery);

  useEffect(() => {
    if (!initialQuery) inputRef.current?.focus();
  }, [initialQuery]);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit(text.trim());
    inputRef.current?.blur();
  };

  const onImagePick = (e: ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    // 프로토타입: 실제 비전 검색 미연동 — 파일명만 안내
    alert(`이미지로 검색 (프로토타입)\n${f.name}`);
    e.target.value = "";
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
            className="min-w-0 flex-1 bg-transparent text-[14px] text-ink outline-none placeholder:text-ink-mute [&::-webkit-search-cancel-button]:appearance-none [&::-webkit-search-decoration]:appearance-none"
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

          <button
            type="button"
            aria-label="이미지로 검색"
            onClick={() => fileRef.current?.click()}
            className="grid h-8 w-8 shrink-0 place-items-center text-ink-soft"
          >
            <Camera size={17} />
          </button>
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={onImagePick}
          />
        </form>
      </div>
    </div>
  );
}
