# 🚀 GitHub Pages Deployment Guide

This guide will help you deploy your Room Builder app to GitHub Pages.

## 📋 Prerequisites

1. **GitHub Account**: Make sure you have a GitHub account
2. **Repository**: Your code should be in a GitHub repository
3. **Node.js**: Version 18 or higher installed locally

## 🔧 Setup Steps

### 1. Update Repository Name in Vite Config

**IMPORTANT**: Update the `base` path in `vite.config.ts` to match your repository name:

```typescript
export default defineConfig({
  base: '/YOUR_REPOSITORY_NAME/', // Replace with your actual repository name
  // ... rest of config
})
```

### 2. Install Dependencies

```bash
cd roomBuilder
npm install
```

### 3. Test Local Build

```bash
npm run build
```

This should create a `dist` folder with your built app.

## 🌐 Deployment Methods

### Method 1: GitHub Actions (Recommended)

1. **Push your code to GitHub**:
   ```bash
   git add .
   git commit -m "Add GitHub Pages deployment"
   git push origin main
   ```

2. **Enable GitHub Pages**:
   - Go to your repository on GitHub
   - Click on "Settings" tab
   - Scroll down to "Pages" section
   - Under "Source", select "GitHub Actions"
   - The workflow will automatically deploy when you push to main/master

### Method 2: Manual Deployment

1. **Build the project**:
   ```bash
   npm run build
   ```

2. **Install gh-pages**:
   ```bash
   npm install --save-dev gh-pages
   ```

3. **Deploy**:
   ```bash
   npm run deploy
   ```

4. **Enable GitHub Pages**:
   - Go to repository Settings → Pages
   - Select "Deploy from a branch"
   - Choose "gh-pages" branch
   - Select "/ (root)" folder

## 🔑 Environment Variables

For production deployment, you'll need to set up environment variables:

### Firebase Configuration
Create a `.env.production` file in the `roomBuilder` directory:

```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

### Gemini API Key
Add to the same `.env.production` file:

```env
VITE_GEMINI_API_KEY=your_gemini_api_key
```

## 🛠️ Troubleshooting

### Common Issues:

1. **404 Errors**: Make sure the `base` path in `vite.config.ts` matches your repository name
2. **Assets Not Loading**: Check that all assets are in the `public` folder
3. **Environment Variables**: Ensure all required environment variables are set
4. **Build Failures**: Check the GitHub Actions logs for specific error messages

### Build Optimization:

The Vite config includes optimizations for:
- Code splitting for Three.js, Firebase, and Google GenAI
- Asset optimization
- Source map removal for production

## 📱 Custom Domain (Optional)

If you want to use a custom domain:

1. Add a `CNAME` file to the `public` folder with your domain
2. Update the GitHub Actions workflow to include the CNAME
3. Configure DNS settings with your domain provider

## 🔄 Continuous Deployment

Once set up, your app will automatically deploy whenever you:
- Push to the main/master branch
- Merge a pull request to main/master

## 📊 Monitoring

- Check deployment status in the "Actions" tab of your repository
- View your live site at: `https://yourusername.github.io/your-repository-name`

## 🎯 Next Steps

1. Update the repository name in `vite.config.ts`
2. Push your code to GitHub
3. Enable GitHub Pages in repository settings
4. Wait for the first deployment to complete
5. Share your live app! 🚀

---

**Need help?** Check the GitHub Actions logs or create an issue in your repository.
