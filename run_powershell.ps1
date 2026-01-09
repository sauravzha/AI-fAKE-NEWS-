$ErrorActionPreference = "Stop"

Write-Host "Veritas AI: Taking safe startup path..." -ForegroundColor Cyan

# 1. Backend
Write-Host "Starting Backend..." -ForegroundColor Green
Start-Process -FilePath "cmd.exe" -ArgumentList "/k cd backend && pip install -r requirements.txt && uvicorn main:app --reload --port 8000" -WorkingDirectory $PSScriptRoot

# 2. Frontend
Write-Host "Starting Frontend..." -ForegroundColor Green
$FrontendPath = Join-Path $PSScriptRoot "frontend"
Set-Location -LiteralPath $FrontendPath

# Clean node_modules if they exist and are broken
# if (Test-Path "node_modules") { Remove-Item "node_modules" -Recurse -Force }

Write-Host "Installing NPM dependencies..."
# Using cmd /c to wrap the npm command can sometimes help with path parsing
cmd /c "npm install"

Write-Host "Running Dev Server..."
cmd /c "npm run dev"
