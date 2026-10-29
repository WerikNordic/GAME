@echo off
cd /d "%~dp0"
if not exist "node_modules\electron\dist\electron.exe" (
  where node >nul 2>nul || (echo Instale o Node.js em https://nodejs.org e rode de novo. & pause & exit /b)
  call npm install
)
powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0criar-atalho.ps1"
echo.
echo Pronto! Use o atalho "Eldvar" na Area de Trabalho (2 cliques para jogar).
timeout /t 4 >nul
