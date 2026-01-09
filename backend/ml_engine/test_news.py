import sys
import os

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from fake_news_model.detector import FakeNewsDetector

def test_detector():
    print("Initializing detector...")
    detector = FakeNewsDetector()
    
    real_news = "NASA's Perseverance rover has successfully landed on Mars, marking a new era of exploration."
    fake_news = "Aliens have landed in Times Square today and are distributing free pizza to everyone!"
    
    print(f"\nTesting Real News: {real_news}")
    result_real = detector.analyze(real_news)
    print("Result:", result_real)
    
    print(f"\nTesting Fake News: {fake_news}")
    result_fake = detector.analyze(fake_news)
    print("Result:", result_fake)

if __name__ == "__main__":
    test_detector()
