@echo off
echo ========================================================
echo   CONFIGURER GITHUB POUR BUSINESS-IDEAS-SCORER
echo ========================================================
echo.
echo 1. Creez un NOUVEAU repository vide sur https://github.com/new
echo 2. Copiez l'URL HTTPS (ex: https://github.com/votre-nom/business-ideas.git)
echo.
set /p REPO_URL="Collez l'URL ici et faites Entree : "

if "%REPO_URL%"=="" goto error

echo.
echo Configuration du remote...
git remote add origin %REPO_URL%
git branch -M main

echo.
echo Envoi vers GitHub...
git push -u origin main

echo.
echo ========================================================
echo   TERMINÉ !
echo ========================================================
pause
exit

:error
echo Erreur : URL manquante. Relancez le script.
pause
