import torch
from transformers import AutoTokenizer, AutoModelForSequenceClassification
import numpy as np
from scipy.special import softmax

class FakeNewsDetector:
    def __init__(self):
        print("Loading Fake News Detection Model...")
        self.model_name = "hamzab/roberta-fake-news-classification"
        try:
            self.tokenizer = AutoTokenizer.from_pretrained(self.model_name)
            self.model = AutoModelForSequenceClassification.from_pretrained(self.model_name)
            self.model.eval()
            print("Model loaded successfully.")
        except Exception as e:
            print(f"Error loading model: {e}")
            raise e

    def analyze(self, text: str) -> dict:
        """
        Analyzes the text (including long documents) using sliding window chunking.
        Returns aggregated result (Real vs Fake).
        """
        if not text or not isinstance(text, str):
            return {"error": "Invalid input text"}

        # Tokenize without truncation first to get full length
        tokens = self.tokenizer(text, return_tensors="pt", truncation=False, padding=False)
        input_ids = tokens['input_ids'][0]
        attention_mask = tokens['attention_mask'][0]

        # Config
        MAX_LEN = 512
        STRIDE = 256  # Overlap
        
        chunk_probs = []

        # Sliding Window Logic
        if len(input_ids) <= MAX_LEN:
             # Short text: Process normally
             with torch.no_grad():
                outputs = self.model(input_ids.unsqueeze(0), attention_mask=attention_mask.unsqueeze(0))
                probs = softmax(outputs.logits[0].numpy())
                chunk_probs.append(probs)
        else:
            # Long text: Process in chunks
            for i in range(0, len(input_ids), STRIDE):
                # End of chunk
                end = min(i + MAX_LEN, len(input_ids))
                
                # Check if chunk is too small (e.g. just special tokens), skip if < 10 tokens unless it's the only chunk
                if end - i < 10 and len(chunk_probs) > 0:
                    break

                chunk_input_ids = input_ids[i:end].unsqueeze(0)
                chunk_mask = attention_mask[i:end].unsqueeze(0)

                # If chunk is shorter than MAX_LEN, model handles it fine (no padding needed for batch size 1)
                
                with torch.no_grad():
                    outputs = self.model(chunk_input_ids, attention_mask=chunk_mask)
                    probs = softmax(outputs.logits[0].numpy())
                    chunk_probs.append(probs)
                
                if end == len(input_ids):
                    break

        if not chunk_probs:
             return {"error": "Could not process text chunks."}

        # Aggregate probabilities (Average strategy)
        # chunk_probs is list of [fake_prob, real_prob] arrays
        avg_probs = np.mean(chunk_probs, axis=0)
        
        # Mapping: 0 -> Fake, 1 -> Real (for 'hamzab/roberta-fake-news-classification')
        fake_prob = float(avg_probs[0])
        real_prob = float(avg_probs[1])

        label = "Fake" if fake_prob > real_prob else "Real"
        confidence = max(fake_prob, real_prob)

        return {
            "label": label,
            "confidence": round(confidence * 100, 2),
            "probs": {
                "fake": round(fake_prob, 4),
                "real": round(real_prob, 4)
            },
            "explanation": f"Analyzed {len(chunk_probs)} segments. The model is {round(confidence * 100, 2)}% confident this content is {label}."
        }
