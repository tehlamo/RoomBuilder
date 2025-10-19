import {
  collection,
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
  getDoc,
  getDocs,
  query,
  where,
  orderBy,
  limit,
  startAfter,
  increment,
  serverTimestamp,
  QueryDocumentSnapshot
} from 'firebase/firestore';
import { db } from '../config/firebase';
import type { PublishedDesign, DesignComment, UserProfile, DesignFilters } from '../types/Firestore';
import type { RoomDimensions } from '../types/Room';
import type { Furniture } from '../types/Furniture';

export class FirestoreService {
  private designsCollection = collection(db, 'designs');
  private commentsCollection = collection(db, 'comments');
  private profilesCollection = collection(db, 'profiles');

  constructor() {
    // Test Firestore connection
    this.testConnection();
  }

  /**
   * Remove undefined values from an object recursively
   */
  private cleanUndefinedValues(obj: any): any {
    if (obj === null || obj === undefined) {
      return null;
    }
    
    if (Array.isArray(obj)) {
      return obj.map(item => this.cleanUndefinedValues(item)).filter(item => item !== null);
    }
    
    if (typeof obj === 'object') {
      const cleaned: any = {};
      for (const [key, value] of Object.entries(obj)) {
        if (value !== undefined) {
          const cleanedValue = this.cleanUndefinedValues(value);
          if (cleanedValue !== null) {
            cleaned[key] = cleanedValue;
          }
        }
      }
      return cleaned;
    }
    
    return obj;
  }

  private async testConnection(): Promise<void> {
    try {
      
      // Test basic connection
      const testQuery = query(this.designsCollection, limit(1));
      await getDocs(testQuery);
      
      // Test public designs query specifically
      const publicQuery = query(this.designsCollection, where('isPublic', '==', true), limit(5));
      await getDocs(publicQuery);
      
      // Log all documents in the collection (for debugging)
      const allQuery = query(this.designsCollection, limit(10));
      await getDocs(allQuery);
      
    } catch (error) {
      console.error('FirestoreService: Connection failed:', error);
      console.error('FirestoreService: Error details:', error);
    }
  }

  // Save a design to Firestore
  async saveDesign(designData: {
    title: string;
    description: string;
    roomDimensions: RoomDimensions;
    furniture: Furniture[];
    budget: number;
    roomType: string;
    author: {
      uid: string;
      displayName: string | null;
      photoURL?: string | null;
    };
    isPublic: boolean;
    tags: string[];
    thumbnail?: string;
  }): Promise<string> {
    try {
      // Clean the data to remove undefined values
      const cleanedDesignData = this.cleanUndefinedValues({
        ...designData,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        likes: 0,
        views: 0
      });

      const docRef = await addDoc(this.designsCollection, cleanedDesignData);
      
      return docRef.id;
    } catch (error) {
      console.error('Error saving design:', error);
      throw error;
    }
  }

  // Update an existing design
  async updateDesign(designId: string, updates: Partial<PublishedDesign>): Promise<void> {
    try {
      const designRef = doc(this.designsCollection, designId);
      const cleanedUpdates = this.cleanUndefinedValues({
        ...updates,
        updatedAt: serverTimestamp()
      });
      
      await updateDoc(designRef, cleanedUpdates);
      
    } catch (error) {
      console.error('Error updating design:', error);
      throw error;
    }
  }

  // Delete a design
  async deleteDesign(designId: string): Promise<void> {
    try {
      const designRef = doc(this.designsCollection, designId);
      await deleteDoc(designRef);
      
    } catch (error) {
      console.error('Error deleting design:', error);
      throw error;
    }
  }

  // Get a single design by ID
  async getDesign(designId: string): Promise<PublishedDesign | null> {
    try {
      const designRef = doc(this.designsCollection, designId);
      const designSnap = await getDoc(designRef);
      
      if (designSnap.exists()) {
        const designData = designSnap.data() as Omit<PublishedDesign, 'id'>;
        return {
          id: designSnap.id,
          ...designData,
          createdAt: designData.createdAt || Date.now(),
          updatedAt: designData.updatedAt || Date.now()
        };
      } else {
        return null;
      }
    } catch (error) {
      console.error('Error getting design:', error);
      throw error;
    }
  }

