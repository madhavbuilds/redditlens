import os
from collections import Counter

import praw
from dotenv import load_dotenv

load_dotenv()

reddit = praw.Reddit(
    client_id=os.getenv("REDDIT_CLIENT_ID"),
    client_secret=os.getenv("REDDIT_CLIENT_SECRET"),
    user_agent=os.getenv("REDDIT_USER_AGENT", "RedditLens/1.0"),
)


def scrape_topic(topic: str, limit: int = 50) -> dict:
    """
    Scrape Reddit for a topic across multiple subreddits.
    Returns posts, comments, subreddits found, upvotes.
    Search across r/all for broad coverage.
    For each post get: title, score, url, subreddit, num_comments, top 3 comments.
    Return as structured dict.
    """
    posts = []
    subreddit_counts: Counter[str] = Counter()
    total_upvotes = 0

    for submission in reddit.subreddit("all").search(topic, sort="relevance", limit=limit):
        submission.comments.replace_more(limit=0)
        top_comments = []
        for comment in submission.comments[:3]:
            body = getattr(comment, "body", "")
            if body:
                top_comments.append(
                    {
                        "body": body,
                        "score": getattr(comment, "score", 0),
                        "author": str(getattr(comment, "author", "deleted")),
                    }
                )

        subreddit_name = str(submission.subreddit.display_name)
        subreddit_counts[subreddit_name] += 1
        total_upvotes += int(getattr(submission, "score", 0))

        posts.append(
            {
                "id": submission.id,
                "title": submission.title,
                "score": int(getattr(submission, "score", 0)),
                "url": f"https://reddit.com{submission.permalink}",
                "subreddit": subreddit_name,
                "num_comments": int(getattr(submission, "num_comments", 0)),
                "created_utc": float(getattr(submission, "created_utc", 0)),
                "top_comments": top_comments,
            }
        )

    return {
        "topic": topic,
        "total_posts": len(posts),
        "total_upvotes": total_upvotes,
        "subreddits_found": [name for name, _ in subreddit_counts.most_common()],
        "posts": posts,
    }


def get_top_subreddits(topic: str) -> list:
    """
    Find top 5 subreddits most active for this topic.
    Return list of {name, subscribers, description}.
    """
    counts: Counter[str] = Counter()
    for submission in reddit.subreddit("all").search(topic, sort="relevance", limit=100):
        counts[str(submission.subreddit.display_name)] += 1

    top_results = []
    for subreddit_name, _ in counts.most_common(5):
        subreddit = reddit.subreddit(subreddit_name)
        top_results.append(
            {
                "name": subreddit_name,
                "subscribers": int(getattr(subreddit, "subscribers", 0)),
                "description": getattr(subreddit, "public_description", "") or "No description available.",
            }
        )
    return top_results
