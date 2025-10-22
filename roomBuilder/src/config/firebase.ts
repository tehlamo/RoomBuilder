import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getAnalytics } from 'firebase/analytics';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyCvu8YJ6yQh5bXeDaoyGgo3LYiFgw8x-tA",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "roombuilder-4ffd9.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "roombuilder-4ffd9",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "roombuilder-4ffd9.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "319855638873",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:319855638873:web:495b5457b1750911d6f448",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "G-Q0DWR8K1ZC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const db = getFirestore(app);
export const auth = getAuth(app);
export const analytics = getAnalytics(app);

export default app;
