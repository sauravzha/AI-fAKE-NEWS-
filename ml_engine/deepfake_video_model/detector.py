import cv2
import os
import sys
from collections import Counter

# Add ml_engine path
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '../../')))
from ml_engine.fake_image_model.detector import FakeImageDetector

class DeepfakeVideoDetector:
    def __init__(self):
        print("Initializing Video Detector...")
        # Reuse the singleton logic or instantiate new. 
        # Ideally, we should inject the loaded image_detector to save memory.
        # For simplicity in this MVP, we re-instantiate (transformers caches model, so it's fast).
        self.image_detector = FakeImageDetector()

    def analyze(self, video_path: str) -> dict:
        if not os.path.exists(video_path):
            return {"error": "Video file not found"}

        cap = cv2.VideoCapture(video_path)
        frame_count = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))
        fps = cap.get(cv2.CAP_PROP_FPS)
        
        # Analyze max 20 frames to keep it responsive (approx 1 frame per second for 20s clip)
        max_frames_to_analyze = 20
        step = max(1, frame_count // max_frames_to_analyze)

        results = []
        suspicious_timestamps = []
        
        count = 0
        analyzed_frames = 0
        
        while cap.isOpened():
            ret, frame = cap.read()
            if not ret:
                break
                
            if count % step == 0:
                # Save frame temporarily
                temp_frame_path = f"temp_frame_{count}.jpg"
                cv2.imwrite(temp_frame_path, frame)
                
                # Analyze frame
                try:
                    res = self.image_detector.analyze(temp_frame_path)
                    if res.get('error'):
                        continue
                        
                    label = res['label']
                    conf = res['confidence']
                    results.append({'label': label, 'conf': conf})
                    
                    if label == "Fake" or label == "Fake Image": # Adjust based on model label
                         suspicious_timestamps.append(round(count / fps, 2))
                         
                except Exception as e:
                    print(f"Frame analysis failed: {e}")
                finally:
                    if os.path.exists(temp_frame_path):
                        os.remove(temp_frame_path)
                
                analyzed_frames += 1
                if analyzed_frames >= max_frames_to_analyze:
                    break
            
            count += 1
            
        cap.release()
        
        if not results:
            return {"error": "Could not analyze any frames"}
            
        # Aggregate results
        fake_count = sum(1 for r in results if r['label'] == 'Fake' or r['label'] == 'Fake Image' or r['label'] == 'fake')
        real_count = len(results) - fake_count
        
        final_label = "Deepfake" if fake_count > real_count else "Real"
        avg_confidence = sum(r['conf'] for r in results) / len(results)
        
        return {
            "label": final_label,
            "confidence": round(avg_confidence, 2),
            "analyzed_frames": analyzed_frames,
            "suspicious_seconds": suspicious_timestamps,
            "explanation": f"Analyzed {analyzed_frames} frames. Found {fake_count} suspicious frames."
        }
