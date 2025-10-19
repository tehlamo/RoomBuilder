@echo off
echo 🔧 Fixing GitHub Pages deployment...

REM Backup current vite config
echo 📋 Backing up current config...
copy vite.config.ts vite.config.backup.ts

REM Use root deployment config
echo 🔄 Switching to root deployment config...
copy vite.config.root.ts vite.config.ts

REM Build for root deployment
echo 🔨 Building for root deployment...
call npm run build

REM Copy files to repository root
echo 📁 Copying files to repository root...
cd ..
xcopy /E /I /Y roomBuilder\dist\* .

REM Restore original config
echo 🔄 Restoring original config...
cd roomBuilder
copy vite.config.backup.ts vite.config.ts
del vite.config.backup.ts

echo ✅ Deployment files ready!
echo.
echo Next steps:
echo 1. git add .
echo 2. git commit -m "Fix GitHub Pages deployment"
echo 3. git push origin main
echo.
echo Then configure GitHub Pages:
echo - Go to repository Settings → Pages
echo - Source: "Deploy from a branch"
echo - Branch: "main"
echo - Folder: "/ (root)"
echo - Save
pause
