"use client";

import { useState } from "react";
import { ArrowLeft, Eye, EyeOff, Check, ChevronRight, ChevronDown } from "lucide-react";
import { useRouter } from "next/navigation";
import type React from "react";

const terms: { id: string; label: string; required: boolean; href?: string }[] = [
  { id: "terms", label: "이용약관 동의", required: true, href: "/service/agreement" },
  { id: "privacy", label: "개인정보 수집 및 이용 동의", required: true },
  { id: "license", label: "라이선스 규정 동의", required: true },
  { id: "sms", label: "마케팅 정보 SMS 수신 동의", required: false },
  { id: "email", label: "마케팅 정보 이메일 수신 동의", required: false },
];

const joinRoutes = ["핀터레스트", "블로그/카페/SNS", "검색 외 온라인 광고", "지인 추천", "유튜브", "이전 사용 경험", "네이버/다음 검색", "구글 검색", "기타"];

const industryOptions = ["금융/보험", "미디어/언론/방송", "도서/출판", "식당/식품 제조", "의료/보건/제약", "교육기관", "광고 대행/웹 에이전시", "전자상거래/유통", "관광/여행/숙박", "건강/미용", "인쇄/간판", "유튜브 크리에이터", "공공기관/관공서", "기타"];

const companySizeOptions = ["개인/중소기업 (100인 미만 비상장)", "중견/대기업/상장사", "프랜차이즈 (지점 2개 이상)"];

const jobOptions = ["프리랜서", "인하우스 디자이너(마케터)", "에이전시 디자이너(마케터)", "인플루언서", "교사/강사", "유튜브 크리에이터", "학생", "기타"];