  // Get public designs with filtering and pagination
  async getPublicDesigns(filters: DesignFilters): Promise<{
    designs: PublishedDesign[];
    lastDoc: QueryDocumentSnapshot | null;
    hasMore: boolean;
  }> {
    try {
      let q = query(
        this.designsCollection,
        where('isPublic', '==', true)
      );

      // Apply filters
      if (filters.roomType) {
        q = query(q, where('roomType', '==', filters.roomType));
      }

      if (filters.budgetMin !== undefined) {
        q = query(q, where('budget', '>=', filters.budgetMin));
      }

      if (filters.budgetMax !== undefined) {
        q = query(q, where('budget', '<=', filters.budgetMax));
      }

      if (filters.tags && filters.tags.length > 0) {
        q = query(q, where('tags', 'array-contains-any', filters.tags));
      }

      // Apply sorting
      try {
        switch (filters.sortBy) {
          case 'newest':
            q = query(q, orderBy('createdAt', 'desc'));
            break;
          case 'popular':
            q = query(q, orderBy('likes', 'desc'), orderBy('createdAt', 'desc'));
            break;
          case 'likes':
            q = query(q, orderBy('likes', 'desc'));
            break;
          case 'views':
            q = query(q, orderBy('views', 'desc'));
            break;
          default:
            // Default to newest if sortBy is not recognized
            q = query(q, orderBy('createdAt', 'desc'));
            break;
        }
      } catch (sortError) {
        console.warn('FirestoreService: Error applying sort, using default:', sortError);
        // Fallback to default sorting
        q = query(q, orderBy('createdAt', 'desc'));
      }

      // Apply pagination
      q = query(q, limit(filters.limit));
      
      if (filters.lastDoc) {
        q = query(q, startAfter(filters.lastDoc));
      }

      const querySnapshot = await getDocs(q);
      const designs: PublishedDesign[] = [];
      
      
      querySnapshot.forEach((doc) => {
        try {
          const data = doc.data() as Omit<PublishedDesign, 'id'>;
          
          // Handle timestamp conversion
          const createdAt = (data.createdAt as any)?.toDate ? (data.createdAt as any).toDate() : new Date(data.createdAt || Date.now());
          const updatedAt = (data.updatedAt as any)?.toDate ? (data.updatedAt as any).toDate() : new Date(data.updatedAt || Date.now());
          
          designs.push({
            id: doc.id,
            ...data,
            createdAt: createdAt.getTime(),
            updatedAt: updatedAt.getTime()
          });
        } catch (docError) {
          console.error('FirestoreService: Error processing document:', doc.id, docError);
        }
      });

      const lastDoc = querySnapshot.docs[querySnapshot.docs.length - 1] || null;
      const hasMore = querySnapshot.docs.length === filters.limit;


      return {
        designs,
        lastDoc,
        hasMore
      };
    } catch (error) {
      console.error('Error getting public designs:', error);
      throw error;
    }
  }

  // Test method to create a sample design for debugging
  async createTestDesign(): Promise<void> {
    try {
      const testDesign = {
        title: 'Test Design',
        description: 'This is a test design to verify Firestore connectivity',
        roomDimensions: { width: 10, length: 12, height: 9 },
        furniture: [],
        budget: 1000,
        roomType: 'living',
        tags: ['test', 'debug'],
        isPublic: true,
        author: {
          uid: 'test-user',
          displayName: 'Test User',
          photoURL: null
        },
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        likes: 0,
        views: 0
      };

      await addDoc(this.designsCollection, testDesign);
    } catch (error) {
      console.error('FirestoreService: Error creating test design:', error);
    }
  }

  // Get user's designs
  async getUserDesigns(userId: string, includePrivate: boolean = false): Promise<PublishedDesign[]> {
    try {
      let q = query(
        this.designsCollection,
        where('author.uid', '==', userId)
      );

      if (!includePrivate) {
        q = query(q, where('isPublic', '==', true));
      }

      q = query(q, orderBy('createdAt', 'desc'));

      const querySnapshot = await getDocs(q);
      const designs: PublishedDesign[] = [];
      
      querySnapshot.forEach((doc) => {
        const data = doc.data() as Omit<PublishedDesign, 'id'>;
        designs.push({
          id: doc.id,
          ...data,
          createdAt: data.createdAt || Date.now(),
          updatedAt: data.updatedAt || Date.now()
        });
      });

      return designs;
    } catch (error) {
      console.error('Error getting user designs:', error);
      throw error;
    }
  }

