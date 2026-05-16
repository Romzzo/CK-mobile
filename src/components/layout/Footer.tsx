"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { YoutubeIcon, InstagramIcon, FacebookIcon, BlogIcon } from "@/components/ui/SnsIcons";

const linkGroups = [
  {
    title: "회사",
    links: [
      { label: "회사소개", href: "https://www.tongro.co.kr" },
      { label: "채용공고", href: "https://career.tongro.co.kr/" },
    ],
  },
  {
    title: "서비스",
    links: [
      { label: "공지사항", href: "#" },
      { label: "상담문의", href: "/help" },
      { label: "이벤트", href: "/event" },
      { label: "무료콘텐츠", href: "/free" },
    ],
  },
  {
    title: "정책 및 법률",
    links: [
      { label: "이용약관", href: "/service/agreement" },
      { label: "라이선스 규정", href: "#" },
      { label: "개인정보처리방침", href: "#" },
      { label: "청소년보호정책", href: "#" },
    ],
  },
];

const snsIcons = [
  { label: "유튜브", Icon: YoutubeIcon },
  { label: "인스타그램", Icon: InstagramIcon },
  { label: "페이스북", Icon: FacebookIcon },
  { label: "블로그", Icon: BlogIcon },
];

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
    <footer
      className="border-t border-line bg-surface-muted px-5 pt-7"
      style={{ paddingBottom: "calc(58px + env(safe-area-inset-bottom, 0px) + 16px)" }}
    >
      <div className="flex flex-col gap-4">
        {linkGroups.map((g) => (
          <dl key={g.title}>
            <dt className="mb-2 text-[12px] font-bold text-ink-mute">{g.title}</dt>
            <dd className="grid grid-cols-2 gap-x-3 gap-y-1.5">
              {g.links.map((l) => {
                const external = l.href.startsWith("http");
                return (
                  <a
                    key={l.label}
                    href={l.href}
                    target={external ? "_blank" : undefined}
                    rel={external ? "noopener noreferrer" : undefined}
                    className="text-[12px] text-ink-soft"
                  >
                    {l.label}
                  </a>
                );
              })}
            </dd>
          </dl>
        ))}
      </div>

      <button
        onClick={() => setOpenInfo((v) => !v)}
        className="mt-4 flex w-full items-center justify-between border-t border-line pt-4"
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

      <div className="mt-4 flex items-center gap-2">
        {snsIcons.map(({ label, Icon }) => (
          <a
            key={label}
            href="#"
            aria-label={label}
            className="p-1.5 text-ink-mute transition-colors hover:text-ink-soft"
          >
            <Icon size={22} />
          </a>
        ))}
      </div>

      <p className="mt-4 text-center text-[10px] text-ink-mute">
        Copyright © TongRo Images Inc. All Rights Reserved.
      </p>
    </footer>
  );
}
