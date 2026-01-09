import sys
import os

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))
from ml_engine.fake_image_model.detector import FakeImageDetector

def test_image_detector():
    print("Initializing Image Detector...")
    detector = FakeImageDetector()
    
    # You need a sample image here. 
    # For now, we will just check if model loads and handle missing file gracefullly
    test_image_path = "sample_image.jpg"
    
    print(f"Testing with {test_image_path}...")
    result = detector.analyze(test_image_path)
    print("Result:", result)
    
if __name__ == "__main__":
    test_image_detector()
