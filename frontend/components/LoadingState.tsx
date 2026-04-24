"use client";

import { useEffect, useState } from "react";

const tips = [
  "Scanning thousands of posts...",
  "Finding pain points...",
  "Asking Claude for insights...",
  "Almost done...",
];

export function LoadingState() {
  const [tipIndex, setTipIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTipIndex((prev) => (prev + 1) % tips.length);
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-4">
      <div className="card-surface">
        <p className="text-sm text-[var(--text-secondary)]">Scraping Reddit & analyzing with AI...</p>
        <p className="mt-2 text-xs uppercase tracking-[0.14em] text-[var(--accent-light)]">{tips[tipIndex]}</p>
      </div>
      <div className="masonry-grid">
        {[220, 320, 280, 260, 300, 240].map((height, i) => (
          <div key={i} className="masonry-item">
            <div className="card-surface animate-pulse" style={{ height }} />
          </div>
        ))}
      </div>
    </div>
  );
}
