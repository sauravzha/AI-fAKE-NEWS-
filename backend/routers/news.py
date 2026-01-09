from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
import sys
import os

# Add ml_engine to path to import detector
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '../../')))
from ml_engine.fake_news_model.detector import FakeNewsDetector

router = APIRouter(
    prefix="/analyze",
    tags=["analysis"]
)

class TextRequest(BaseModel):
    text: str

# Global instance to load model once on startup (lazy loading can also be done)
print("Initializing Fake News Model...")
try:
    news_detector = FakeNewsDetector()
except Exception as e:
    print(f"Failed to load model: {e}")
    news_detector = None

@router.post("/text")
async def analyze_text(request: TextRequest):
    if not news_detector:
        raise HTTPException(status_code=503, detail="Model not loaded")
    
    result = news_detector.analyze(request.text)
    return result
