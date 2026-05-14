import Link from "next/link";
import { Check, ArrowRight } from "lucide-react";

const benefits = [
  "AI스튜디오 1,000 크레딧 즉시 지급",
  "초보도 프로처럼 에디터 무료 사용",
  "5만 컷 이상의 무료콘텐츠 제공",
  "멤버십 라이선스 최대 50% 할인",
];

export default function BrandStats() {
  return (
    <section className="px-4 pt-8">
      <div
        className="relative overflow-hidden rounded-2xl p-5 text-white"
        style={{ backgroundColor: "var(--brand)" }}
      >
        <div
          className="pointer-events-none absolute -right-8 -top-10 h-32 w-32 rounded-full"
          style={{ backgroundColor: "rgba(255,255,255,0.12)" }}
        />

        <p className="relative text-[16px] font-bold">지금 가입하면 이런 혜택이 있어요</p>

        <ul className="relative mt-3 flex flex-col gap-2">
          {benefits.map((b) => (
            <li key={b} className="flex items-center gap-2 text-[13px] text-white/90">
              <span
                className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full"
                style={{ backgroundColor: "rgba(255,255,255,0.22)" }}
              >
                <Check size={10} strokeWidth={3} className="text-white" />
              </span>
              {b}
            </li>
          ))}
        </ul>

        <Link
          href="/signup"
          className="relative mt-4 flex items-center justify-center gap-1.5 rounded-xl bg-white py-3.5 text-[14px] font-bold text-brand"
        >
          무료로 시작하기 <ArrowRight size={15} />
        </Link>
      </div>
    </section>
  );
}
