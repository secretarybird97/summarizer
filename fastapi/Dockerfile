FROM python:3.12-slim

# Set working directory
WORKDIR /app

# set Environment variables
ENV HF_HOME=/app/.cache/huggingface

COPY . .

RUN pip install -r requirements.txt

# Create a non-root user
RUN addgroup --system --gid 1001 python && \
    adduser --system --uid 1001 python

RUN mkdir -p /app/.cache/huggingface && chown -R python:python /app/.cache/huggingface

USER python

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
