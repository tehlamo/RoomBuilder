# 🔧 Fix Google Login on GitHub Pages

## 🚨 Problem
Google login doesn't work on GitHub Pages because Firebase isn't configured for the new domain.

## ✅ Solution

### **Step 1: Update Firebase Authorized Domains**

1. **Go to Firebase Console**: https://console.firebase.google.com/
2. **Select your project**: `roombuilder-4ffd9`
3. **Go to Authentication → Settings**
4. **Click on "Authorized domains" tab**
5. **Add your GitHub Pages domain**:
   - `tehlamo.github.io`
   - `roombuilder-4ffd9.firebaseapp.com` (if not already there)

### **Step 2: Update Google OAuth Settings**

1. **Go to Google Cloud Console**: https://console.cloud.google.com/
2. **Select your project**: `roombuilder-4ffd9`
3. **Go to APIs & Services → Credentials**
4. **Find your OAuth 2.0 Client ID**
5. **Click "Edit"**
6. **Add authorized JavaScript origins**:
   - `https://tehlamo.github.io`
   - `https://roombuilder-4ffd9.firebaseapp.com`
7. **Add authorized redirect URIs**:
   - `https://tehlamo.github.io/__/auth/handler`
   - `https://roombuilder-4ffd9.firebaseapp.com/__/auth/handler`
8. **Save changes**

### **Step 3: Test the Configuration**

1. **Visit your GitHub Pages site**: https://tehlamo.github.io/RoomBuilder/
2. **Try to log in with Google**
3. **Check browser console** for any errors

### **Step 4: Common Issues & Solutions**

#### **Issue: "This app is not verified"**
- **Solution**: This is normal for development. Click "Advanced" → "Go to [app name] (unsafe)"

#### **Issue: "Error 400: redirect_uri_mismatch"**
- **Solution**: Make sure you added the correct redirect URIs in Google Cloud Console

#### **Issue: "Error 403: access_denied"**
- **Solution**: Check that your domain is added to Firebase authorized domains

#### **Issue: "Firebase: Error (auth/unauthorized-domain)"**
- **Solution**: Add `tehlamo.github.io` to Firebase authorized domains

### **Step 5: Verify Configuration**

Check that these domains are added:

**Firebase Console → Authentication → Settings → Authorized domains:**
- ✅ `tehlamo.github.io`
- ✅ `roombuilder-4ffd9.firebaseapp.com`
- ✅ `localhost` (for local development)

**Google Cloud Console → APIs & Services → Credentials → OAuth 2.0 Client ID:**
- ✅ `https://tehlamo.github.io`
- ✅ `https://roombuilder-4ffd9.firebaseapp.com`

### **Step 6: Test Locally First**

Before testing on GitHub Pages, test locally:

1. **Run locally**: `npm run dev`
2. **Test Google login** on `http://localhost:3000`
3. **If it works locally**, the issue is domain configuration
4. **If it doesn't work locally**, check Firebase configuration

## 🔍 Debugging

### **Check Browser Console**
Open browser developer tools and look for:
- Firebase authentication errors
- CORS errors
- Network errors

### **Check Network Tab**
Look for failed requests to:
- `https://identitytoolkit.googleapis.com/`
- `https://securetoken.googleapis.com/`

### **Common Error Messages**

1. **"auth/unauthorized-domain"**: Add domain to Firebase authorized domains
2. **"redirect_uri_mismatch"**: Add redirect URI to Google OAuth settings
3. **"access_denied"**: Check OAuth consent screen configuration

## 🎯 Quick Checklist

- [ ] Added `tehlamo.github.io` to Firebase authorized domains
- [ ] Added `https://tehlamo.github.io` to Google OAuth origins
- [ ] Added redirect URIs to Google OAuth settings
- [ ] Tested locally first
- [ ] Checked browser console for errors
- [ ] Verified Firebase project settings

## 🆘 Still Not Working?

If you're still having issues:

1. **Check Firebase Console logs** for authentication errors
2. **Verify your Firebase project ID** matches the configuration
3. **Test with a different browser** or incognito mode
4. **Check if your Firebase project has billing enabled** (required for some features)

---

**Your app should work at: https://tehlamo.github.io/RoomBuilder/** 🚀
