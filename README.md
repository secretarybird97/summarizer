# Summarizer

Summarizer is a simple tool that summarizes text. It uses the [Hugging Face Transformers](https://huggingface.co/docs/transformers/index) library to generate summaries.

## Setup

Install the required dependencies by running:

### Client

The client uses pnpm as the package manager. You can install pnpm by running:

```bash
corepack enable pnpm
# or
npm install -g pnpm
```

Then install the dependencies by running:

```bash
pnpm install
```

To run the client, run:

```bash
pnpm dev
```

### Server

The backend is written in .NET 8.0. You can install the .NET SDK from [here](https://dotnet.microsoft.com/en-us/download).

Once installed, you can run the server by running:

```bash
# Don't forget to set environment variables before running, as dotnet doesn't support a .env file (e.g.)
# On Linux: export API_KEY=your_api_key
# On Windows: set API_KEY=your_api_key
# More info on .env.example.
dotnet run
```

### FastAPI

The FastAPI server is written in Python 3.10. First, create a virtual environment, and then install the dependencies by running:

```bash
pip install -r requirements.txt
```

Then, you can run the server by running:

```bash
fastapi run src/app/main.py
# or
fastapi dev src/app/main.py
```

### Database

To run the database, you need to have Docker installed.

```bash
docker compose --profile adminer up -d
```

To stop the database, run:

```bash
docker compose --profile adminer down
```

## License

This project is licensed under the AGPLv3.0 License - see the [LICENSE](LICENSE) file for details.
