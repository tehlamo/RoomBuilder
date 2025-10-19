# Deploy Firestore Security Rules

## Option 1: Using Firebase CLI (Recommended)

1. **Install Firebase CLI** (if not already installed):
   ```bash
   npm install -g firebase-tools
   ```

2. **Login to Firebase**:
   ```bash
   firebase login
   ```

3. **Initialize Firebase in your project** (if not already done):
   ```bash
   firebase init firestore
   ```
   - Select your existing Firebase project
   - Use the existing `firestore.rules` file
   - Use the existing `firestore.indexes.json` file

4. **Deploy the rules**:
   ```bash
   firebase deploy --only firestore:rules
   ```

## Option 2: Using Firebase Console (Manual)

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project
3. Go to **Firestore Database** → **Rules**
4. Replace the existing rules with the content from `firestore.rules`
5. Click **Publish**

## Option 3: Using Firebase CLI with Project ID

If you know your Firebase project ID:

```bash
firebase use YOUR_PROJECT_ID
firebase deploy --only firestore:rules
```

## Verify the Rules

After deploying, test the like functionality in your app. The "insufficient permissions" error should be resolved.

## Troubleshooting

If you still get permission errors:

1. **Check Authentication**: Make sure users are properly authenticated
2. **Check Project ID**: Ensure you're using the correct Firebase project
3. **Check Rules Syntax**: Verify the rules are valid JSON
4. **Wait for Propagation**: Rules can take a few minutes to propagate

## Current Rules Summary

The deployed rules allow:
- ✅ Anyone to read public designs
- ✅ Authenticated users to read their own designs
- ✅ Authenticated users to create designs
- ✅ Authenticated users to update their own designs
- ✅ Authenticated users to like designs (increment likes)
- ✅ Authenticated users to view designs (increment views)
- ✅ Authenticated users to create/read comments
- ✅ Users to manage their own profiles
