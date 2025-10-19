export interface AppState {
  roomDimensions: RoomDimensions | null;
  furniture: Furniture[];
  selectedFurniture: Furniture | null;
  isEditing: boolean;
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
}

import type {RoomDimensions} from './Room';
import type {Furniture} from './Furniture';