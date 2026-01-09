import torch
from transformers import AutoImageProcessor, AutoModelForImageClassification
from PIL import Image
import os
import sys

# Add path for internal imports if needed
sys.path.append(os.path.dirname(__file__))
from ela import convert_to_ela_image

class FakeImageDetector:
    def __init__(self):
        print("Loading Fake Image Detection Model...")
        self.model_name = "dima806/deepfake_vs_real_image_detection" # Using a ViT based model
        try:
            self.processor = AutoImageProcessor.from_pretrained(self.model_name)
            self.model = AutoModelForImageClassification.from_pretrained(self.model_name)
            self.model.eval()
            print("Image model loaded successfully.")
        except Exception as e:
            print(f"Error loading image model: {e}")
            raise e

    def analyze(self, image_path: str) -> dict:
        """
        Analyzes the image for manipulation.
        Returns: Label, Confidence, and path to ELA heatmap.
        """
        if not os.path.exists(image_path):
            return {"error": "Image file not found"}

        # 1. Error Level Analysis (ELA)
        try:
            ela_path = convert_to_ela_image(image_path, 90)
        except Exception as e:
            print(f"ELA failed: {e}")
            ela_path = None

        # 2. AI Classification
        try:
            image = Image.open(image_path).convert("RGB")
            inputs = self.processor(images=image, return_tensors="pt")

            with torch.no_grad():
                outputs = self.model(**inputs)
                logits = outputs.logits
                predicted_class_idx = logits.argmax(-1).item()
                probs = torch.softmax(logits, dim=-1)
                confidence = probs[0][predicted_class_idx].item()
                
                # Verify label mapping from model config
                # Usually id2label = {0: 'Fake', 1: 'Real'} or similar. 
                # For dima806/deepfake_vs_real_image_detection: 0: Real, 1: Fake (CHECK THIS via config usually)
                # Let's trust the model's id2label for now if available
                label = self.model.config.id2label[predicted_class_idx]
                
        except Exception as e:
            return {"error": f"AI Analysis failed: {e}"}

        return {
            "label": label,
            "confidence": round(confidence * 100, 2),
            "ela_path": ela_path,
            "explanation": f"The AI model detected this image as {label} with {round(confidence*100, 2)}% confidence."
        }
