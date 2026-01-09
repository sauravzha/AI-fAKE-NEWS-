@echo off
SETLOCAL EnableDelayedExpansion

TITLE Veritas AI Launcher (Fix)

echo ===================================================
echo   Veritas AI - Safe Launcher
echo ===================================================

echo.
echo [1/4] Starting Backend...
cd backend
if not exist "venv" (
    python -m venv venv
)
call venv\Scripts\activate
pip install -r requirements.txt
start "Veritas Backend" cmd /k "uvicorn main:app --reload --port 8000"
cd ..

echo.
echo [2/4] Setting up Frontend via Junction...
REM Create a junction if it doesn't exist to bypass special chars
if not exist "%USERPROFILE%\Desktop\VeritasFrontend" (
    mklink /J "%USERPROFILE%\Desktop\VeritasFrontend" "%~dp0frontend"
)

echo.
echo [3/4] Installing & Starting Frontend...
cd /d "%USERPROFILE%\Desktop\VeritasFrontend"
call npm install
echo.
echo Starting Next.js...
npm run dev

pause
