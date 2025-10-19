export interface AppState {
  roomDimensions: RoomDimensions | null;
  furniture: Furniture[];
  selectedFurniture: Furniture | null;
  isEditing: boolean;
  isViewing: boolean;
  budget: number;
  roomType: string;
  isPublished: boolean;
}

export interface DecorationSuggestion {
  item: string;
  description: string;
  estimatedCost: number;
  category: string;
  priority: 'high' | 'medium' | 'low';
  dimensions?: {
    width: number;
    height: number;
    depth: number;
  };
  brand?: string;
  productUrl?: string;
  reasoning?: string;
}

import type {RoomDimensions} from './Room';
import type {Furniture} from './Furniture';