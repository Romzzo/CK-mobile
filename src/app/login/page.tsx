"use client";

import { useState } from "react";
import { ArrowLeft, Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* 헤더 */}
      <header className="px-4 h-14 flex items-center gap-3 border-b border-gray-100">
        <button onClick={() => router.back()} className="p-1 -ml-1">
          <ArrowLeft size={22} className="text-gray-700" />
        </button>
        <h1 className="text-base font-bold text-gray-900">로그인</h1>
      </header>

      <div className="flex-1 px-5 pt-6 pb-6 flex flex-col">
        {/* 로고 */}
        <div className="mb-6">
          <p className="text-xl font-bold text-gray-900 tracking-tight">
            CLIPART<span className="font-light">KOREA</span>
          </p>
          <p className="text-sm text-gray-400 mt-1">1,500만+ 콘텐츠를 자유롭게 이용하세요</p>
        </div>

        {/* 구글 로그인 */}
        <button className="w-full flex items-center justify-center gap-3 h-12 rounded-2xl border border-gray-200 bg-white mb-4 text-sm font-medium text-gray-700 shadow-sm">
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.875 2.684-6.615z" fill="#4285F4"/>
            <path d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332C2.438 15.983 5.482 18 9 18z" fill="#34A853"/>
            <path d="M3.964 10.71A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332z" fill="#FBBC05"/>
            <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0 5.482 0 2.438 2.017.957 4.958L3.964 6.29C4.672 4.163 6.656 3.58 9 3.58z" fill="#EA4335"/>
          </svg>
          Google로 계속하기
        </button>

        {/* 구분선 */}
        <div className="flex items-center gap-3 mb-4">
          <div className="flex-1 h-px bg-gray-100" />
          <span className="text-xs text-gray-400 font-medium">또는</span>
          <div className="flex-1 h-px bg-gray-100" />
        </div>

        {/* 아이디 / 비밀번호 */}
        <div className="flex flex-col gap-3 mb-5">
          <div>
            <label className="text-xs font-semibold text-gray-500 mb-1.5 block">아이디</label>
            <input
              type="text"
              value={id}
              onChange={(e) => setId(e.target.value)}
              placeholder="아이디를 입력해주세요"
              className="w-full h-12 rounded-2xl border border-gray-200 px-4 text-sm text-gray-800 placeholder-gray-300 outline-none focus:border-purple-400 transition-colors"
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-gray-500 mb-1.5 block">비밀번호</label>
            <div className="relative">
              <input
                type={showPw ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="비밀번호를 입력해주세요"
                className="w-full h-12 rounded-2xl border border-gray-200 px-4 pr-11 text-sm text-gray-800 placeholder-gray-300 outline-none focus:border-purple-400 transition-colors"
              />
              <button
                type="button"
                onClick={() => setShowPw(!showPw)}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-gray-400"
              >
                {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>
        </div>

        {/* 로그인 버튼 */}
        <button
          className="w-full h-12 rounded-2xl text-sm font-bold text-white mb-4"
          style={{ backgroundColor: "var(--ck-primary)" }}
        >
          로그인
        </button>

        {/* 보조 링크 */}
        <div className="flex items-center justify-center gap-4 mb-5">
          <button className="text-xs text-gray-400">아이디 찾기</button>
          <span className="text-gray-200 text-xs">|</span>
          <button className="text-xs text-gray-400">비밀번호 찾기</button>
        </div>

        {/* 회원가입 유도 */}
        <div className="pt-4 border-t border-gray-100 flex items-center justify-center gap-2">
          <span className="text-xs text-gray-400">아직 회원이 아니신가요?</span>
          <button
            onClick={() => router.push("/signup")}
            className="text-xs font-bold"
            style={{ color: "var(--ck-primary)" }}
          >
            무료 회원가입
          </button>
        </div>
      </div>
    </div>
  );
}
