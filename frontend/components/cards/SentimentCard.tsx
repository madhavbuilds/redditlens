import { Heart } from "lucide-react";
import { AnalysisResult } from "@/lib/api";

export function SentimentCard({ sentiment }: { sentiment: AnalysisResult["sentiment"] }) {
  const bars = [
    { label: "Positive", value: sentiment.positive, color: "var(--success)" },
    { label: "Neutral", value: sentiment.neutral, color: "#6b7280" },
    { label: "Negative", value: sentiment.negative, color: "var(--danger)" },
  ];

  return (
    <article className="card-surface">
      <h3 className="mb-3 inline-flex items-center gap-2 text-base font-semibold">
        <Heart size={16} className="text-[var(--accent-light)]" />
        Community Sentiment
      </h3>
      <div className="mb-3 inline-flex rounded-full bg-[var(--accent-glow)] px-3 py-1 text-xs font-semibold text-[var(--accent-light)]">
        {sentiment.overall}
      </div>
      <p className="mb-4 text-sm text-[var(--text-secondary)]">{sentiment.summary}</p>
      <div className="space-y-3">
        {bars.map((bar) => (
          <div key={bar.label}>
            <div className="mb-1 flex items-center justify-between text-xs text-[var(--text-secondary)]">
              <span>{bar.label}</span>
              <span>{bar.value}%</span>
            </div>
            <div className="h-2 rounded-full bg-[var(--border)]">
              <div
                className="sentiment-fill h-2 rounded-full"
                style={{ backgroundColor: bar.color, width: `${bar.value}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </article>
  );
}
