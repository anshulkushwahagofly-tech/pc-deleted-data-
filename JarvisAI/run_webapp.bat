@echo off
title Jarvis Web Server
echo Starting Jarvis Web App...
for /f "tokens=14" %%a in ('ipconfig ^| findstr IPv4') do set _IP=%%a
echo.
echo ===================================================
echo [1] PC par chalane ke liye browser mein kholen: http://127.0.0.1:5000
echo [2] MOBILE par chalane ke liye mobile browser mein kholen: http://%_IP%:5000
echo (Dhyan rahe, PC aur Mobile ek hi WiFi se connected hone chahiye)
echo ===================================================
echo.
"%LOCALAPPDATA%\Programs\Python\Python312\python.exe" app.py
pause
