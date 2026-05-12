"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const linkGroups = [
  { title: "회사", links: ["회사소개", "채용문의", "작가입점", "사업제휴"] },
  {
    title: "서비스",
    links: ["클립아트코리아 소개", "공지사항", "자주묻는질문", "라이선스구매/견적", "이벤트", "콘텐츠 유의사항"],
  },
  { title: "정책 및 법률", links: ["이용약관", "라이선스 규정", "개인정보처리방침", "청소년보호정책"] },
];

const sns = ["유튜브", "인스타그램", "페이스북", "핀터레스트", "블로그"];

const companyInfo = [
  "사업자등록번호: 201-86-24458 | 대표: 이철집",
  "04553 서울특별시 중구 수표로 3-6",
  "통신판매신고: 제 2012-서울중구-0016",
  "개인정보보호책임자: 금석룡",
  "02-2270-1730 | 평일 09:00-18:00 | 점심 12:00~13:00",
  "clipartkorea@tongro.co.kr | FAX: 02-2277-0816",
];

export default function Footer() {
  const [openInfo, setOpenInfo] = useState(false);

  return (
    <footer className="border-t border-line bg-surface-muted px-5 pb-28 pt-6">
      <div className="flex flex-col gap-5">
        {linkGroups.map((g) => (
          <dl key={g.title}>
            <dt className="text-[12px] font-bold text-ink-mute">{g.title}</dt>
            <dd className="mt-2 flex flex-col gap-1.5">
              {g.links.map((l) => (
                <a key={l} href="#" className="text-[12px] text-ink-soft">
                  {l}
                </a>
              ))}
            </dd>
          </dl>
        ))}
      </div>

      <button
        onClick={() => setOpenInfo((v) => !v)}
        className="mt-5 flex w-full items-center justify-between border-t border-line pt-5"
      >
        <span className="text-[12px] font-semibold text-ink-soft">통로이미지(주)</span>
        <ChevronDown
          size={15}
          className="text-ink-mute"
          style={{ transform: openInfo ? "rotate(180deg)" : "none", transition: "transform 0.2s" }}
        />
      </button>
      {openInfo ? (
        <div className="mt-3 flex flex-col gap-0.5 text-[11px] leading-relaxed text-ink-mute">
          {companyInfo.map((line) => (
            <p key={line}>{line}</p>
          ))}
        </div>
      ) : null}

      <div className="mt-5 flex flex-wrap gap-x-3 gap-y-1.5">
        {sns.map((s) => (
          <a key={s} href="#" className="text-[11px] text-ink-mute">
            {s}
          </a>
        ))}
      </div>

      <p className="mt-5 text-center text-[10px] text-ink-mute">
        Copyright © TongRo Images Inc. All Rights Reserved.
      </p>
    </footer>
  );
}
