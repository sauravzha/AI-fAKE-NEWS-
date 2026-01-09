import sys
import os
import cv2
import numpy as np

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))
from ml_engine.deepfake_video_model.detector import DeepfakeVideoDetector

def create_dummy_video(filename):
    # Create a 2-second dummy video
    fourcc = cv2.VideoWriter_fourcc(*'mp4v')
    out = cv2.VideoWriter(filename, fourcc, 20.0, (640, 480))
    for _ in range(40):
        frame = np.random.randint(0, 255, (480, 640, 3), dtype=np.uint8)
        out.write(frame)
    out.release()
    print(f"Created dummy video: {filename}")

def test_video_detector():
    print("Initializing Video Detector...")
    detector = DeepfakeVideoDetector()
    
    video_path = "test_video.mp4"
    if not os.path.exists(video_path):
        create_dummy_video(video_path)
    
    print(f"Testing with {video_path}...")
    try:
        result = detector.analyze(video_path)
        print("Result:", result)
    except Exception as e:
        print(f"Analysis Failed: {e}")
    finally:
        if os.path.exists(video_path):
            os.remove(video_path)

if __name__ == "__main__":
    test_video_detector()
