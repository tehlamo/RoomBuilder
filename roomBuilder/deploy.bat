@echo off
echo 🚀 Starting GitHub Pages deployment...

REM Check if we're in the right directory
if not exist "package.json" (
    echo ❌ Error: Please run this script from the roomBuilder directory
    pause
    exit /b 1
)

REM Install dependencies
echo 📦 Installing dependencies...
call npm install

REM Build the project
echo 🔨 Building project...
call npm run build

REM Check if build was successful
if not exist "dist" (
    echo ❌ Error: Build failed - dist directory not found
    pause
    exit /b 1
)

echo ✅ Build completed successfully!

REM Check if gh-pages is installed
call npm list gh-pages >nul 2>&1
if errorlevel 1 (
    echo 📦 Installing gh-pages...
    call npm install --save-dev gh-pages
)

REM Deploy to GitHub Pages
echo 🌐 Deploying to GitHub Pages...
call npm run deploy

echo 🎉 Deployment completed!
echo Your app should be available at: https://yourusername.github.io/your-repository-name
echo.
echo Next steps:
echo 1. Go to your repository Settings → Pages
echo 2. Select 'Deploy from a branch'
echo 3. Choose 'gh-pages' branch
echo 4. Select '/ (root)' folder
echo 5. Save and wait for deployment
pause
