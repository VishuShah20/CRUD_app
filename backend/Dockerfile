# Use official Python image
FROM python:3.10

# Set working directory
WORKDIR /app

# Copy backend files
COPY . /app

RUN apt-get update && apt-get install -y netcat-openbsd

# Install dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Expose backend port
EXPOSE 8000

# Run FastAPI app with Uvicorn
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
