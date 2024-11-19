# Summarizer

Summarizer is a simple tool that summarizes text. It uses the [Hugging Face Transformers](https://huggingface.co/docs/transformers/index) library to generate summaries.

To run a local demo of the app in a production-like environment, use the following command:

```bash
docker compose --profile prod up -d
```

> **Note: Starting the app may take a while as the bundle size is approximately 5GB.**

To stop the demo, run:

```bash
docker compose --profile prod down
```

## Setup

### Client

The client uses pnpm as its package manager. If pnpm is not installed, you can install it with the following commands:

```bash
corepack enable pnpm
# or
npm install -g pnpm
```

Once pnpm is installed, set up the client dependencies by running:

```bash
pnpm install
```

To start the client:

```bash
pnpm dev
```

### Server

The backend is built with .NET 8.0.

1. Download the .NET SDK from [here](https://dotnet.microsoft.com/download).
2. Set up the required environment variables. Refer to the .env.example file for a complete list.

Examples:

- On Linux:

```bash
export API_KEY=your_api_key
```

- On Windows:

```bash
set API_KEY=your_api_key
```

3. Run the server:

```bash
dotnet run
```

### FastAPI Setup

The FastAPI service powers text summarization and web scraping using Hugging Face Transformers and Playwright.

#### Recommended Approach: Docker

```bash
docker compose --profile fastapi up -d
```

#### Alternative Approach: Local Setup

1. Create a virtual environment:

2. Install the required Python dependencies:

```bash
pip install -r requirements.txt
```

3. Install Playwright and its dependencies:

```bash
playwright install --with-deps chromium
```

4. Run the FastAPI server:

```bash
fastapi run src/app/main.py
# Or for development
# fastapi dev src/app/main.py
```

### Database

To set up the database locally, Docker is required. Run the following commands:

**Start the database and admin interface:**

```bash
docker compose --profile adminer up -d
```

**Stop the database and admin interface:**

```bash
docker compose --profile adminer down
```

## License

This project is licensed under the **AGPLv3.0 License**. See the [LICENSE](LICENSE) file for more details.
