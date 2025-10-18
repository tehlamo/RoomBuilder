export interface AppState {
  roomDimensions: RoomDimensions | null;
  furniture: Furniture[];
  selectedFurniture: Furniture | null;
  isEditing: boolean;
  budget: number;
  roomType: string;
}

export interface DecorationSuggestion {
  item: string;
  description: string;
  estimatedCost: number;
  category: string;
  priority: 'high' | 'medium' | 'low';
}

// Import the types we need
import type {RoomDimensions} from './Room';
import type {Furniture} from './Furniture';