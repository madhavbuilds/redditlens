import { Clock, Lightbulb, Sparkles } from "lucide-react";

type Props = {
  summary: string;
  opportunity: string;
  bestTimeToPost: string;
};

export function SummaryCard({ summary, opportunity, bestTimeToPost }: Props) {
  return (
    <article className="card-surface border-l-4 border-l-[var(--accent)] bg-[color-mix(in_oklab,var(--surface)_85%,white_15%)]">
      <p className="mb-3 inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--accent-light)]">
        <Sparkles size={14} />
        AI Summary
      </p>
      <p className="mb-3 text-4xl leading-none text-[var(--accent)]">&quot;</p>
      <p className="text-lg italic text-[var(--text-primary)] sm:text-xl">{summary}</p>
      <hr className="my-5 border-[var(--border)]" />
      <div>
        <p className="mb-2 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-[var(--text-secondary)]">
          <Lightbulb size={14} className="text-[var(--warning)]" />
          Market Opportunity
        </p>
        <p className="text-sm text-[var(--text-secondary)]">{opportunity}</p>
      </div>
      <div className="mt-5 inline-flex items-center gap-2 text-xs text-[var(--text-tertiary)]">
        <Clock size={14} />
        Best time to post: {bestTimeToPost}
      </div>
    </article>
  );
}
