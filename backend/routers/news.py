
router = APIRouter(
    prefix="/analyze",
    tags=["analysis"]
)

class TextRequest(BaseModel):
    text: str

@router.post("/text")
async def analyze_text(request: TextRequest):
    return {
        "verdict": "demo", 
        "confidence": 0.0,
        "message": "Model disabled due to free-tier memory limits (Demo Mode)"
    }

