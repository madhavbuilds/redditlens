import { TrendingUp } from "lucide-react";
import { AnalysisResult } from "@/lib/api";

const momentumMap: Record<AnalysisResult["trending_topics"][number]["momentum"], string> = {
  Rising: "text-[var(--success)] bg-[color-mix(in_oklab,var(--success)_25%,transparent)]",
  Stable: "text-[var(--info)] bg-[color-mix(in_oklab,var(--info)_25%,transparent)]",
  Declining: "text-[var(--danger)] bg-[color-mix(in_oklab,var(--danger)_25%,transparent)]",
};

const momentumIcon: Record<AnalysisResult["trending_topics"][number]["momentum"], string> = {
  Rising: "↑",
  Stable: "→",
  Declining: "↓",
};

export function TrendingCard({ items }: { items: AnalysisResult["trending_topics"] }) {
  return (
    <article className="card-surface">
      <h3 className="mb-4 inline-flex items-center gap-2 text-base font-semibold">
        <TrendingUp size={16} className="text-[var(--success)]" />
        Trending Topics
      </h3>
      <div className="space-y-2">
        {items.map((item, index) => (
          <div key={`${item.topic}-${index}`} className="rounded-xl p-3 odd:bg-white/0 even:bg-white/3">
            <div className="flex items-start justify-between gap-2">
              <p className="text-sm font-semibold">{item.topic}</p>
              <span className={`rounded-full px-2 py-1 text-[11px] ${momentumMap[item.momentum]}`}>
                {momentumIcon[item.momentum]} {item.momentum}
              </span>
            </div>
            <p className="mt-2 text-sm text-[var(--text-secondary)]">{item.why}</p>
          </div>
        ))}
      </div>
    </article>
  );
}
