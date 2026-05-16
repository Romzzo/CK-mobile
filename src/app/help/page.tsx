"use client";

import { useState, type FormEvent } from "react";
import PageHeader from "@/components/layout/PageHeader";
import BottomNav from "@/components/layout/BottomNav";
import ScrollTopButton from "@/components/common/ScrollTopButton";

type Tab = "form" | "history";

const INQUIRY_CATEGORIES: string[] = [
  "견적문의",
  "결제방법 문의",
  "콘텐츠관련 문의",
  "사용범위 문의",
  "이벤트 문의",
  "결제서류/인증서요청",
  "취소/환불문의",
  "오류 문의",
  "기타문의",
];

// 프로토타입 상담내역 mock — 실 API 연동 시 fetch 로 교체
const MOCK_HISTORY: { id: number; subject: string; date: string; status: "처리중" | "완료"; preview: string }[] = [
  {
    id: 1,
    subject: "결제 영수증 재발급 요청",
    date: "2026.05.12",
    status: "처리중",
    preview: "지난주 결제건의 영수증을 다시 받을 수 있을까요?",
  },
  {
    id: 2,
    subject: "이미지 상업적 사용 범위 문의",
    date: "2026.04.28",
    status: "완료",
    preview: "구매한 이미지를 외주 클라이언트에게 전달해도 되는지 확인 부탁드립니다.",
  },
];

function Field({
  label,
  required,
  error,
  children,
}: {
  label: string;
  required?: boolean;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <p className="text-[13px] font-semibold text-ink">
        {label}
        {required ? <span className="ml-0.5 text-danger">*</span> : null}
      </p>
      {error ? <p className="mt-1 text-[12px] text-danger">{error}</p> : null}
      <div className="mt-2">{children}</div>
    </div>
  );
}

const inputClass =
  "w-full rounded-xl border border-line bg-surface px-3.5 py-3 text-[14px] text-ink placeholder:text-ink-mute outline-none focus:border-[color:var(--brand)]";

type FormErrors = Partial<Record<"name" | "phone" | "email" | "category" | "subject" | "content", string>>;

