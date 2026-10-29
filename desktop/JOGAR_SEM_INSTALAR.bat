@echo off
cd /d "%~dp0"
where node >nul 2>nul || (echo Instale o Node.js em https://nodejs.org & pause & exit /b)
if not exist "node_modules\electron\dist\electron.exe" call npm install
powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0criar-atalho.ps1" >nul 2>nul
call npm start
