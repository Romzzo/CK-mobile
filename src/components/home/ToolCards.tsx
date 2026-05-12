import { ChevronRight } from "lucide-react";
import SectionHeader from "@/components/home/SectionHeader";

const tools = [
  {
    title: "포토샵 없어도 돼요",
    sub: "설치 없이 웹에서 바로 · 무료 체험 가능",
    cta: "지금 만들어보기",
    href: "https://editor.clipartkorea.co.kr/editor",
  },
  {
    title: "가입하면 1,000크레딧",
    sub: "초상권 걱정 없는 AI 이미지",
    cta: "무료로 시작하기",
    href: "https://www.clipartkorea.co.kr/aistudio",
  },
];

export default function ToolCards() {
  return (
    <section className="px-4 pt-8">
      <SectionHeader title="이런 것도 있어요" subtitle="이미지 편집부터 AI 생성까지" />

      <div className="mt-3 grid grid-cols-2 gap-2.5">
        {tools.map((t) => (
          <a
            key={t.href}
            href={t.href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col rounded-2xl border border-line bg-surface p-4"
          >
            <p className="text-[15px] font-bold leading-snug text-ink">{t.title}</p>
            <p className="mt-1 text-[12px] leading-snug text-ink-mute">{t.sub}</p>
            <span className="mt-auto inline-flex items-center gap-0.5 pt-3 text-[12px] font-semibold text-brand">
              {t.cta}
              <ChevronRight size={13} />
            </span>
          </a>
        ))}
      </div>
    </section>
  );
}
