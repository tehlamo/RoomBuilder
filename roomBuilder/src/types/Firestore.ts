import type { RoomDimensions } from './Room';
import type { Furniture } from './Furniture';

export interface PublishedDesign {
  id: string;
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
  createdAt: Date;
  updatedAt: Date;
  isPublic: boolean;
  tags: string[];
  likes: number;
  views: number;
  thumbnail?: string; // Base64 image or URL
}

export interface DesignComment {
  id: string;
  designId: string;
  author: {
    uid: string;
    displayName: string | null;
    photoURL?: string | null;
  };
  content: string;
  createdAt: Date;
  likes: number;
}

export interface UserProfile {
  uid: string;
  displayName: string | null;
  email: string | null;
  photoURL?: string;
  bio?: string;
  createdAt: Date;
  designsCount: number;
  followersCount: number;
  followingCount: number;
}

export interface DesignFilters {
  roomType?: string;
  budgetMin?: number;
  budgetMax?: number;
  tags?: string[];
  sortBy: 'newest' | 'popular' | 'likes' | 'views';
  limit: number;
  lastDoc?: any; // For pagination
}
