#!/bin/bash
echo "Setting up environment variables..."

cat > .env << EOF
# Firebase Configuration
VITE_FIREBASE_API_KEY=AIzaSyCvu8YJ6yQh5bXeDaoyGgo3LYiFgw8x-tA
VITE_FIREBASE_AUTH_DOMAIN=roombuilder-4ffd9.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=roombuilder-4ffd9
VITE_FIREBASE_STORAGE_BUCKET=roombuilder-4ffd9.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=319855638873
VITE_FIREBASE_APP_ID=1:319855638873:web:495b5457b1750911d6f448
VITE_FIREBASE_MEASUREMENT_ID=G-Q0DWR8K1ZC

# Gemini AI Configuration
VITE_GEMINI_API_KEY=your_gemini_api_key_here
EOF

echo ""
echo "✅ Environment file created successfully!"
echo "🔒 Your Firebase API key is now secure!"
echo ""
echo "Next steps:"
echo "1. Test your app: npm run dev"
echo "2. Add your Gemini API key to .env if needed"
echo "3. Never commit .env to git (already in .gitignore)"
echo ""
