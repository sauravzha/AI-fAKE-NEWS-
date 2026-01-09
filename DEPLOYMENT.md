# 🚀 Veritas AI - Public Deployment Guide

This guide will help you deploy the "Veritas AI" platform so anyone on the internet can use it.
Because this app has two parts (Frontend & Backend), we will deploy them to two specialized free/cheap hosting services.

### 🏗 Architecture

* **Frontend (Next.js)** -> Deployed on **Vercel** (Best for Next.js, Free)
* **Backend (Python + ML)** -> Deployed on **Render** (Good for Python, Free tier available but Slow) or **Railway** (Better performance, minimal cost).

---

## Part 1: Deploying the Backend (API)

The backend runs the heavy AI models. It needs a server.

### Option A: Render (Free, but slow start)

1. Push your code to **GitHub**.
2. Go to [dashboard.render.com](https://dashboard.render.com) and sign up.
3. Click **New +** -> **Web Service**.
4. Connect your GitHub repository.
5. **Root Directory**: `backend` (Important! Tell Render to look inside the backend folder)
6. **Build Command**: `pip install -r requirements.txt`
7. **Start Command**: `uvicorn main:app --host 0.0.0.0 --port $PORT`
8. **Instance Type**: Free (Note: The ML models might crash the free tier due to RAM usage. If so, you need the "Starter" plan ~$7/mo).
9. Click **Create Web Service**.
10. Wait for it to deploy. Copy the **URL** (e.g., `https://veritas-ai-backend.onrender.com`).

### Option B: Railway (Recommended for AI)

1. Go to [railway.app](https://railway.app).
2. Login with GitHub and create a new project from your repo.
3. Set the Root Directory to `backend`.
4. Railway usually auto-detects Python.
5. Verified the Start Command is `uvicorn main:app --host 0.0.0.0 --port $PORT`.

---

## Part 2: Deploying the Frontend (UI)

Now we deploy the beautiful interface and connect it to your new backend.

1. Go to [vercel.com](https://vercel.com) and sign up.
2. Click **Add New...** -> **Project**.
3. Import your GitHub repository.
4. **Framework Preset**: Next.js (Auto-detected).
5. **Root Directory**: Click "Edit" and select `frontend`.
6. **Environment Variables**:
    * We need to tell the frontend where the backend lives.
    * Add a variable named: `NEXT_PUBLIC_API_URL`
    * Value: Your Backend URL from Part 1 (e.g., `https://veritas-ai-backend.onrender.com`).
    * *Note: Do not add a trailing slash `/` at the end.*
7. Click **Deploy**.

---

## Part 3: Connecting Them

1. Once Vercel finishes, you will get a domain like `veritas-ai.vercel.app`.
2. Open it!
3. Try an analysis.
    * The frontend will send the text/image to your Render/Railway backend.
    * **Note on Cold Starts**: On the free tier of Render, the backend "sleeps" after 15 mins of inactivity. The first request might take 30-50 seconds to wake it up. This is normal for free hosting.

## ✅ Done

Share your Vercel URL with friends. They can now use Veritas AI from their phones or laptops.
