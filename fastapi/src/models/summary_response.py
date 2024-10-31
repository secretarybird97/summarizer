from pydantic import BaseModel


class SummaryResponse(BaseModel):
    summary_text: str
