from fastapi import APIRouter, File, UploadFile
import os
import shutil
import uuid

router = APIRouter(
    prefix="/video",
    tags=["analysis"]
)

# Setup upload directory
UPLOAD_DIR = "static/uploads/videos"
os.makedirs(UPLOAD_DIR, exist_ok=True)

@router.post("/analyze")
async def analyze_video(file: UploadFile = File(...)):
    # Generate unique filename to simulate saving for demo
    file_extension = file.filename.split(".")[-1]
    unique_filename = f"{uuid.uuid4()}.{file_extension}"
    # We don't even need to save the file if we aren't processing it, 
    # but let's save it to keep the URL valid for the frontend demo.
    file_path = os.path.join(UPLOAD_DIR, unique_filename)
    
    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    return {
        "label": "Fake (Demo)",
        "confidence": 0.99,
        "explanation": "This is a demo response. The Deepfake Detection model is disabled on this free-tier deployment to prevent memory crashes.",
        "frame_markers": [1, 5, 12],
        "video_url": f"/static/uploads/videos/{unique_filename}"
    }
