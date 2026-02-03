@echo off
echo ========================================================
echo   CORRECTION AUTHENTIFICATION GITHUB
echo ========================================================
echo.
echo L'erreur 403 signifie que l'ordinateur utilise de vieux
echo identifiants ou pas les bons.
echo.
echo Nous allons forcer la demande de mot de passe.
echo.

:: 1. On configure l'URL avec le nom d'utilisateur explicite
git remote set-url origin https://StudioDescartes@github.com/StudioDescartes/studio_descartes_app.git

:: 2. On tente le push nouveau
echo Tentative de connexion...
echo Une fenetre de connexion va peut-etre s'ouvrir.
echo Si on vous demande un mot de passe, utilisez votre "Personal Access Token" 
echo (ou connectez-vous via le navigateur si propose).
echo.
git push -u origin main

echo.
if %errorlevel% neq 0 (
    echo ECHEC : Toujours bloqué.
    echo Solution de secours : 
    echo 1. Allez sur le site GitHub dans votre repo.
    echo 2. Cliquez sur "Add file" > "Upload files".
    echo 3. Glissez-deposez tout le dossier 'business-ideas-scorer'.
) else (
    echo SUCCES ! Votre code est sur GitHub.
)

pause
