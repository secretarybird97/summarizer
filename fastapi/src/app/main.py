import logging
from typing import Optional

import torch
from bs4 import BeautifulSoup
from models.summary_response import SummaryResponse
from playwright.async_api import async_playwright
from transformers import pipeline

from fastapi import Body, FastAPI, HTTPException

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

DEVICE = torch.device("cuda" if torch.cuda.is_available() else "cpu")
summarizer = pipeline("summarization", model="facebook/bart-large-cnn", device=DEVICE)


async def text_summary(text: str) -> str:
    try:
        return summarizer(text, max_length=100, min_length=5, do_sample=False)[0]["summary_text"]  # type: ignore
    except Exception as e:
        logger.error(f"Error summarizing text: {e}")
        raise HTTPException(status_code=500, detail="Error during text summarization")


async def fetch_article_content(url: str) -> Optional[str]:
    async with async_playwright() as p:
        browser = await p.chromium.launch(
            headless=True, args=["--no-sandbox", "--disable-setuid-sandbox"]
        )
        page = await browser.new_page()
        try:
            await page.route(
                "**/*",
                lambda route: (
                    route.abort()
                    if route.request.resource_type in ["image", "stylesheet", "font"]
                    else route.continue_()
                ),
            )

            await page.goto(url, wait_until="domcontentloaded")
            # await page.wait_for_selector("body", timeout=10000)

            content = await page.content()
            soup = BeautifulSoup(content, "html.parser")

            selectors = [
                "article",
                ".post-content",
                "#main-content",
                ".entry-content",
                ".content-area",
            ]

            for selector in selectors:
                article_content = soup.select_one(selector)
                if article_content:
                    paragraphs = article_content.find_all("p")
                    article_text = " ".join(
                        p.get_text().strip() for p in paragraphs if p.get_text().strip()
                    )
                    if article_text:
                        return article_text

            article_content = soup.find("div", class_="article-body") or soup.find(
                "div", class_="content"
            )

            if article_content and not isinstance(article_content, str):
                paragraphs = article_content.find_all(["p", "div"])
                article_text = " ".join(
                    p.get_text().strip() for p in paragraphs if p.get_text().strip()
                )
                if article_text:
                    return article_text

            logger.warning("Using fallback extraction of visible text")
            visible_text = soup.get_text(separator=" ", strip=True)
            if visible_text:
                return visible_text

            logger.error("Article content not found")
            return None
        except Exception as e:
            logger.error(f"Error fetching article: {e}")
            raise HTTPException(status_code=400, detail="Failed to fetch the article")
        finally:
            await browser.close()


app = FastAPI()


@app.post("/summarize/text")
async def summarize_text(text: str = Body(...)):
    summary = await text_summary(text)
    return SummaryResponse(summary_text=summary)


@app.post("/summarize/article")
async def summarize_article(url: str = Body(...)):
    article_text = await fetch_article_content(url)
    if article_text is None:
        raise HTTPException(
            status_code=404, detail="Failed to fetch the article content"
        )
    summary = await text_summary(article_text)
    return SummaryResponse(summary_text=summary)
