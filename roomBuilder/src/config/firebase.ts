import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getAnalytics } from 'firebase/analytics';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCvu8YJ6yQh5bXeDaoyGgo3LYiFgw8x-tA",
  authDomain: "roombuilder-4ffd9.firebaseapp.com",
  projectId: "roombuilder-4ffd9",
  storageBucket: "roombuilder-4ffd9.firebasestorage.app",
  messagingSenderId: "319855638873",
  appId: "1:319855638873:web:495b5457b1750911d6f448",
  measurementId: "G-Q0DWR8K1ZC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const db = getFirestore(app);
export const auth = getAuth(app);
export const analytics = getAnalytics(app);

export default app;
