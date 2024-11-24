import asyncio
from concurrent.futures import ThreadPoolExecutor
from logging import Logger
from typing import Dict, Optional

from bs4 import BeautifulSoup
from playwright.async_api import async_playwright
from transformers import Pipeline

from fastapi import HTTPException


class SummaryService:
    def __init__(
        self, summarizer: Pipeline, logger: Logger, executor: ThreadPoolExecutor
    ):
        self.summarizer = summarizer
        self.logger = logger
        self.executor = executor

    async def text_summary(self, text: str) -> str:
        try:
            loop = asyncio.get_event_loop()
            summary = await loop.run_in_executor(
                self.executor,
                lambda: self.summarizer(
                    text, max_length=100, min_length=5, do_sample=False
                ),
            )
            return summary[0]["summary_text"]  # type: ignore
        except Exception as e:
            self.logger.error(f"Error summarizing text: {e}")
            if(len(text)>3700):
                raise HTTPException(
                    status_code=500, detail="Text input should be at most 3700 characters"
                )
            raise HTTPException(
                status_code=500, detail="Error during text summarization"
            )

    async def fetch_article_content(
        self, url: str
    ) -> Optional[Dict[str, Optional[str]]]:
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
                        if route.request.resource_type
                        in ["image", "stylesheet", "font"]
                        else route.continue_()
                    ),
                )

                await page.goto(url, wait_until="domcontentloaded")
                # await page.wait_for_selector("body", timeout=10000)

                content = await page.content()
                soup = BeautifulSoup(content, "html.parser")

                title = soup.title.string if soup.title else None
                if not title:
                    main_heading = soup.find("h1")
                    title = main_heading.get_text().strip() if main_heading else None

                selectors = [
                    "article",
                    ".post-content",
                    "#main-content",
                    ".entry-content",
                    ".content-area",
                ]

                article_text = None
                for selector in selectors:
                    article_content = soup.select_one(selector)
                    if article_content:
                        paragraphs = article_content.find_all("p")
                        article_text = " ".join(
                            p.get_text().strip()
                            for p in paragraphs
                            if p.get_text().strip()
                        )
                        if article_text:
                            break

                if not article_text:
                    article_content = soup.find(
                        "div", class_="article-body"
                    ) or soup.find("div", class_="content")

                    if article_content and not isinstance(article_content, str):
                        paragraphs = article_content.find_all(["p", "div"])
                        article_text = " ".join(
                            p.get_text().strip()
                            for p in paragraphs
                            if p.get_text().strip()
                        )

                if not article_text:
                    self.logger.warning("Using fallback extraction of visible text")
                    visible_text = soup.get_text(separator=" ", strip=True)
                    article_text = visible_text if visible_text else None

                if not article_text:
                    self.logger.error("Article content not found")
                    return None

                return {"title": title, "article_text": article_text}
            except Exception as e:
                self.logger.error(f"Error fetching article: {e}")
                raise HTTPException(
                    status_code=400, detail="Failed to fetch the article"
                )
            finally:
                await browser.close()
