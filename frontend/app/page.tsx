"use client";

import { useRef, useState } from "react";

import { Dashboard } from "@/components/Dashboard";
import { LoadingState } from "@/components/LoadingState";
import { SearchBar } from "@/components/SearchBar";
import { AnalysisResult, analyzeTopicAsync } from "@/lib/api";

export default function Home() {
  const [topic, setTopic] = useState("");
  const [results, setResults] = useState<AnalysisResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const dashboardRef = useRef<HTMLDivElement | null>(null);

  const onSubmit = async (nextTopic: string) => {
    setLoading(true);
    setError(null);
    setTopic(nextTopic);
    try {
      const data = await analyzeTopicAsync(nextTopic);
      setResults(data);
      requestAnimationFrame(() => {
        dashboardRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    } catch (err) {
      setResults(null);
      setError(err instanceof Error ? err.message : "Unexpected error.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="relative mx-auto w-full max-w-7xl px-4 pb-16 pt-16 sm:px-6">
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute left-1/2 top-[-12rem] h-[28rem] w-[28rem] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(124,58,237,0.28)_0%,rgba(10,10,15,0)_68%)] blur-xl" />
      </div>

      <section className="mx-auto max-w-4xl py-12 text-center">
        <div className="mb-6 inline-flex items-center rounded-full border border-[var(--accent)]/40 bg-[var(--accent-glow)] px-4 py-1 text-[11px] uppercase tracking-[0.18em] text-[var(--accent-light)]">
          Powered by Claude AI
        </div>
        <h1 className="text-4xl font-bold tracking-tight text-[var(--text-primary)] sm:text-5xl">
          Reddit Intelligence, Instantly
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-sm text-[var(--text-secondary)] sm:text-base">
          Type any topic. Get AI-powered insights from Reddit in seconds.
        </p>
        <div className="mt-8">
          <SearchBar onSubmit={onSubmit} loading={loading} error={error} />
        </div>
      </section>

      <section ref={dashboardRef} className="mt-6">
        {loading && <LoadingState />}
        {!loading && results && <Dashboard topic={topic} results={results} />}
      </section>
    </main>
  );
}
