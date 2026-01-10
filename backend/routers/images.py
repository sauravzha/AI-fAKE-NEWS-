from fastapi import APIRouter, File, UploadFile
from fastapi.responses import JSONResponse
import os
import shutil
import uuid

router = APIRouter(
    prefix="/images",
    tags=["analysis"]
)

# Setup upload directories
UPLOAD_DIR = "static/uploads"
ELA_DIR = "static/ela"
os.makedirs(UPLOAD_DIR, exist_ok=True)
os.makedirs(ELA_DIR, exist_ok=True)

@router.post("/analyze")
async def analyze_image(file: UploadFile = File(...)):
    # Generate unique filename
    file_extension = file.filename.split(".")[-1]
    unique_filename = f"{uuid.uuid4()}.{file_extension}"
    file_path = os.path.join(UPLOAD_DIR, unique_filename)

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    return {
        "label": "Real (Demo)",
        "confidence": 0.98,
        "explanation": "This is a demo response. The Image Detection model is disabled on this free-tier deployment to prevent memory crashes.",
        "original_image": f"/static/uploads/{unique_filename}",
        "ela_image": None # No ELA generation in demo mode
    }
