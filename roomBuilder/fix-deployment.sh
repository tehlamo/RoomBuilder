#!/bin/bash

echo "🔧 Fixing GitHub Pages deployment..."

# Backup current vite config
echo "📋 Backing up current config..."
cp vite.config.ts vite.config.backup.ts

# Use root deployment config
echo "🔄 Switching to root deployment config..."
cp vite.config.root.ts vite.config.ts

# Build for root deployment
echo "🔨 Building for root deployment..."
npm run build

# Copy files to repository root
echo "📁 Copying files to repository root..."
cd ..
cp -r roomBuilder/dist/* .

# Restore original config
echo "🔄 Restoring original config..."
cd roomBuilder
cp vite.config.backup.ts vite.config.ts
rm vite.config.backup.ts

echo "✅ Deployment files ready!"
echo ""
echo "Next steps:"
echo "1. git add ."
echo "2. git commit -m 'Fix GitHub Pages deployment'"
echo "3. git push origin main"
echo ""
echo "Then configure GitHub Pages:"
echo "- Go to repository Settings → Pages"
echo "- Source: 'Deploy from a branch'"
echo "- Branch: 'main'"
echo "- Folder: '/ (root)'"
echo "- Save"
