@echo off
:loop
echo Starting tunnel...
npx localtunnel --port 5000 --subdomain jarvis-anshul
goto loop
