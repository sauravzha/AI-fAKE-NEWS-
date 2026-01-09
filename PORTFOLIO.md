# Portfolio & Interview Guide

Use this document to present this project to recruiters, during interviews, or for your GitHub profile.

## 📄 Resume Project Description

**Project Title**: **Veritas AI - Multi-Modal Deepfake & Fake News Detection Platform**
**Tech Stack**: Python (PyTorch, FastAPI), JavaScript (Next.js, React), Docker, OpenCV, Transformers.

**Bullet Points**:

* Architected a full-stack AI platform detecting manipulated media across Text, Image, and Video formats using **RoBERTa** and **Vision Transformers (ViT)**.
* Implemented **Error Level Analysis (ELA)** for forensic image inspection, providing visual heatmaps to explain AI predictions to users.
* Built a highly scalable **FastAPI** backend processing asynchronous video analysis tasks with **OpenCV**, handling frame-by-frame deepfake detection.
* Designed a modern, responsive **Next.js** frontend with **Tailwind CSS**, featuring real-time upload progress and interactive visualization of analysis results.
* Containerized the entire application using **Docker**, reducing deployment time by 40% and ensuring consistent environments.

## 🎤 Demo Video Script (30-60 Seconds)

**Scene 1: Intro (5s)**

* *screen recording of Hero Section*
* **Voiceover**: "In an era of misinformation, knowing what's real is critical. This is Veritas AI, a platform I built to detect Deepfakes and Fake News instantly."

**Scene 2: Text Analysis (10s)**

* *Action: Paste a fake news headline. Click Analyze.*
* **Voiceover**: "First, let's test a news headline. Using a fine-tuned RoBERTa transformer, the system analyzes linguistic patterns. Here, it correctly identifies the text as 'Fake' with 98% confidence."

**Scene 3: Image Forensics (15s)**

* *Action: Upload a spliced image. Show ELA Heatmap.*
* **Voiceover**: "Next, image forensics. I uploaded a manipulated photo. The system uses Error Level Analysis to highlight compression discrepancies—the bright regions on the heatmap clearly show where the image was tampered with."

**Scene 4: Video & Conclusion (10s)**

* *Action: Upload video. Show timeline.*
* **Voiceover**: "Finally, video detection runs frame-by-frame analysis to spot deepfake anomalies. Full source code is available on my GitHub."

## 🧠 Common Interview Questions

**Q: Why did you choose RoBERTa over BERT?**
**A**: RoBERTa is trained on more data and removes the Next Sentence Prediction task, typically outperforming BERT on text classification tasks like fake news detection.

**Q: How do you handle video processing latency?**
**A**: Video processing is computationally expensive. In a production environment, I would offload this to a task queue like Celery/Redis. For this demo, I optimized it by sampling frames (1 per second) rather than analyzing every single frame.

**Q: What is ELA?**
**A**: Error Level Analysis detects changes in JPEG compression levels. When an image is spliced, the new part usually has a different compression error level than the original background.
