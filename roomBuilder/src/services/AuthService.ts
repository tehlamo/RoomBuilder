import {
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider
} from 'firebase/auth';
import { auth } from '../config/firebase';

export interface AuthUser {
  uid: string;
  displayName: string | null;
  email: string | null;
  photoURL: string | null;
}

export class AuthService {
  private googleProvider: GoogleAuthProvider;
  private currentUser: AuthUser | null = null;
  private authStateListeners: ((user: AuthUser | null) => void)[] = [];
  private isSigningIn: boolean = false;

  constructor() {
    this.googleProvider = new GoogleAuthProvider();
    this.googleProvider.addScope('profile');
    this.googleProvider.addScope('email');
    
    // Listen for authentication state changes
    onAuthStateChanged(auth, (user) => {
      console.log('Auth state changed:', user);
      if (user) {
        this.currentUser = {
          uid: user.uid,
          displayName: user.displayName,
          email: user.email,
          photoURL: user.photoURL
        };
        console.log('Set current user:', this.currentUser);
      } else {
        this.currentUser = null;
        console.log('Cleared current user');
      }
      
      // Notify all listeners
      this.authStateListeners.forEach(listener => listener(this.currentUser));
    });
  }

  // Sign in with Google
  async signInWithGoogle(): Promise<AuthUser | null> {
    if (this.isSigningIn) {
      console.log('Already signing in, please wait...');
      return null;
    }
    
    this.isSigningIn = true;
    
    try {
      const result = await signInWithPopup(auth, this.googleProvider);
      // The onAuthStateChanged listener will handle setting this.currentUser
      // Just return the current user after a brief delay to ensure the listener has fired
      return new Promise((resolve) => {
        setTimeout(() => {
          this.isSigningIn = false;
          resolve(this.currentUser);
        }, 100);
      });
    } catch (error) {
      this.isSigningIn = false;
      console.error('Error signing in with Google:', error);
      throw error;
    }
  }

  // Sign out
  async signOut(): Promise<void> {
    try {
      await signOut(auth);
      console.log('User signed out');
    } catch (error) {
      console.error('Error signing out:', error);
      throw error;
    }
  }

  // Get current user
  getCurrentUser(): AuthUser | null {
    console.log('getCurrentUser() called, returning:', this.currentUser);
    return this.currentUser;
  }

  // Check if user is authenticated
  isAuthenticated(): boolean {
    return this.currentUser !== null;
  }

  // Check if currently signing in
  isCurrentlySigningIn(): boolean {
    return this.isSigningIn;
  }

  // Add listener for auth state changes
  onAuthStateChange(listener: (user: AuthUser | null) => void): () => void {
    this.authStateListeners.push(listener);
    
    // Call immediately with current state
    listener(this.currentUser);
    
    // Return unsubscribe function
    return () => {
      const index = this.authStateListeners.indexOf(listener);
      if (index > -1) {
        this.authStateListeners.splice(index, 1);
      }
    };
  }

  // Wait for auth state to be determined
  async waitForAuthState(): Promise<AuthUser | null> {
    return new Promise((resolve) => {
      if (this.currentUser !== undefined) {
        resolve(this.currentUser);
      } else {
        const unsubscribe = this.onAuthStateChange((user) => {
          unsubscribe();
          resolve(user);
        });
      }
    });
  }
}
