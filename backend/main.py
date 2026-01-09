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

# Create static directories
os.makedirs("static", exist_ok=True)

# CORS Configuration
origins = [
    "http://localhost:3000",
    "http://localhost:8000",
    "http://127.0.0.1:3000"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Mount Static Files
app.mount("/static", StaticFiles(directory="static"), name="static")

# Include Routers
app.include_router(news.router)
app.include_router(images.router)
app.include_router(video.router)

@app.get("/")
async def root():
    return {"message": "Welcome to the AI Fake News Detection API", "status": "active"}

@app.get("/health")
async def health_check():
    return {"status": "healthy"}
