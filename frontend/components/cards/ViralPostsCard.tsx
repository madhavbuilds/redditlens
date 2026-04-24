import { Zap } from "lucide-react";
import { AnalysisResult } from "@/lib/api";

export function ViralPostsCard({ items }: { items: AnalysisResult["viral_posts"] }) {
  return (
    <article className="card-surface">
      <h3 className="mb-4 inline-flex items-center gap-2 text-base font-semibold">
        <Zap size={16} className="text-[var(--warning)]" />
        Viral Posts
      </h3>
      <div className="space-y-3">
        {items.map((post, index) => (
          <div key={`${post.title}-${index}`} className="rounded-xl border border-[var(--border)] bg-[color-mix(in_oklab,var(--surface)_90%,black_10%)] p-3">
            <p className="line-clamp-2 text-sm font-semibold">{post.title}</p>
            <p className="mt-2 text-xs text-orange-400">↑ {post.score.toLocaleString()} upvotes</p>
            <p className="mt-2 text-sm italic text-[var(--text-secondary)]">{post.why_viral}</p>
            <a href={post.url} target="_blank" rel="noreferrer" className="mt-2 inline-block text-xs text-[var(--accent-light)] hover:text-[var(--accent)]">
              View on Reddit →
            </a>
          </div>
        ))}
      </div>
    </article>
  );
}