  // Check if user has already liked a design
  hasUserLikedDesign(designId: string, userId: string): boolean {
    const likedDesigns = this.getLikedDesigns(userId);
    return likedDesigns.includes(designId);
  }

  // Get list of designs liked by user
  private getLikedDesigns(userId: string): string[] {
    const key = `likedDesigns_${userId}`;
    const liked = localStorage.getItem(key);
    return liked ? JSON.parse(liked) : [];
  }

  // Add design to user's liked designs
  private addLikedDesign(userId: string, designId: string): void {
    const likedDesigns = this.getLikedDesigns(userId);
    if (!likedDesigns.includes(designId)) {
      likedDesigns.push(designId);
      const key = `likedDesigns_${userId}`;
      localStorage.setItem(key, JSON.stringify(likedDesigns));
    }
  }


  // Like a design
  async likeDesign(designId: string, userId?: string): Promise<void> {
    if (!userId) {
      throw new Error('User ID is required to like a design');
    }

    // Check if user has already liked this design
    if (this.hasUserLikedDesign(designId, userId)) {
      throw new Error('You have already liked this design');
    }

    try {
      const designRef = doc(this.designsCollection, designId);
      await updateDoc(designRef, {
        likes: increment(1)
      });
      
      // Add to user's liked designs
      this.addLikedDesign(userId, designId);
      
    } catch (error) {
      console.error('Error liking design:', error);
      throw error;
    }
  }

  // Increment view count (with session-based deduplication)
  async incrementViews(designId: string): Promise<void> {
    try {
      // Check if user has already viewed this design in this session
      const viewedKey = `viewed_${designId}`;
      if (sessionStorage.getItem(viewedKey)) {
        return;
      }

      const designRef = doc(this.designsCollection, designId);
      await updateDoc(designRef, {
        views: increment(1)
      });

      // Mark as viewed in this session
      sessionStorage.setItem(viewedKey, 'true');
    } catch (error) {
      console.error('Error incrementing views:', error);
      // Don't throw error for view counting failures
    }
  }

  // Add a comment to a design
  async addComment(designId: string, comment: {
    author: {
      uid: string;
      displayName: string | null;
      photoURL?: string | null;
    };
    content: string;
  }): Promise<string> {
    try {
      const cleanedComment = this.cleanUndefinedValues({
        designId,
        ...comment,
        createdAt: serverTimestamp(),
        likes: 0
      });
      
      const docRef = await addDoc(this.commentsCollection, cleanedComment);
      
      return docRef.id;
    } catch (error) {
      console.error('Error adding comment:', error);
      throw error;
    }
  }

  // Get comments for a design
  async getDesignComments(designId: string): Promise<DesignComment[]> {
    try {
      const q = query(
        this.commentsCollection,
        where('designId', '==', designId),
        orderBy('createdAt', 'desc')
      );

      const querySnapshot = await getDocs(q);
      const comments: DesignComment[] = [];
      
      querySnapshot.forEach((doc) => {
        const data = doc.data() as Omit<DesignComment, 'id'>;
        comments.push({
          id: doc.id,
          ...data,
          createdAt: data.createdAt || Date.now()
        });
      });

      return comments;
    } catch (error) {
      console.error('Error getting comments:', error);
      throw error;
    }
  }

  // Update user profile
  async updateUserProfile(userId: string, profileData: Partial<UserProfile>): Promise<void> {
    try {
      const profileRef = doc(this.profilesCollection, userId);
      const cleanedProfileData = this.cleanUndefinedValues({
        ...profileData,
        updatedAt: serverTimestamp()
      });
      
      await updateDoc(profileRef, cleanedProfileData);
      
    } catch (error) {
      console.error('Error updating user profile:', error);
      throw error;
    }
  }

  // Get user profile
  async getUserProfile(userId: string): Promise<UserProfile | null> {
    try {
      const profileRef = doc(this.profilesCollection, userId);
      const profileSnap = await getDoc(profileRef);
      
      if (profileSnap.exists()) {
        const profileData = profileSnap.data() as Omit<UserProfile, 'uid'>;
        return {
          uid: userId,
          ...profileData,
          createdAt: profileData.createdAt || Date.now()
        };
      } else {
        return null;
      }
    } catch (error) {
      console.error('Error getting user profile:', error);
      throw error;
    }
  }
}
