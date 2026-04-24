import { Compass, ExternalLink } from "lucide-react";
import { AnalysisResult } from "@/lib/api";

const activityClass: Record<AnalysisResult["top_subreddits"][number]["activity"], string> = {
  "Very Active": "text-[var(--success)] bg-[color-mix(in_oklab,var(--success)_25%,transparent)]",
  Active: "text-[var(--info)] bg-[color-mix(in_oklab,var(--info)_25%,transparent)]",
  Moderate: "text-slate-400 bg-slate-500/20",
};

export function SubredditsCard({ items }: { items: AnalysisResult["top_subreddits"] }) {
  return (
    <article className="card-surface">
      <h3 className="mb-4 inline-flex items-center gap-2 text-base font-semibold">
        <Compass size={16} className="text-[var(--accent-light)]" />
        Top Subreddits
      </h3>
      <div className="space-y-4">
        {items.map((item, index) => (
          <div key={`${item.name}-${index}`} className="group">
            <div className="flex items-center justify-between gap-3">
              <a
                href={`https://reddit.com/r/${item.name}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 text-sm font-semibold text-[var(--accent-light)] hover:text-[var(--accent)]"
              >
                r/{item.name}
                <ExternalLink size={13} className="opacity-0 transition group-hover:opacity-100" />
              </a>
              <span className={`rounded-full px-2 py-1 text-[11px] ${activityClass[item.activity]}`}>{item.activity}</span>
            </div>
            <p className="mt-1 text-sm text-[var(--text-secondary)]">{item.why}</p>
          </div>
        ))}
      </div>
    </article>
  );
}
