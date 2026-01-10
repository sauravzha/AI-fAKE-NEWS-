from fastapi import APIRouter, File, UploadFile, HTTPException
from fastapi.responses import JSONResponse
import shutil
import os
import sys
import uuid

# Add ml_engine path
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '../../')))

router = APIRouter(
    prefix="/analyze",
    tags=["analysis"]
)

# Setup upload directories
UPLOAD_DIR = "static/uploads"
ELA_DIR = "static/ela"
os.makedirs(UPLOAD_DIR, exist_ok=True)
os.makedirs(ELA_DIR, exist_ok=True)

# Initialize Detector
print("Initializing Fake Image Detector...")
try:
    from ml_engine.fake_image_model.detector import FakeImageDetector
    image_detector = FakeImageDetector()
except Exception as e:
    print(f"Failed to load Image Model (likely memory/dependency issue): {e}")
    image_detector = None


@router.post("/image")
async def analyze_image(file: UploadFile = File(...)):
    if not image_detector:
        raise HTTPException(status_code=503, detail="Image Model not loaded")

    # Generate unique filename
    file_extension = file.filename.split(".")[-1]
    unique_filename = f"{uuid.uuid4()}.{file_extension}"
    file_path = os.path.join(UPLOAD_DIR, unique_filename)

    # Save uploaded file
    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    # Analyze
    try:
        result = image_detector.analyze(file_path)
    except Exception as e:
        os.remove(file_path)
        raise HTTPException(status_code=500, detail=str(e))

    # Move ELA image if generated
    ela_url = None
    if result.get("ela_path"):
        ela_filename = os.path.basename(result["ela_path"])
        new_ela_path = os.path.join(ELA_DIR, ela_filename)
        shutil.move(result["ela_path"], new_ela_path)
        # Construct URL (assuming static mount)
        ela_url = f"/static/ela/{ela_filename}"
    
    # Return response
    return {
        "label": result.get("label"),
        "confidence": result.get("confidence"),
        "explanation": result.get("explanation"),
        "original_image": f"/static/uploads/{unique_filename}",
        "ela_image": ela_url
    }
