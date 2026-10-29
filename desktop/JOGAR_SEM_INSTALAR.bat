@echo off
where node >nul 2>nul || (echo Instale o Node.js em https://nodejs.org & pause & exit /b)
call npm install
call npm start
