import logging
from concurrent.futures import ThreadPoolExecutor

import torch
from app.utils.summary_service import SummaryService
from pydantic import BaseModel
from transformers import pipeline

from fastapi import Body, FastAPI, HTTPException


class TextSummaryResponse(BaseModel):
    summary_text: str


class ArticleSummaryResponse(BaseModel):
    title: str
    article_text: str
    summary_text: str


logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
summarizer = pipeline(
    "summarization", model="facebook/bart-large-cnn", device=device, framework="pt"
)
executor = ThreadPoolExecutor(max_workers=1)

summary_service = SummaryService(summarizer, logger, executor)

app = FastAPI()


@app.post("/summarize/text")
async def summarize_text(text: str = Body(...)):
    summary = await summary_service.text_summary(text)
    return TextSummaryResponse(summary_text=summary)


@app.post("/summarize/article")
async def summarize_article(url: str = Body(...)):
    response = await summary_service.fetch_article_content(url)
    if response is None:
        raise HTTPException(
            status_code=404, detail="Failed to fetch the article content"
        )
    title = response.get("title")
    title = title if title else "Unknown Title"
    article_text = response.get("article_text")
    if not article_text:
        raise HTTPException(status_code=404, detail="Failed to extract article text")
    summary = await summary_service.text_summary(article_text)
    return ArticleSummaryResponse(
        title=title, article_text=article_text, summary_text=summary
    )
