# 🔧 Deploy Updated Firestore Rules

## 🚨 Problem
Public users can't like posts because Firestore security rules don't allow anonymous users to update documents.

## ✅ Solution
Updated Firestore rules to allow public users to like posts and view designs.

## 🚀 Deploy the Updated Rules

### **Method 1: Firebase Console (Recommended)**

1. **Go to Firebase Console**: https://console.firebase.google.com/
2. **Select your project**: `roombuilder-4ffd9`
3. **Go to Firestore Database → Rules**
4. **Copy the updated rules** from `firestore.rules` file
5. **Paste the rules** into the Firebase Console
6. **Click "Publish"**

### **Method 2: Firebase CLI**

If you have Firebase CLI installed:

```bash
# Navigate to your project directory
cd roomBuilder

# Deploy the rules
firebase deploy --only firestore:rules
```

### **Method 3: Manual Copy**

1. **Open `firestore.rules`** in your project
2. **Copy all the content**
3. **Go to Firebase Console → Firestore → Rules**
4. **Replace the existing rules**
5. **Click "Publish"**

## 🔍 What the Updated Rules Allow

### **Public Users Can Now:**
- ✅ **Read public designs** (browse community designs)
- ✅ **Like public designs** (increment likes count)
- ✅ **View public designs** (increment views count)
- ✅ **Read comments** on public designs
- ✅ **Like comments** on public designs

### **Authenticated Users Can Still:**
- ✅ **Create designs** (publish their own designs)
- ✅ **Update their own designs** (edit their designs)
- ✅ **Delete their own designs** (remove their designs)
- ✅ **Create comments** (comment on designs)
- ✅ **Update their own comments** (edit their comments)
- ✅ **Delete their own comments** (remove their comments)

## 🛡️ Security Features

### **Protected Operations:**
- ❌ **Anonymous users cannot create designs**
- ❌ **Anonymous users cannot create comments**
- ❌ **Anonymous users cannot delete anything**
- ❌ **Users cannot modify other users' designs**
- ❌ **Users cannot modify other users' comments**

### **Safe Updates:**
- ✅ **Like operations only increment counters**
- ✅ **View operations only increment counters**
- ✅ **No data modification beyond counters**
- ✅ **Only affects public designs**

## 🧪 Test the Rules

### **Test Public Access:**
1. **Open your app in incognito mode** (no login)
2. **Browse community designs** - should work
3. **Try to like a design** - should work
4. **Try to view a design** - should work

### **Test Authenticated Access:**
1. **Login to your app**
2. **Create a new design** - should work
3. **Edit your design** - should work
4. **Delete your design** - should work

## 🔧 Troubleshooting

### **If Rules Don't Deploy:**
1. **Check Firebase Console** for syntax errors
2. **Verify you're in the correct project**
3. **Try deploying from Firebase CLI**

### **If Public Users Still Can't Like:**
1. **Check browser console** for error messages
2. **Verify rules are published** in Firebase Console
3. **Test with a fresh incognito window**

### **Common Error Messages:**
- **"Missing or insufficient permissions"**: Rules not deployed or incorrect
- **"Permission denied"**: User trying to perform unauthorized action
- **"Document not found"**: Trying to access non-existent document

## 📋 Rule Summary

The updated rules allow:

```javascript
// Public users can like public designs
allow update: if resource.data.isPublic == true 
  && request.resource.data.likes == resource.data.likes + 1
  && request.resource.data.diff(resource.data).affectedKeys().hasOnly(['likes', 'updatedAt']);

// Public users can view public designs  
allow update: if resource.data.isPublic == true 
  && request.resource.data.views == resource.data.views + 1
  && request.resource.data.diff(resource.data).affectedKeys().hasOnly(['views', 'updatedAt']);
```

## 🎯 Next Steps

1. **Deploy the updated rules** to Firebase
2. **Test public access** in incognito mode
3. **Verify likes and views work** for anonymous users
4. **Check that authenticated features still work**

---

**Your app should now allow public users to like and view posts!** 🚀
