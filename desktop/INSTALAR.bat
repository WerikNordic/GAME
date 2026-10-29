@echo off
chcp 65001 >nul
echo === Eldvar: gerando instalador para Windows ===
where node >nul 2>nul || (echo Instale o Node.js em https://nodejs.org e rode de novo. & pause & exit /b)
call npm install
call npm run dist
echo.
echo Pronto! O instalador esta na pasta "release".
pause
