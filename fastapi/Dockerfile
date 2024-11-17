FROM python:3.12-slim

# Set working directory
WORKDIR /app

# set Environment variables
ENV HF_HOME=/app/.cache/huggingface

COPY . .

RUN pip install -r requirements.txt

RUN playwright install --with-deps chromium

RUN mkdir -p /app/.cache/huggingface

RUN python -c "from transformers import pipeline; pipeline('summarization', model='facebook/bart-large-cnn')"

CMD ["fastapi", "run", "src/app/main.py"]
