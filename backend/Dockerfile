# official python image
FROM python:3.10

# working directory set to /app
WORKDIR /app

# Copy backend files to /app
COPY . /app

RUN apt-get update && apt-get install -y netcat-openbsd

# Install dependencies
RUN pip install --no-cache-dir -r requirements.txt

# backend port expose
EXPOSE 8000

# Run FastAPI app with Uvicorn
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
