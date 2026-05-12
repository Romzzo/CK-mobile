"use client";

import { ArrowLeft, ChevronRight, Bell, Lock, Smartphone, Globe, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SettingsPage() {
  const router = useRouter();
  const [pushOn, setPushOn] = useState(true);
  const [emailOn, setEmailOn] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="sticky top-0 z-50 bg-white border-b border-gray-100 px-4 h-14 flex items-center gap-3">
        <button onClick={() => router.back()} className="p-1 -ml-1">
          <ArrowLeft size={22} className="text-gray-700" />
        </button>
        <h1 className="text-base font-bold text-gray-900">계정 설정</h1>
      </header>

      {/* 계정 정보 */}
      <div className="bg-white mt-3 mb-3">
        <p className="px-5 pt-4 pb-2 text-xs font-bold text-gray-400 uppercase tracking-wider">계정</p>
        <button className="w-full flex items-center justify-between px-5 py-3.5 border-b border-gray-50">
          <div className="flex items-center gap-3">
            <Lock size={16} className="text-gray-500" />
            <span className="text-sm text-gray-700">비밀번호 변경</span>
          </div>
          <ChevronRight size={15} className="text-gray-300" />
        </button>
        <button className="w-full flex items-center justify-between px-5 py-3.5 border-b border-gray-50">
          <div className="flex items-center gap-3">
            <Smartphone size={16} className="text-gray-500" />
            <span className="text-sm text-gray-700">휴대폰 번호 변경</span>
          </div>
          <ChevronRight size={15} className="text-gray-300" />
        </button>
        <button className="w-full flex items-center justify-between px-5 py-3.5">
          <div className="flex items-center gap-3">
            <Globe size={16} className="text-gray-500" />
            <span className="text-sm text-gray-700">이메일 변경</span>
          </div>
          <ChevronRight size={15} className="text-gray-300" />
        </button>
      </div>

      {/* 알림 설정 */}
      <div className="bg-white mb-3">
        <p className="px-5 pt-4 pb-2 text-xs font-bold text-gray-400 uppercase tracking-wider">알림</p>
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-gray-50">
          <div className="flex items-center gap-3">
            <Bell size={16} className="text-gray-500" />
            <span className="text-sm text-gray-700">푸시 알림</span>
          </div>
          <button
            onClick={() => setPushOn(!pushOn)}
            className="relative w-11 h-6 rounded-full transition-colors"
            style={{ backgroundColor: pushOn ? "var(--ck-primary)" : "#D1D5DB" }}
          >
            <div
              className="absolute top-0.5 w-5 h-5 rounded-full bg-white shadow-sm transition-transform"
              style={{ transform: pushOn ? "translateX(22px)" : "translateX(2px)" }}
            />
          </button>
        </div>
        <div className="flex items-center justify-between px-5 py-3.5">
          <div className="flex items-center gap-3">
            <Bell size={16} className="text-gray-500" />
            <span className="text-sm text-gray-700">이메일 수신</span>
          </div>
          <button
            onClick={() => setEmailOn(!emailOn)}
            className="relative w-11 h-6 rounded-full transition-colors"
            style={{ backgroundColor: emailOn ? "var(--ck-primary)" : "#D1D5DB" }}
          >
            <div
              className="absolute top-0.5 w-5 h-5 rounded-full bg-white shadow-sm transition-transform"
              style={{ transform: emailOn ? "translateX(22px)" : "translateX(2px)" }}
            />
          </button>
        </div>
      </div>

      {/* 위험 구역 */}
      <div className="bg-white mb-3">
        <button className="w-full flex items-center gap-3 px-5 py-4">
          <Trash2 size={16} className="text-red-400" />
          <span className="text-sm text-red-400">회원 탈퇴</span>
        </button>
      </div>
    </div>
  );
}
