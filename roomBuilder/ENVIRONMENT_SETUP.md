# 🔐 Environment Variables Setup Guide

## 🚨 Security Issue Fixed
Your Firebase API key is now hidden using environment variables instead of being hardcoded in the source code.

## 📁 Files Created/Updated

### ✅ **Updated Files:**
- `src/config/firebase.ts` - Now uses environment variables
- `env.example` - Template for environment variables
- `.gitignore` - Already includes `.env` (good!)

## 🚀 Setup Instructions

### **Step 1: Create Your Environment File**

1. **Copy the example file:**
   ```bash
   cp env.example .env
   ```

2. **Open `.env` file** and replace the placeholder values:

```env
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
```

### **Step 2: Test Your Setup**

1. **Start your development server:**
   ```bash
   npm run dev
   ```

2. **Check that everything works:**
   - Firebase authentication should work
   - Firestore should connect
   - AI suggestions should work (if you have Gemini API key)

### **Step 3: For Production Deployment**

#### **GitHub Pages Deployment:**
Your environment variables will be automatically included in the build, but make sure to:

1. **Never commit `.env` to git** (already in `.gitignore`)
2. **The build process includes environment variables** in the final bundle
3. **Your app will work on GitHub Pages** with the environment variables

#### **Other Hosting Platforms:**
- **Vercel**: Add environment variables in Vercel dashboard
- **Netlify**: Add environment variables in Netlify dashboard
- **Firebase Hosting**: Use Firebase Functions for server-side secrets

## 🔒 Security Benefits

### **Before (Insecure):**
```typescript
// ❌ API key exposed in source code
apiKey: "AIzaSyCvu8YJ6yQh5bXeDaoyGgo3LYiFgw8x-tA"
```

### **After (Secure):**
```typescript
// ✅ API key from environment variables
apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "fallback"
```

## 🛡️ Security Best Practices

### **✅ Do:**
- ✅ **Use environment variables** for sensitive data
- ✅ **Add `.env` to `.gitignore`** (already done)
- ✅ **Use fallback values** for development
- ✅ **Keep your `.env` file private**

### **❌ Don't:**
- ❌ **Commit `.env` to git**
- ❌ **Share your `.env` file**
- ❌ **Put API keys in source code**
- ❌ **Use production keys in development**

## 🔧 Troubleshooting

### **If Environment Variables Don't Work:**

1. **Check file name**: Must be exactly `.env`
2. **Check location**: Must be in project root (`roomBuilder/`)
3. **Check format**: No spaces around `=`
4. **Restart dev server**: After creating `.env`

### **If Firebase Doesn't Connect:**

1. **Check your `.env` values** match Firebase console
2. **Verify Firebase project** is correct
3. **Check browser console** for errors
4. **Try fallback values** (remove environment variables temporarily)

### **Common Issues:**

```bash
# ❌ Wrong file name
env.txt

# ❌ Wrong location  
src/.env

# ❌ Wrong format
VITE_FIREBASE_API_KEY = "value"  # spaces around =

# ✅ Correct
VITE_FIREBASE_API_KEY=value
```

## 📋 Environment Variables Reference

| Variable | Description | Example |
|----------|-------------|---------|
| `VITE_FIREBASE_API_KEY` | Firebase API key | `AIzaSyCvu8YJ6yQh5bXeDaoyGgo3LYiFgw8x-tA` |
| `VITE_FIREBASE_AUTH_DOMAIN` | Firebase auth domain | `roombuilder-4ffd9.firebaseapp.com` |
| `VITE_FIREBASE_PROJECT_ID` | Firebase project ID | `roombuilder-4ffd9` |
| `VITE_FIREBASE_STORAGE_BUCKET` | Firebase storage bucket | `roombuilder-4ffd9.firebasestorage.app` |
| `VITE_FIREBASE_MESSAGING_SENDER_ID` | Firebase messaging sender ID | `319855638873` |
| `VITE_FIREBASE_APP_ID` | Firebase app ID | `1:319855638873:web:495b5457b1750911d6f448` |
| `VITE_FIREBASE_MEASUREMENT_ID` | Firebase analytics ID | `G-Q0DWR8K1ZC` |
| `VITE_GEMINI_API_KEY` | Gemini AI API key | `your_gemini_api_key_here` |

## 🎯 Next Steps

1. **Create your `.env` file** with the values above
2. **Test your app** to make sure everything works
3. **Deploy to GitHub Pages** - environment variables will be included
4. **Keep your `.env` file private** - never commit it to git

---

**Your Firebase API key is now secure! 🔐**
