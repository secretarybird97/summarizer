import logging

import torch
from pydantic import BaseModel
from transformers import pipeline
from utils.summary_service import SummaryService

from fastapi import Body, FastAPI, HTTPException


class TextSummaryResponse(BaseModel):
    summary_text: str


class ArticleSummaryResponse(BaseModel):
    article_text: str
    summary_text: str


logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
summarizer = pipeline(
    "summarization", model="facebook/bart-large-cnn", device=device, framework="pt"
)

summary_service = SummaryService(summarizer, logger)

app = FastAPI()


@app.post("/summarize/text")
async def summarize_text(text: str = Body(...)):
    summary = await summary_service.text_summary(text)
    return TextSummaryResponse(summary_text=summary)


@app.post("/summarize/article")
async def summarize_article(url: str = Body(...)):
    article_text = await summary_service.fetch_article_content(url)
    if article_text is None:
        raise HTTPException(
            status_code=404, detail="Failed to fetch the article content"
        )
    summary = await summary_service.text_summary(article_text)
    return ArticleSummaryResponse(article_text=article_text, summary_text=summary)
