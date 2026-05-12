"use client";

import { ChevronRight, Bell, Lock, Smartphone, Globe, Trash2 } from "lucide-react";
import { useState } from "react";
import PageHeader from "@/components/layout/PageHeader";

function Toggle({ on, onToggle }: { on: boolean; onToggle: () => void }) {
  return (
    <button
      onClick={onToggle}
      className="relative h-6 w-11 rounded-full transition-colors"
      style={{ backgroundColor: on ? "var(--brand)" : "#D4D4D8" }}
    >
      <div
        className="absolute top-0.5 h-5 w-5 rounded-full bg-white shadow-sm transition-transform"
        style={{ transform: on ? "translateX(22px)" : "translateX(2px)" }}
      />
    </button>
  );
}

export default function SettingsPage() {
  const [pushOn, setPushOn] = useState(true);
  const [emailOn, setEmailOn] = useState(false);

  return (
    <div className="min-h-dvh bg-surface-muted pb-8">
      <PageHeader title="계정 설정" fallbackHref="/my" />

      {/* 계정 */}
      <p className="px-5 pb-2 pt-5 text-[11px] font-bold uppercase tracking-wider text-ink-mute">계정</p>
      <div className="mx-4 overflow-hidden rounded-2xl border border-line bg-surface">
        {[
          { icon: Lock, label: "비밀번호 변경" },
          { icon: Smartphone, label: "휴대폰 번호 변경" },
          { icon: Globe, label: "이메일 변경" },
        ].map(({ icon: Icon, label }, i, arr) => (
          <button
            key={label}
            className={`flex w-full items-center justify-between px-5 py-3.5 ${i < arr.length - 1 ? "border-b border-line" : ""}`}
          >
            <div className="flex items-center gap-3">
              <Icon size={16} className="text-ink-mute" />
              <span className="text-[14px] text-ink-soft">{label}</span>
            </div>
            <ChevronRight size={15} className="text-ink-mute" />
          </button>
        ))}
      </div>

      {/* 알림 */}
      <p className="px-5 pb-2 pt-5 text-[11px] font-bold uppercase tracking-wider text-ink-mute">알림</p>
      <div className="mx-4 overflow-hidden rounded-2xl border border-line bg-surface">
        <div className="flex items-center justify-between border-b border-line px-5 py-3.5">
          <div className="flex items-center gap-3">
            <Bell size={16} className="text-ink-mute" />
            <span className="text-[14px] text-ink-soft">푸시 알림</span>
          </div>
          <Toggle on={pushOn} onToggle={() => setPushOn(!pushOn)} />
        </div>
        <div className="flex items-center justify-between px-5 py-3.5">
          <div className="flex items-center gap-3">
            <Bell size={16} className="text-ink-mute" />
            <span className="text-[14px] text-ink-soft">이메일 수신</span>
          </div>
          <Toggle on={emailOn} onToggle={() => setEmailOn(!emailOn)} />
        </div>
      </div>

      {/* 위험 구역 */}
      <div className="mx-4 mt-5 overflow-hidden rounded-2xl border border-line bg-surface">
        <button className="flex w-full items-center gap-3 px-5 py-4">
          <Trash2 size={16} className="text-danger" />
          <span className="text-[14px] text-danger">회원 탈퇴</span>
        </button>
      </div>
    </div>
  );
}
