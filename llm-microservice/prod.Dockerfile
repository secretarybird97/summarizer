# Base image with Python installed
FROM python:3.10-slim as builder

# Set working directory
WORKDIR /app

# Install Poetry
RUN pip install poetry

# Copy only files needed for installing dependencies to leverage Docker cache
COPY poetry.lock pyproject.toml ./

# Disable virtualenv and install dependencies
RUN poetry config virtualenvs.create false && \
    poetry install --no-dev --no-interaction --no-ansi

# Copy project files
COPY ./llm_microservice ./llm_microservice

# Final image
FROM python:3.10-slim

# Create a non-root user
RUN addgroup --system --gid 1001 llm_microservice && \
    adduser --system --uid 1001 llm_microservice

# Set working directory
WORKDIR /app

# Copy installed packages and project files from builder
COPY --from=builder /app /app
COPY --from=builder /usr/local /usr/local

# Switch to non-root user
USER llm_microservice

# Command to run the application
CMD ["uvicorn", "llm_microservice.main:app", "--host", "0.0.0.0", "--port", "80"]
