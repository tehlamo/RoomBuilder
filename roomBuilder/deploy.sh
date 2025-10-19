#!/bin/bash

# GitHub Pages Deployment Script for Room Builder
echo "🚀 Starting GitHub Pages deployment..."

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: Please run this script from the roomBuilder directory"
    exit 1
fi

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Build the project
echo "🔨 Building project..."
npm run build

# Check if build was successful
if [ ! -d "dist" ]; then
    echo "❌ Error: Build failed - dist directory not found"
    exit 1
fi

echo "✅ Build completed successfully!"

# Check if gh-pages is installed
if ! npm list gh-pages > /dev/null 2>&1; then
    echo "📦 Installing gh-pages..."
    npm install --save-dev gh-pages
fi

# Deploy to GitHub Pages
echo "🌐 Deploying to GitHub Pages..."
npm run deploy

echo "🎉 Deployment completed!"
echo "Your app should be available at: https://yourusername.github.io/your-repository-name"
echo ""
echo "Next steps:"
echo "1. Go to your repository Settings → Pages"
echo "2. Select 'Deploy from a branch'"
echo "3. Choose 'gh-pages' branch"
echo "4. Select '/ (root)' folder"
echo "5. Save and wait for deployment"
