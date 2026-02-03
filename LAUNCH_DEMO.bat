@echo off
echo ========================================================
echo   LANCEMENT DU DASHBOARD STUDIO DESCARTES
echo ========================================================
echo.
echo Démarrage du serveur en cours... Veuillez patienter.
echo Une fois prêt, la page s'ouvrira automatiquement.
echo.
echo (Ne fermez pas cette fenetre noire tant que vous presentez)
echo.

cd /d "%~dp0"

:: Start the server in the background
start /b npm run dev

:: Wait 10 seconds for the server to initialize
timeout /t 10 >nul

:: Open the browser
start http://localhost:3000

echo.
echo Le Dashboard est ouvert !
echo.
pause
