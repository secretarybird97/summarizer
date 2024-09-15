import logging

import httpx
import torch
from bs4 import BeautifulSoup
from transformers import pipeline

from fastapi import Body, FastAPI, HTTPException

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

DEVICE = torch.device("cuda" if torch.cuda.is_available() else "cpu")
summarizer = pipeline("summarization", model="facebook/bart-large-cnn", device=DEVICE)


async def text_summary(text: str):
    try:
        return summarizer(text, max_length=100, min_length=5, do_sample=False)[0]["summary_text"]  # type: ignore
    except Exception as e:
        logger.error(f"Error summarizing text: {e}")
        raise HTTPException(status_code=500, detail="Error during text summarization")


async def fetch_article_content(url: str):
    headers = {"User-Agent": "Mozilla/5.0"}
    async with httpx.AsyncClient() as client:
        response = await client.get(url, headers=headers)
        if response.status_code != 200:
            logger.error(
                f"Failed to fetch the article with status code: {response.status_code}"
            )
            raise HTTPException(status_code=400, detail="Failed to fetch the article")

    soup = BeautifulSoup(response.content, "html.parser")
    for selector in ["article", ".post-content", "#main-content"]:
        content = soup.select_one(selector)
        if content:
            paragraphs = content.find_all("p")
            article_text = " ".join(
                p.get_text().strip() for p in paragraphs if p.get_text().strip()
            )
            if article_text:
                return article_text
    logger.error("Article content not found")
    return None


app = FastAPI()


@app.post("/summarize/text")
async def summarize_text(text: str = Body(...)):
    summary = await text_summary(text)
    return {"summary_text": summary}


@app.post("/summarize/article")
async def summarize_article(url: str = Body(...)):
    article_text = await fetch_article_content(url)
    if article_text is None:
        raise HTTPException(
            status_code=404, detail="Failed to fetch the article content"
        )
    summary = await text_summary(article_text)
    return {"summary_text": summary}
