from fastapi import APIRouter, File, UploadFile, HTTPException
import shutil
import os
import sys
import uuid

# Add ml_engine path
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '../../')))
from ml_engine.deepfake_video_model.detector import DeepfakeVideoDetector

router = APIRouter(
    prefix="/analyze",
    tags=["analysis"]
)

# Setup upload directory
UPLOAD_DIR = "static/uploads/videos"
os.makedirs(UPLOAD_DIR, exist_ok=True)

# Initialize Detector
print("Initializing Video Detector...")
try:
    video_detector = DeepfakeVideoDetector()
except Exception as e:
    print(f"Failed to load Video Detector: {e}")
    video_detector = None

@router.post("/video")
async def analyze_video(file: UploadFile = File(...)):
    if not video_detector:
        raise HTTPException(status_code=503, detail="Video Model not loaded")

    # Generate unique filename
    file_extension = file.filename.split(".")[-1]
    unique_filename = f"{uuid.uuid4()}.{file_extension}"
    file_path = os.path.join(UPLOAD_DIR, unique_filename)

    # Save uploaded file
    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    # Analyze
    try:
        result = video_detector.analyze(file_path)
    except Exception as e:
        # os.remove(file_path) # Optionally keep for debug
        raise HTTPException(status_code=500, detail=str(e))

    return {
        "label": result.get("label"),
        "confidence": result.get("confidence"),
        "explanation": result.get("explanation"),
        "frame_markers": result.get("suspicious_seconds"),
        "video_url": f"/static/uploads/videos/{unique_filename}"
    }
