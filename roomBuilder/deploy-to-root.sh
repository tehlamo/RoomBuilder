#!/bin/bash

# Deploy to GitHub Pages (root directory)
echo "🚀 Deploying to GitHub Pages (root directory)..."

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: Please run this script from the roomBuilder directory"
    exit 1
fi

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Create a temporary vite config for root deployment
echo "🔧 Creating root deployment config..."
cat > vite.config.root.ts << 'EOF'
import { defineConfig } from 'vite'

export default defineConfig({
  base: "/",
  build: {
    outDir: "../dist",
    assetsDir: "assets",
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          'three': ['three'],
          'firebase': ['firebase'],
          'google-genai': ['@google/genai']
        }
      }
    }
  }
})
EOF

# Build with root config
echo "🔨 Building for root deployment..."
cp vite.config.root.ts vite.config.ts
npm run build

# Copy files to repository root
echo "📁 Copying files to repository root..."
cd ..
cp -r roomBuilder/dist/* .

# Ensure index.html is in root
if [ -f roomBuilder/dist/index.html ]; then
    cp roomBuilder/dist/index.html .
fi

# Clean up
cd roomBuilder
rm vite.config.root.ts

echo "✅ Files copied to repository root!"
echo ""
echo "Next steps:"
echo "1. git add ."
echo "2. git commit -m 'Deploy to GitHub Pages'"
echo "3. git push origin main"
echo ""
echo "Then go to your repository Settings → Pages"
echo "Select 'Deploy from a branch' → 'main' → '/ (root)'"
