from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from routers import news, images, video
import os

app = FastAPI(
    title="AI Fake News & Deepfake Detection Platform API",
    description="API for detecting fake news, manipulated images, and deepfakes.",
    version="0.1.0"
)

# Static directory
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
STATIC_DIR = os.path.join(BASE_DIR, "static")
os.makedirs(STATIC_DIR, exist_ok=True)

# CORS (PUBLIC)
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "https://ai-fake-news-nrt5.vercel.app",
        "https://ai-fake-news-ygr0.onrender.com",
        "http://localhost:3000", # Added for local testing
    ],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Static files
app.mount("/static", StaticFiles(directory=STATIC_DIR), name="static")

# Routers
app.include_router(news.router)
app.include_router(images.router)
app.include_router(video.router)

@app.get("/")
async def root():
    return {"message": "API running", "status": "active"}

@app.get("/health")
async def health_check():
    return {"status": "healthy"}
