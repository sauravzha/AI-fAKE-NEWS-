from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter(
    prefix="/news",
    tags=["analysis"]
)

class TextRequest(BaseModel):
    text: str

@router.post("/analyze")
async def analyze_text(request: TextRequest):
    return {
        "verdict": "demo", 
        "confidence": 0.0,
        "message": "Model disabled due to free-tier memory limits (Demo Mode)"
    }

