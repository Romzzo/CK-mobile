import Link from "next/link";
import { ChevronRight } from "lucide-react";

export default function SectionHeader({
  title,
  subtitle,
  href,
  action = "더 보기",
}: {
  title: string;
  subtitle?: string;
  href?: string;
  action?: string;
}) {
  return (
    <div className="flex items-end justify-between gap-3">
      <div>
        <h2 className="text-[17px] font-bold leading-tight tracking-tight text-ink">{title}</h2>
        {subtitle ? <p className="mt-1 text-xs text-ink-mute">{subtitle}</p> : null}
      </div>
      {href ? (
        <Link
          href={href}
          className="flex shrink-0 items-center gap-0.5 text-[13px] font-medium text-ink-mute"
        >
          {action}
          <ChevronRight size={14} />
        </Link>
      ) : null}
    </div>
  );
}
