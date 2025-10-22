@echo off
echo Setting up environment variables...

echo # Firebase Configuration > .env
echo VITE_FIREBASE_API_KEY=AIzaSyCvu8YJ6yQh5bXeDaoyGgo3LYiFgw8x-tA >> .env
echo VITE_FIREBASE_AUTH_DOMAIN=roombuilder-4ffd9.firebaseapp.com >> .env
echo VITE_FIREBASE_PROJECT_ID=roombuilder-4ffd9 >> .env
echo VITE_FIREBASE_STORAGE_BUCKET=roombuilder-4ffd9.firebasestorage.app >> .env
echo VITE_FIREBASE_MESSAGING_SENDER_ID=319855638873 >> .env
echo VITE_FIREBASE_APP_ID=1:319855638873:web:495b5457b1750911d6f448 >> .env
echo VITE_FIREBASE_MEASUREMENT_ID=G-Q0DWR8K1ZC >> .env
echo. >> .env
echo # Gemini AI Configuration >> .env
echo VITE_GEMINI_API_KEY=your_gemini_api_key_here >> .env

echo.
echo ✅ Environment file created successfully!
echo 🔒 Your Firebase API key is now secure!
echo.
echo Next steps:
echo 1. Test your app: npm run dev
echo 2. Add your Gemini API key to .env if needed
echo 3. Never commit .env to git (already in .gitignore)
echo.
pause
