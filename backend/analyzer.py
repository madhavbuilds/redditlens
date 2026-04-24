import json
import os

import anthropic

client = anthropic.Anthropic(api_key=os.getenv("ANTHROPIC_API_KEY"))

ANALYSIS_PROMPT = """
You are an expert market researcher and Reddit analyst.
Analyze the following Reddit posts and comments about "{topic}".

Reddit Data:
{reddit_data}

Return ONLY a valid JSON object with EXACTLY this structure, no markdown, no extra text:

{{
  "pain_points": [
    {{"title": "string", "description": "string (1-2 sentences)", "frequency": "High|Medium|Low", "example_quote": "string (real quote from data)"}}
  ],
  "trending_topics": [
    {{"topic": "string", "momentum": "Rising|Stable|Declining", "why": "string (1 sentence)"}}
  ],
  "sentiment": {{
    "positive": 0-100,
    "neutral": 0-100,
    "negative": 0-100,
    "overall": "Positive|Neutral|Negative|Mixed",
    "summary": "string (1 sentence)"
  }},
  "top_subreddits": [
    {{"name": "string", "why": "string", "activity": "Very Active|Active|Moderate"}}
  ],
  "viral_posts": [
    {{"title": "string", "score": number, "url": "string", "why_viral": "string"}}
  ],
  "ai_summary": "string (3-4 sentences, conversational, like a smart friend explaining what Reddit thinks about this topic)",
  "market_opportunity": "string (2-3 sentences about gaps or opportunities spotted in the data)",
  "best_time_to_post": "string (based on post activity patterns)"
}}

Rules:
- pain_points: exactly 5 items
- trending_topics: exactly 5 items
- top_subreddits: exactly 5 items
- viral_posts: exactly 3 items
- sentiment numbers must sum to 100
- ai_summary must sound human, not robotic
- Return ONLY the JSON, nothing else
"""


def _fallback_analysis(topic: str) -> dict:
    return {
        "pain_points": [
            {
                "title": f"Not enough data point {i + 1}",
                "description": f"More Reddit data is needed to confidently identify pain point {i + 1}.",
                "frequency": "Medium",
                "example_quote": "Insufficient quote data available.",
            }
            for i in range(5)
        ],
        "trending_topics": [
            {"topic": f"{topic} trend {i + 1}", "momentum": "Stable", "why": "Insufficient signal for confident trend detection."}
            for i in range(5)
        ],
        "sentiment": {
            "positive": 34,
            "neutral": 33,
            "negative": 33,
            "overall": "Mixed",
            "summary": "Sentiment appears mixed, but more data is needed for confidence.",
        },
        "top_subreddits": [
            {"name": f"subreddit_{i + 1}", "why": "Appears relevant based on available mentions.", "activity": "Moderate"}
            for i in range(5)
        ],
        "viral_posts": [
            {"title": f"Sample viral post {i + 1}", "score": 0, "url": "https://reddit.com", "why_viral": "Unable to confidently infer viral drivers."}
            for i in range(3)
        ],
        "ai_summary": f"People on Reddit are discussing {topic}, but the data returned was limited or malformed. You can retry with a broader query for richer insights.",
        "market_opportunity": "A clear opportunity is improving data quality and breadth for better niche positioning insights.",
        "best_time_to_post": "Try weekday mornings and early evenings, then optimize based on engagement.",
    }


def _extract_json(text: str) -> dict:
    start = text.find("{")
    end = text.rfind("}")
    if start == -1 or end == -1 or end <= start:
        raise ValueError("No JSON object found in model output.")
    return json.loads(text[start : end + 1])


def analyze_reddit_data(topic: str, reddit_data: dict) -> dict:
    """
    Send scraped Reddit data to Claude for analysis.
    Parse JSON response, return structured insights dict.
    Handle JSON parsing errors gracefully with fallback.
    """
    if not os.getenv("ANTHROPIC_API_KEY"):
        return _fallback_analysis(topic)

    prompt = ANALYSIS_PROMPT.format(topic=topic, reddit_data=json.dumps(reddit_data, ensure_ascii=False))
    try:
        message = client.messages.create(
            model="claude-3-5-sonnet-latest",
            max_tokens=2000,
            temperature=0.2,
            messages=[{"role": "user", "content": prompt}],
        )
        raw_text = "".join(block.text for block in message.content if hasattr(block, "text"))
        parsed = _extract_json(raw_text)
        return parsed if isinstance(parsed, dict) else _fallback_analysis(topic)
    except (json.JSONDecodeError, ValueError, KeyError, TypeError):
        return _fallback_analysis(topic)
    except Exception:
        return _fallback_analysis(topic)
