"use client";

import { Youtube, Instagram, Facebook } from "lucide-react";

const companyLines = [
  "사업자등록번호: 201-86-24458 | 대표: 이철집",
  "04553 서울특별시 중구 수표로 3-6",
  "통신판매신고: 제 2012-서울중구-0016",
  "개인정보보호책임자: 금석룡",
];

const policyLinks = ["이용약관", "라이선스 규정", "개인정보처리방침", "청소년보호정책"];

export default function Footer() {
  return (
    <footer className="border-t border-line bg-surface-muted px-5 pb-28 pt-6">
      {/* 정책 링크 */}
      <div className="flex flex-wrap gap-x-3 gap-y-1 mb-5">
        {policyLinks.map((l) => (
          <a key={l} href="#" className="text-[11px] text-ink-soft">
            {l}
          </a>
        ))}
      </div>

      {/* TongRo 로고 텍스트 */}
      <p className="text-[13px] font-bold text-ink mb-1">TongRo Images</p>
      <p className="text-[12px] font-semibold text-ink-soft mb-3">통로이미지(주)</p>

      {/* 회사 정보 */}
      <div className="flex flex-col gap-0.5 mb-3">
        {companyLines.map((l) => (
          <p key={l} className="text-[11px] text-ink-mute leading-relaxed">{l}</p>
        ))}
      </div>

      {/* 전화번호 */}
      <p className="text-[18px] font-bold text-ink mb-0.5">02-2270-1730</p>
      <p className="text-[11px] text-ink-mute mb-1">평일 09:00-18:00 | 점심 12:00~13:00</p>
      <p className="text-[11px] text-ink-mute mb-4">clipartkorea@tongro.co.kr | FAX: 02-2277-0816</p>

      {/* SNS */}
      <div className="flex gap-3 mb-5">
        <a href="#" aria-label="유튜브" className="text-ink-mute"><Youtube size={18} /></a>
        <a href="#" aria-label="인스타그램" className="text-ink-mute"><Instagram size={18} /></a>
        <a href="#" aria-label="페이스북" className="text-ink-mute"><Facebook size={18} /></a>
        <a href="#" className="text-[11px] text-ink-mute self-center">핀터레스트</a>
        <a href="#" className="text-[11px] text-ink-mute self-center">블로그</a>
      </div>

      {/* 인증 배지 텍스트 */}
      <div className="flex flex-wrap gap-x-3 gap-y-1 mb-4">
        {["디지털연구소 인가", "굿콘텐츠", "CEPIC"].map((b) => (
          <span key={b} className="text-[10px] text-ink-mute border border-line rounded px-1.5 py-0.5">{b}</span>
        ))}
      </div>

      <p className="text-[10px] text-ink-mute">
        Copyright © TongRo Images Inc. All Rights Reserved.
      </p>
    </footer>
  );
}
