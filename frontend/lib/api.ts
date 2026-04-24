const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export interface AnalysisResult {
  pain_points: Array<{
    title: string;
    description: string;
    frequency: "High" | "Medium" | "Low";
    example_quote: string;
  }>;
  trending_topics: Array<{
    topic: string;
    momentum: "Rising" | "Stable" | "Declining";
    why: string;
  }>;
  sentiment: {
    positive: number;
    neutral: number;
    negative: number;
    overall: string;
    summary: string;
  };
  top_subreddits: Array<{
    name: string;
    why: string;
    activity: "Very Active" | "Active" | "Moderate";
  }>;
  viral_posts: Array<{
    title: string;
    score: number;
    url: string;
    why_viral: string;
  }>;
  ai_summary: string;
  market_opportunity: string;
  best_time_to_post: string;
}

export async function analyzeTopicAsync(topic: string): Promise<AnalysisResult> {
  try {
    const response = await fetch(`${API_URL}/analyze`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ topic }),
    });

    if (!response.ok) {
      const errData = await response.json().catch(() => ({}));
      throw new Error(errData.detail || "Analysis failed.");
    }

    const payload = await response.json();
    const analysis = payload.analysis ?? payload;
    return analysis as AnalysisResult;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message || "Network error while analyzing topic.");
    }
    throw new Error("Unexpected error while analyzing topic.");
  }
}
