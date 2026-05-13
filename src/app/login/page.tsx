"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";
import PageHeader from "@/components/layout/PageHeader";
import { useAuth } from "@/lib/useAuth";

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);

  const handleLogin = () => {
    // 프로토타입: ID/PW 검증 없이 바로 로그인 상태 진입
    login();
    router.back();
  };

  return (
    <div className="flex min-h-dvh flex-col bg-surface">
      <PageHeader title="로그인" />

      <div className="flex flex-1 flex-col px-5 pb-8 pt-6">
        <div className="mb-7">
          <p className="text-[22px] font-extrabold tracking-tight text-ink">
            clipart<span className="text-brand">korea</span>
          </p>
          <p className="mt-1.5 text-[14px] text-ink-soft">1,500만+ 콘텐츠를 자유롭게 이용하세요</p>
        </div>

        <button
          type="button"
          onClick={handleLogin}
          className="mb-4 flex h-12 w-full items-center justify-center gap-2.5 rounded-xl border border-line bg-surface text-[14px] font-semibold text-ink shadow-sm"
        >
          <GoogleIcon />
          Google로 계속하기
        </button>

        <div className="mb-4 flex items-center gap-3">
          <div className="h-px flex-1 bg-line" />
          <span className="text-[12px] font-medium text-ink-mute">또는</span>
          <div className="h-px flex-1 bg-line" />
        </div>

        <div className="mb-5 flex flex-col gap-3">
          <div>
            <label className="mb-1.5 block text-[12px] font-semibold text-ink-soft">아이디</label>
            <input
              type="text"
              value={id}
              onChange={(e) => setId(e.target.value)}
              placeholder="아이디를 입력해주세요"
              className="h-12 w-full rounded-xl border border-line bg-surface px-4 text-[14px] text-ink outline-none transition-colors placeholder:text-ink-mute focus:border-brand"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-[12px] font-semibold text-ink-soft">비밀번호</label>
            <div className="relative">
              <input
                type={showPw ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="비밀번호를 입력해주세요"
                className="h-12 w-full rounded-xl border border-line bg-surface px-4 pr-11 text-[14px] text-ink outline-none transition-colors placeholder:text-ink-mute focus:border-brand"
              />
              <button
                type="button"
                onClick={() => setShowPw(!showPw)}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-ink-mute"
              >
                {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={handleLogin}
          className="mb-4 h-12 w-full rounded-xl text-[15px] font-semibold text-white"
          style={{ backgroundColor: "var(--brand)" }}
        >
          로그인
        </button>

        <div className="mb-5 flex items-center justify-center gap-3 text-[13px] text-ink-mute">
          <button type="button">아이디 찾기</button>
          <span className="h-3 w-px bg-line" />
          <button type="button">비밀번호 찾기</button>
        </div>

        <div className="flex items-center justify-center gap-2 border-t border-line pt-5 text-[13px]">
          <span className="text-ink-mute">아직 회원이 아니신가요?</span>
          <button onClick={() => router.push("/signup")} className="font-bold text-brand">
            무료 회원가입
          </button>
        </div>
      </div>
    </div>
  );
}

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.875 2.684-6.615z" fill="#4285F4" />
      <path d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332C2.438 15.983 5.482 18 9 18z" fill="#34A853" />
      <path d="M3.964 10.71A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332z" fill="#FBBC05" />
      <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0 5.482 0 2.438 2.017.957 4.958L3.964 6.29C4.672 4.163 6.656 3.58 9 3.58z" fill="#EA4335" />
    </svg>
  );
}
