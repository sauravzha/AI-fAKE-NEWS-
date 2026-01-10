
try:
    from ml_engine.fake_news_model.detector import FakeNewsDetector
    print("Initializing Fake News Model...")
    news_detector = FakeNewsDetector()
except Exception as e:
    print(f"Failed to load model (likely memory/dependency issue): {e}")
    news_detector = None

router = APIRouter(
    prefix="/analyze",
    tags=["analysis"]
)

class TextRequest(BaseModel):
    text: str

@router.post("/text")
async def analyze_text(request: TextRequest):
    if news_detector is None:
        return {
            "verdict": "unavailable", 
            "confidence": 0.0,
            "message": "Model disabled due to deployment memory limits (Demo Mode)"
        }
    
    result = news_detector.analyze(request.text)
    return result