export default function HelpPage() {
  const [tab, setTab] = useState<Tab>("form");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [category, setCategory] = useState("");
  const [subject, setSubject] = useState("");
  const [content, setContent] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});

  const resetForm = () => {
    setName("");
    setPhone("");
    setEmail("");
    setCategory("");
    setSubject("");
    setContent("");
    setErrors({});
  };

  const clearError = (key: keyof FormErrors) =>
    setErrors((prev) => (prev[key] ? { ...prev, [key]: undefined } : prev));

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const next: FormErrors = {};
    if (!name.trim()) next.name = "이름을 입력해주세요.";
    if (!phone.trim()) next.phone = "연락처를 입력해주세요.";
    if (!email.trim()) next.email = "이메일을 입력해주세요.";
    if (!category) next.category = "문의항목을 선택해주세요.";
    if (!subject.trim()) next.subject = "문의제목을 입력해주세요.";
    if (!content.trim()) next.content = "문의내용을 입력해주세요.";
    if (Object.keys(next).length > 0) {
      setErrors(next);
      return;
    }
    // 프로토타입: 실제 백엔드 미연동 — 등록 안내 후 내역 탭으로 전환
    alert("문의가 등록되었습니다 (프로토타입)\n작성하신 이메일 또는 마이페이지 > 상담내역에서 답변을 확인하실 수 있어요.");
    resetForm();
    setTab("history");
  };

  return (
    <div className="min-h-dvh bg-surface-muted pb-28">
      <PageHeader title="온라인 상담" fallbackHref="/" />

      {/* ── 탭 ── */}
      <div className="flex border-b border-line bg-surface">
        {(
          [
            { key: "form", label: "온라인 문의 등록" },
            { key: "history", label: "상담내역보기" },
          ] as { key: Tab; label: string }[]
        ).map((t) => {
          const active = tab === t.key;
          return (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className="flex-1 py-3.5 text-[14px] font-semibold transition-colors"
              style={{
                color: active ? "var(--brand)" : "var(--ink-mute)",
                borderBottom: active ? "2px solid var(--brand)" : "2px solid transparent",
              }}
            >
              {t.label}
            </button>
          );
        })}
      </div>

      {tab === "form" ? (
        <form onSubmit={onSubmit} noValidate className="flex flex-col gap-4 px-4 py-5">
          <Field label="이름" required error={errors.name}>
            <input
              type="text"
              value={name}
              onChange={(e) => { setName(e.target.value); clearError("name"); }}
              placeholder="이름을 입력하세요"
              className={inputClass}
            />
          </Field>

          <Field label="연락처" required error={errors.phone}>
            <input
              type="tel"
              value={phone}
              onChange={(e) => { setPhone(e.target.value); clearError("phone"); }}
              placeholder="연락처를 입력하세요"
              className={inputClass}
            />
          </Field>

          <Field label="이메일" required error={errors.email}>
            <input
              type="email"
              value={email}
              onChange={(e) => { setEmail(e.target.value); clearError("email"); }}
              placeholder="example@email.com"
              className={inputClass}
            />
          </Field>

          <Field label="문의항목" required error={errors.category}>
            <div className="grid grid-cols-2 gap-x-3 gap-y-2.5">
              {INQUIRY_CATEGORIES.map((c) => {
                const active = category === c;
                return (
                  <label key={c} className="flex cursor-pointer items-center gap-2">
                    <input
                      type="radio"
                      name="inquiry-category"
                      value={c}
                      checked={active}
                      onChange={() => { setCategory(c); clearError("category"); }}
                      className="sr-only"
                    />
                    <span
                      className="grid h-[18px] w-[18px] shrink-0 place-items-center rounded-full border"
                      style={{
                        borderColor: active ? "var(--brand)" : "var(--line)",
                        backgroundColor: active ? "var(--brand)" : "transparent",
                      }}
                    >
                      {active ? <span className="block h-1.5 w-1.5 rounded-full bg-white" /> : null}
                    </span>
                    <span className="text-[13px] text-ink-soft">{c}</span>
                  </label>
                );
              })}
            </div>
          </Field>

          <Field label="문의제목" required error={errors.subject}>
            <input
              type="text"
              value={subject}
              onChange={(e) => { setSubject(e.target.value); clearError("subject"); }}
              placeholder="제목을 입력하세요"
              className={inputClass}
            />
          </Field>

          <Field label="문의내용" required error={errors.content}>
            <textarea
              value={content}
              onChange={(e) => { setContent(e.target.value); clearError("content"); }}
              placeholder="문의내용을 입력하세요"
              rows={6}
              className={`${inputClass} resize-none`}
            />
          </Field>

          <div className="flex items-start gap-2 rounded-xl bg-surface-muted px-3.5 py-2.5">
            <span className="mt-[2px] grid h-4 w-4 shrink-0 place-items-center rounded-full bg-line text-[10px] font-bold text-ink-mute">
              i
            </span>
            <p className="text-[12px] leading-relaxed text-ink-mute">
              문의사항에 대한 답변은 작성해주신 이메일 또는{" "}
              <span className="font-semibold text-ink-soft">마이페이지 &gt; 상담내역</span>에서 확인하실 수 있어요.
            </p>
          </div>

          <div className="mt-2 flex gap-2">
            <button
              type="button"
              onClick={resetForm}
              className="flex-1 rounded-xl border border-line bg-surface py-3.5 text-[14px] font-semibold text-ink-soft"
            >
              취소
            </button>
            <button
              type="submit"
              className="flex-1 rounded-xl py-3.5 text-[14px] font-semibold text-white"
              style={{ backgroundColor: "var(--brand)" }}
            >
              등록하기
            </button>
          </div>
        </form>
      ) : (
        <div className="flex flex-col gap-2 px-4 py-5">
          {MOCK_HISTORY.length === 0 ? (
            <div className="rounded-2xl bg-surface px-5 py-12 text-center">
              <p className="text-[14px] font-semibold text-ink">아직 상담 내역이 없어요</p>
              <p className="mt-1 text-[12px] text-ink-mute">궁금한 점이 있으면 문의를 등록해 보세요.</p>
            </div>
          ) : (
            MOCK_HISTORY.map((item) => (
              <article
                key={item.id}
                className="flex gap-3 rounded-2xl border border-line bg-surface px-4 py-4"
              >
                <span
                  className="grid h-12 w-12 shrink-0 place-items-center rounded-full text-[11px] font-bold"
                  style={
                    item.status === "처리중"
                      ? { backgroundColor: "var(--brand-soft)", color: "var(--brand)" }
                      : { backgroundColor: "var(--surface-muted)", color: "var(--ink-mute)" }
                  }
                >
                  {item.status}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[14px] font-bold text-ink">{item.subject}</p>
                  <p className="mt-0.5 text-[11px] text-ink-mute">{item.date}</p>
                  <p className="mt-1.5 line-clamp-2 text-[12px] leading-relaxed text-ink-soft">
                    {item.preview}
                  </p>
                </div>
              </article>
            ))
          )}
        </div>
      )}

      <ScrollTopButton />
      <BottomNav />
    </div>
  );
}
