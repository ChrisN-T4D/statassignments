FROM python:3.11-slim

WORKDIR /app

RUN apt-get update && apt-get install -y \
    gcc \
    && rm -rf /var/lib/apt/lists/*

# Build context is repo root on Railway (dockerfilePath: backend/Dockerfile)
COPY backend/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY backend/ .
COPY scripts/seed-data ./seed-data

ENV PORT=8000

EXPOSE 8000

HEALTHCHECK --interval=30s --timeout=3s --start-period=10s --retries=3 \
    CMD sh -c "python -c \"import os, urllib.request; urllib.request.urlopen('http://127.0.0.1:' + os.getenv('PORT', '8000') + '/health')\"" || exit 1

CMD ["sh", "-c", "if [ \"$RUN_PB_MIGRATE\" = \"1\" ]; then echo 'Running PocketBase migration...' && python scripts/migrate_from_pocketbase.py; fi && uvicorn main:app --host 0.0.0.0 --port ${PORT:-8000}"]
