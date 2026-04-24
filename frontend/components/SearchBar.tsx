"use client";

import { FormEvent, useState } from "react";
import { Loader2 } from "lucide-react";

type SearchBarProps = {
  onSubmit: (topic: string) => Promise<void> | void;
  loading: boolean;
  error: string | null;
};

export function SearchBar({ onSubmit, loading, error }: SearchBarProps) {
  const [value, setValue] = useState("");

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    const topic = value.trim();
    if (!topic || loading) {
      return;
    }
    await onSubmit(topic);
  };

  return (
    <form onSubmit={submit} className="mx-auto w-full max-w-2xl">
      <div
        className={`rounded-full border bg-[var(--surface)] px-2 py-2 transition ${
          error ? "border-[var(--danger)]" : "border-[var(--border)] focus-within:border-[var(--accent)] focus-within:shadow-[0_0_0_1px_var(--accent),0_0_20px_var(--accent-glow)]"
        }`}
      >
        <div className="flex items-center gap-2">
          <input
            value={value}
            onChange={(event) => setValue(event.target.value)}
            placeholder="Try 'AI coding tools', 'remote work', 'React vs Vue'..."
            className="h-12 w-full bg-transparent px-4 text-sm outline-none sm:text-base"
          />
          <button
            type="submit"
            disabled={loading}
            className="inline-flex h-11 min-w-30 items-center justify-center rounded-full bg-gradient-to-r from-[var(--accent)] to-[#9a6cff] px-5 text-sm font-semibold text-white transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-80"
          >
            {loading ? (
              <span className="inline-flex items-center gap-2">
                <Loader2 size={14} className="animate-spin" />
                Analyzing Reddit...
              </span>
            ) : (
              "Analyze"
            )}
          </button>
        </div>
      </div>
      <p className="mt-3 text-xs text-[var(--text-tertiary)]">
        Searches across Reddit in real-time • Powered by Claude AI
      </p>
      {error && <p className="mt-2 text-sm text-[var(--danger)]">{error}</p>}
    </form>
  );
}
