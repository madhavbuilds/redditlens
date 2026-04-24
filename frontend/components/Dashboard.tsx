"use client";

import { motion } from "framer-motion";
import { Lightbulb } from "lucide-react";
import { AnalysisResult } from "@/lib/api";
import { PainPointsCard } from "@/components/cards/PainPointsCard";
import { SentimentCard } from "@/components/cards/SentimentCard";
import { SubredditsCard } from "@/components/cards/SubredditsCard";
import { SummaryCard } from "@/components/cards/SummaryCard";
import { TrendingCard } from "@/components/cards/TrendingCard";
import { ViralPostsCard } from "@/components/cards/ViralPostsCard";

export function Dashboard({ results, topic }: { results: AnalysisResult; topic: string }) {
  const cards = [
    <SummaryCard
      key="summary"
      summary={results.ai_summary}
      opportunity={results.market_opportunity}
      bestTimeToPost={results.best_time_to_post}
    />,
    <SentimentCard key="sentiment" sentiment={results.sentiment} />,
    <PainPointsCard key="pain" items={results.pain_points} />,
    <TrendingCard key="trending" items={results.trending_topics} />,
    <SubredditsCard key="subs" items={results.top_subreddits} />,
    <ViralPostsCard key="viral" items={results.viral_posts} />,
    <article key="opportunity" className="card-surface">
      <h3 className="mb-2 inline-flex items-center gap-2 text-base font-semibold">
        <Lightbulb size={16} className="text-[var(--warning)]" />
        Market Opportunity Snapshot
      </h3>
      <p className="text-sm text-[var(--text-secondary)]">{results.market_opportunity}</p>
      <p className="mt-3 text-xs uppercase tracking-[0.16em] text-[var(--text-tertiary)]">Topic: {topic}</p>
    </article>,
  ];

  return (
    <div>
      <div className="mb-5 text-xs uppercase tracking-[0.18em] text-[var(--text-tertiary)]">Dashboard</div>
      <div className="masonry-grid">
        {cards.map((card, index) => (
          <motion.div
            key={index}
            className="masonry-item"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.08, duration: 0.4, ease: "easeOut" }}
          >
            {card}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
