@echo off
SETLOCAL EnableDelayedExpansion

TITLE Veritas AI Launcher

echo ===================================================
echo   Veritas AI - Fake News & Deepfake Detection
echo ===================================================

echo.
echo [1/4] Checking Python...
python --version >nul 2>&1
IF %ERRORLEVEL% NEQ 0 (
    echo Python is not installed or not in PATH.
    pause
    exit /b
)
echo Python found.

echo.
echo [2/4] Setting up Backend...
cd backend
if not exist "venv" (
    echo Creating virtual environment...
    python -m venv venv
)
call venv\Scripts\activate
echo Installing requirements...
pip install -r requirements.txt
if %errorlevel% neq 0 (
    echo Warning: Pip install failed. Continuing to try...
)

echo.
echo [3/4] Starting Backend (Background)...
start "Veritas AI Backend" cmd /k "cd backend && call venv\Scripts\activate && uvicorn main:app --reload --port 8000"
cd ..

echo.
echo [4/4] Setting up Frontend...
echo NOTE: Since your folder name contains '&', npm might fail.
echo We will try to run it. If it fails, please rename the folder.
cd frontend

echo Installing Frontend dependencies...
call npm install
echo Starting Frontend...
npm run dev

pause
