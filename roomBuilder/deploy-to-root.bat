@echo off
echo 🚀 Deploying to GitHub Pages (root directory)...

REM Check if we're in the right directory
if not exist "package.json" (
    echo ❌ Error: Please run this script from the roomBuilder directory
    pause
    exit /b 1
)

REM Install dependencies
echo 📦 Installing dependencies...
call npm install

REM Create a temporary vite config for root deployment
echo 🔧 Creating root deployment config...
(
echo import { defineConfig } from 'vite'
echo.
echo export default defineConfig({
echo   base: "/",
echo   build: {
echo     outDir: "../dist",
echo     assetsDir: "assets",
echo     sourcemap: false,
echo     rollupOptions: {
echo       output: {
echo         manualChunks: {
echo           'three': ['three'],
echo           'firebase': ['firebase'],
echo           'google-genai': ['@google/genai']
echo         }
echo       }
echo     }
echo   }
echo })
) > vite.config.root.ts

REM Build with root config
echo 🔨 Building for root deployment...
copy vite.config.root.ts vite.config.ts
call npm run build

REM Copy files to repository root
echo 📁 Copying files to repository root...
cd ..
xcopy /E /I /Y roomBuilder\dist\* .

REM Ensure index.html is in root
if exist "roomBuilder\dist\index.html" (
    copy roomBuilder\dist\index.html .
)

REM Clean up
cd roomBuilder
del vite.config.root.ts

echo ✅ Files copied to repository root!
echo.
echo Next steps:
echo 1. git add .
echo 2. git commit -m "Deploy to GitHub Pages"
echo 3. git push origin main
echo.
echo Then go to your repository Settings → Pages
echo Select 'Deploy from a branch' → 'main' → '/ (root)'
pause