export default function SignupPage() {
  const router = useRouter();
  const [step, setStep] = useState<1 | 2>(1);

  // step 1
  const [agreed, setAgreed] = useState<Record<string, boolean>>({});
  const allRequired = terms.filter((t) => t.required).every((t) => agreed[t.id]);
  const allChecked = terms.every((t) => agreed[t.id]);
  const toggleAll = () => {
    if (allChecked) setAgreed({});
    else setAgreed(Object.fromEntries(terms.map((t) => [t.id, true])));
  };

  // step 2 공통
  const [userId, setUserId] = useState("");
  const [pw, setPw] = useState("");
  const [pwConfirm, setPwConfirm] = useState("");
  const [emailInput, setEmailInput] = useState("");
  const [joinRoute, setJoinRoute] = useState("");
  const [joinRouteEtc, setJoinRouteEtc] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [showPwC, setShowPwC] = useState(false);

  // 기업/개인 토글
  const [memberType, setMemberType] = useState<"기업" | "개인">("개인");

  // 기업 전용
  const [industry, setIndustry] = useState("");
  const [companySize, setCompanySize] = useState("");
  const [bizNo, setBizNo] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [managerName, setManagerName] = useState("");
  const [managerPhone, setManagerPhone] = useState("");

  // 개인 전용
  const [phone, setPhone] = useState("");
  const [job, setJob] = useState("");

  const commonValid = userId && pw && pw === pwConfirm && emailInput;
  const bizValid = commonValid && industry && companySize && bizNo && companyName && managerName && managerPhone;
  const personalValid = commonValid && phone && job;
  const step2Valid = memberType === "기업" ? bizValid : personalValid;

  return (
    <div className="flex min-h-dvh flex-col bg-surface">
      <header
        className="sticky top-0 z-40 flex h-14 shrink-0 items-center gap-3 border-b border-line px-4"
        style={{ backgroundColor: "rgba(255,255,255,0.92)", backdropFilter: "blur(16px)" }}
      >
        <button onClick={() => (step === 2 ? setStep(1) : router.back())} className="-ml-1 shrink-0 p-1 text-ink-soft">
          <ArrowLeft size={22} />
        </button>
        <h1 className="text-[16px] font-bold text-ink">회원가입</h1>
        <div className="ml-auto flex items-center gap-1.5">
          {[1, 2].map((s) => (
            <div
              key={s}
              className="h-1.5 w-5 rounded-full transition-colors"
              style={{ backgroundColor: step >= s ? "var(--brand)" : "var(--line)" }}
            />
          ))}
        </div>
      </header>

      {/* ── STEP 1: 약관동의 ── */}
      {step === 1 && (
        <div className="flex flex-1 flex-col px-5 pb-10 pt-6">
          <p className="mb-1 text-[12px] font-semibold uppercase tracking-widest text-ink-mute">Step 1</p>
          <h2 className="mb-6 text-[20px] font-bold text-ink">약관 동의</h2>

          <button className="mb-5 flex h-12 w-full items-center justify-center gap-2.5 rounded-xl border border-line bg-surface text-[14px] font-semibold text-ink shadow-sm">
            <GoogleIcon />
            Google로 간편 가입하기
          </button>

          <div className="mb-5 flex items-center gap-3">
            <div className="h-px flex-1 bg-line" />
            <span className="text-[12px] font-medium text-ink-mute">또는 아이디로 가입</span>
            <div className="h-px flex-1 bg-line" />
          </div>

          <button
            onClick={toggleAll}
            className="mb-3 flex w-full items-center gap-3 rounded-xl border p-4 transition-colors"
            style={{
              borderColor: allChecked ? "var(--brand)" : "var(--line)",
              backgroundColor: allChecked ? "var(--brand-soft)" : "var(--surface-muted)",
            }}
          >
            <CheckCircle checked={allChecked} size={20} />
            <span className="text-[14px] font-bold text-ink">전체 동의</span>
            <span className="ml-auto text-[12px] text-ink-mute">선택 포함</span>
          </button>

          <div className="mb-6 flex flex-col gap-1 rounded-xl bg-surface-muted p-2">
            {terms.map((term) => (
              <div key={term.id} className="flex items-center gap-3 px-3 py-3">
                <button onClick={() => setAgreed((prev) => ({ ...prev, [term.id]: !prev[term.id] }))}>
                  <CheckCircle checked={!!agreed[term.id]} size={18} />
                </button>
                <span className="flex-1 text-[13px] text-ink-soft">
                  {term.label}
                  {term.required ? <span className="ml-1 text-danger">*</span> : <span className="ml-1 text-ink-mute">(선택)</span>}
                </span>
                {term.href ? (
                  <a
                    href={term.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${term.label} 전문 보기 (새 탭)`}
                    className="shrink-0 p-1 text-ink-mute"
                  >
                    <ChevronRight size={15} />
                  </a>
                ) : (
                  <ChevronRight size={15} className="shrink-0 text-ink-mute opacity-30" />
                )}
              </div>
            ))}
          </div>

          <button
            onClick={() => allRequired && setStep(2)}
            className="h-12 w-full rounded-xl text-[15px] font-semibold text-white transition-opacity"
            style={{ backgroundColor: "var(--brand)", opacity: allRequired ? 1 : 0.4 }}
          >
            다음 단계
          </button>
          <p className="mt-3 text-center text-[13px] text-ink-mute">
            이미 계정이 있으신가요?{" "}
            <button onClick={() => router.push("/login")} className="font-semibold text-brand">로그인</button>
          </p>
        </div>
      )}

      {/* ── STEP 2: 정보입력 ── */}
      {step === 2 && (
        <div className="flex-1 overflow-y-auto px-5 pb-10 pt-6">
          <p className="mb-1 text-[12px] font-semibold uppercase tracking-widest text-ink-mute">Step 2</p>
          <h2 className="mb-6 text-[20px] font-bold text-ink">정보 입력</h2>

          <div className="flex flex-col gap-4">
            <Field label="아이디" required hint="영문·숫자 4~12자">
              <input type="text" value={userId}
                onChange={(e) => setUserId(e.target.value.replace(/[^a-zA-Z0-9]/g, "").slice(0, 12))}
                placeholder="영문, 숫자 조합 4~12자" className="input-base" />
            </Field>

            <Field label="비밀번호" required hint="8자 이상">
              <div className="relative">
                <input type={showPw ? "text" : "password"} value={pw}
                  onChange={(e) => setPw(e.target.value)}
                  placeholder="8자 이상 입력" className="input-base pr-11" />
                <PwToggle show={showPw} onToggle={() => setShowPw(!showPw)} />
              </div>
            </Field>

            <Field label="비밀번호 확인" required>
              <div className="relative">
                <input type={showPwC ? "text" : "password"} value={pwConfirm}
                  onChange={(e) => setPwConfirm(e.target.value)}
                  placeholder="비밀번호를 한 번 더 입력"
                  className={`input-base pr-11 ${pwConfirm && pw !== pwConfirm ? "input-error" : ""}`} />
                <PwToggle show={showPwC} onToggle={() => setShowPwC(!showPwC)} />
              </div>
              {pwConfirm && pw !== pwConfirm && <p className="mt-1 px-1 text-[12px] text-danger">비밀번호가 일치하지 않아요</p>}
            </Field>

            <Field label="이메일 주소" required hint="결제·공지 안내에 사용돼요">
              <input type="email" value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                placeholder="example@email.com" className="input-base" />
            </Field>

            <Field label="가입경로">
              <div className="mt-0.5 flex flex-wrap gap-2">
                {joinRoutes.map((r) => {
                  const active = joinRoute === r;
                  return (
                    <button key={r} onClick={() => setJoinRoute(r)}
                      className="rounded-full border px-3 py-1.5 text-[12px] font-medium transition-colors"
                      style={active
                        ? { backgroundColor: "var(--brand)", borderColor: "var(--brand)", color: "#fff" }
                        : { backgroundColor: "var(--surface-muted)", borderColor: "var(--line)", color: "var(--ink-soft)" }}
                    >{r}</button>
                  );
                })}
              </div>
              {joinRoute === "기타" && (
                <input type="text" value={joinRouteEtc} onChange={(e) => setJoinRouteEtc(e.target.value)}
                  placeholder="가입경로를 입력해주세요" className="input-base mt-2" />
              )}
            </Field>

            <div className="mt-2 flex justify-center">
              <div className="flex gap-1 rounded-full bg-surface-muted p-1">
                {(["기업", "개인"] as const).map((type) => {
                  const active = memberType === type;
                  return (
                    <button key={type} onClick={() => setMemberType(type)}
                      className="rounded-full px-8 py-2 text-[14px] font-bold transition-all"
                      style={active
                        ? { backgroundColor: "var(--ink)", color: "#fff" }
                        : { backgroundColor: "transparent", color: "var(--ink-mute)" }}
                    >{type}</button>
                  );
                })}
              </div>
            </div>

            {memberType === "기업" && (
              <>
                <SelectField label="업종" required value={industry} onChange={setIndustry} options={industryOptions} placeholder="업종을 선택해주세요" />
                <SelectField label="기업 규모" required value={companySize} onChange={setCompanySize} options={companySizeOptions} placeholder="기업규모를 선택해주세요" />

                <Field label="사업자등록번호" required>
                  <div className="flex gap-2">
                    <input type="text" value={bizNo}
                      onChange={(e) => setBizNo(e.target.value.replace(/\D/g, "").slice(0, 10))}
                      placeholder="숫자만 입력 (10자리)" className="input-base flex-1" />
                    <button className="h-12 shrink-0 rounded-xl border border-line bg-surface px-4 text-[13px] font-semibold text-ink-soft">인증</button>
                  </div>
                </Field>

                <Field label="회사명" required>
                  <input type="text" value={companyName} onChange={(e) => setCompanyName(e.target.value)}
                    placeholder="회사명을 입력해주세요" className="input-base" />
                </Field>

                <Field label="담당자 이름" required>
                  <input type="text" value={managerName} onChange={(e) => setManagerName(e.target.value)}
                    placeholder="담당자 이름을 입력해주세요" className="input-base" />
                </Field>

                <Field label="담당자 연락처" required>
                  <input type="tel" value={managerPhone}
                    onChange={(e) => setManagerPhone(e.target.value.replace(/\D/g, "").slice(0, 11))}
                    placeholder="01012345678" className="input-base" />
                </Field>
              </>
            )}

            {memberType === "개인" && (
              <>
                <Field label="휴대폰번호" required hint="만 19세 이상만 가입 가능">
                  <div className="flex gap-2">
                    <input type="tel" value={phone}
                      onChange={(e) => setPhone(e.target.value.replace(/\D/g, "").slice(0, 11))}
                      placeholder="01012345678" className="input-base flex-1" />
                    <button className="h-12 shrink-0 rounded-xl border border-line bg-surface px-4 text-[13px] font-semibold text-ink-soft">인증</button>
                  </div>
                </Field>

                <SelectField label="직업/분야" required value={job} onChange={setJob} options={jobOptions} placeholder="직업/분야를 선택해주세요" />
              </>
            )}
          </div>

          <button className="mt-8 h-12 w-full rounded-xl text-[15px] font-semibold text-white transition-opacity"
            style={{ backgroundColor: "var(--brand)", opacity: step2Valid ? 1 : 0.4 }}
          >
            가입 완료
          </button>
        </div>
      )}

      <style jsx>{`
        .input-base {
          width: 100%;
          height: 48px;
          border-radius: 12px;
          border: 1px solid var(--line);
          padding: 0 16px;
          font-size: 14px;
          color: var(--ink);
          outline: none;
          transition: border-color 0.15s;
          background: var(--surface);
        }
        .input-base:focus { border-color: var(--brand); }
        .input-base::placeholder { color: var(--ink-mute); }
        .input-base.pr-11 { padding-right: 44px; }
        .input-base.input-error { border-color: var(--danger); }
      `}</style>
    </div>
  );
}

/* ── 서브 컴포넌트 ── */

function Field({ label, required, hint, children }: { label: string; required?: boolean; hint?: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="mb-1.5 flex items-center gap-1">
        <label className="text-[12px] font-semibold text-ink-soft">{label}</label>
        {required && <span className="text-[12px] text-danger">*</span>}
        {hint && <span className="ml-1 text-[11px] text-ink-mute">{hint}</span>}
      </div>
      {children}
    </div>
  );
}

function SelectField({ label, required, value, onChange, options, placeholder }: {
  label: string; required?: boolean; value: string;
  onChange: (v: string) => void; options: string[]; placeholder: string;
}) {
  const [open, setOpen] = useState(false);
  return (
    <Field label={label} required={required}>
      <div className="relative">
        <button type="button" onClick={() => setOpen(!open)}
          className="input-base flex items-center justify-between text-left"
          style={{ color: value ? "var(--ink)" : "var(--ink-mute)" }}
        >
          <span className="truncate">{value || placeholder}</span>
          <ChevronDown size={15} className="shrink-0 text-ink-mute" style={{ transform: open ? "rotate(180deg)" : "none", transition: "transform 0.2s" }} />
        </button>
        {open && (
          <div className="absolute left-0 right-0 top-full z-20 mt-1 max-h-52 overflow-y-auto rounded-xl border border-line bg-surface shadow-lg">
            {options.map((opt) => (
              <button key={opt} type="button"
                onClick={() => { onChange(opt); setOpen(false); }}
                className="block w-full border-b border-line px-4 py-3 text-left text-[14px] text-ink-soft last:border-0"
                style={value === opt ? { color: "var(--brand)", fontWeight: 600 } : {}}
              >{opt}</button>
            ))}
          </div>
        )}
      </div>
    </Field>
  );
}

function CheckCircle({ checked, size }: { checked: boolean; size: number }) {
  return (
    <div className="flex shrink-0 items-center justify-center rounded-full transition-colors"
      style={{ width: size, height: size, backgroundColor: checked ? "var(--brand)" : "#D4D4D8" }}>
      <Check size={size * 0.55} className="text-white" strokeWidth={3} />
    </div>
  );
}

function PwToggle({ show, onToggle }: { show: boolean; onToggle: () => void }) {
  return (
    <button type="button" onClick={onToggle} className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-ink-mute">
      {show ? <EyeOff size={16} /> : <Eye size={16} />}
    </button>
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
