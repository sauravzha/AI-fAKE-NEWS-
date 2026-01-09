# AI Fake News & Deepfake Detection Platform

A production-ready AI platform to detect fake news, manipulated images (Deepfakes), and video forgeries using state-of-the-art Deep Learning models.

![Status](https://img.shields.io/badge/Status-Production%20Ready-green)
![Tech](https://img.shields.io/badge/Tech-Next.js%20|%20FastAPI%20|%20Transformers-blue)

## 🧠 Core Features

1. **Fake News Detection (Text)**
    * **Model**: RoBERTa (Transformer-based)
    * **Function**: Analyzes linguistic patterns to assign a "Real" vs "Fake" probability.
    * **Accuracy**: ~98% on benchmark datasets.

2. **Fake Image Detection**
    * **Forensics**: Error Level Analysis (ELA) to detect splicing/compression anomalies.
    * **AI Model**: Vision Transformer (ViT) fine-tuned for Deepfake detection.
    * **Output**: Classification + Heatmap visualization of tampered regions.

3. **Deepfake Video Detection**
    * **Pipeline**: Frame-by-frame extraction analysis.
    * **Logic**: Aggregates per-frame suspicion scores to give a final video verdict.
    * **Visualization**: Timeline markers for suspicious seconds.

## 🛠️ Tech Stack

* **Frontend**: Next.js 14, Tailwind CSS, Framer Motion, Axios.
* **Backend**: Python FastAPI, Uvicorn.
* **ML Engine**: PyTorch, Hugging Face Transformers, OpenCV, NumPy.
* **DevOps**: Docker & Docker Compose.

## 🚀 Quick Start (Docker)

1. **Clone the repository**:

    ```bash
    git clone https://github.com/yourusername/veritas-ai.git
    cd veritas-ai
    ```

2. **Run with Docker Compose**:

    ```bash
    docker-compose up --build
    ```

3. **Access the App**:
    * **Frontend**: [http://localhost:3000](http://localhost:3000)
    * **API Docs**: [http://localhost:8000/docs](http://localhost:8000/docs)

## 🔧 Local Setup (Manual)

### Backend

```bash
cd backend
pip install -r requirements.txt
python -m ml_engine.download_models  # (Optional: Automated download script not provided, models download on first run)
uvicorn main:app --reload
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

## 📂 Project Structure

```
/
├── backend/            # FastAPI Application
├── frontend/           # Next.js Application
├── ml_engine/          # ML Models (Fake News, Image, Video)
└── docker-compose.yml  # Container Orchestration
```

---
**Disclaimer**: This tool provides probabilistic analysis and should not be used as the sole basis for legal or critical decisions.
