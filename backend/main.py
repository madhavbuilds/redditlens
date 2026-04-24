from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from analyzer import analyze_reddit_data
from scraper import get_top_subreddits, scrape_topic

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "https://*.vercel.app"],
    allow_methods=["*"],
    allow_headers=["*"],
)


class SearchRequest(BaseModel):
    topic: str


@app.post("/analyze")
async def analyze(request: SearchRequest):
    """
    1. Scrape Reddit for the topic
    2. Analyze with Claude
    3. Return combined results
    Handle errors with proper HTTP exceptions.
    """
    topic = request.topic.strip()
    if not topic:
        raise HTTPException(status_code=400, detail="Topic is required.")

    try:
        reddit_data = scrape_topic(topic=topic, limit=50)
        subreddit_context = get_top_subreddits(topic=topic)
        analysis = analyze_reddit_data(topic=topic, reddit_data=reddit_data)
        analysis["top_subreddits_context"] = subreddit_context
        return {"topic": topic, "reddit_data": reddit_data, "analysis": analysis}
    except HTTPException:
        raise
    except Exception as exc:
        raise HTTPException(status_code=500, detail=f"Failed to analyze topic: {exc}") from exc


@app.get("/health")
async def health():
    return {"status": "ok"}
