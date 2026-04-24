"use client";

import { useState } from "react";
import { Flame } from "lucide-react";
import { AnalysisResult } from "@/lib/api";

const badgeColors: Record<AnalysisResult["pain_points"][number]["frequency"], string> = {
  High: "bg-[color-mix(in_oklab,var(--danger)_25%,transparent)] text-[var(--danger)]",
  Medium: "bg-[color-mix(in_oklab,var(--warning)_25%,transparent)] text-[var(--warning)]",
  Low: "bg-[color-mix(in_oklab,var(--info)_25%,transparent)] text-[var(--info)]",
};

export function PainPointsCard({ items }: { items: AnalysisResult["pain_points"] }) {
  const [expanded, setExpanded] = useState<Record<number, boolean>>({});

  return (
    <article className="card-surface">
      <h3 className="mb-4 inline-flex items-center gap-2 text-base font-semibold">
        <Flame size={16} className="text-[var(--danger)]" />
        Pain Points
      </h3>
      <div className="space-y-4">
        {items.map((item, index) => {
          const isOpen = !!expanded[index];
          return (
            <div key={`${item.title}-${index}`} className="border-b border-[var(--border)] pb-4 last:border-0 last:pb-0">
              <button
                type="button"
                onClick={() => setExpanded((prev) => ({ ...prev, [index]: !isOpen }))}
                className="w-full text-left"
              >
                <div className="flex items-start justify-between gap-3">
                  <p className="text-sm font-semibold">{item.title}</p>
                  <span className={`rounded-full px-2 py-1 text-[11px] uppercase tracking-wide ${badgeColors[item.frequency]}`}>
                    {item.frequency}
                  </span>
                </div>
                <p className="mt-2 text-sm text-[var(--text-secondary)]">{item.description}</p>
              </button>
              {isOpen && (
                <blockquote className="mt-3 border-l-2 border-[var(--accent)] pl-3 text-sm italic text-[var(--text-tertiary)]">
                  &quot;{item.example_quote}&quot;
                </blockquote>
              )}
            </div>
          );
        })}
      </div>
    </article>
  );
}
