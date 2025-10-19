import type { RoomDimensions } from '../types/Room';
import type { Furniture } from '../types/Furniture';
import type { DecorationSuggestion } from '../types/App';

export class DecorationAI {
  // AI service placeholder

  constructor() {
    // AI service placeholder
  }

  async getDecorationSuggestions(
    _roomDimensions: RoomDimensions,
    _existingFurniture: Furniture[],
    roomType: string,
    budget: number
  ): Promise<DecorationSuggestion[]> {
    // Mock AI suggestions for now
    return this.getFallbackSuggestions(roomType, budget);
  }

  private getFallbackSuggestions(_roomType: string, budget: number): DecorationSuggestion[] {
    const suggestions: DecorationSuggestion[] = [
      {
        item: 'Wall Art',
        description: 'Modern abstract painting for the wall',
        estimatedCost: 75,
        category: 'decoration',
        priority: 'high'
      },
      {
        item: 'Throw Pillows',
        description: 'Colorful accent pillows for the sofa',
        estimatedCost: 40,
        category: 'decoration',
        priority: 'medium'
      },
      {
        item: 'Area Rug',
        description: 'Soft area rug to define the space',
        estimatedCost: 120,
        category: 'decoration',
        priority: 'high'
      },
      {
        item: 'Plants',
        description: 'Low-maintenance indoor plants',
        estimatedCost: 30,
        category: 'decoration',
        priority: 'low'
      },
      {
        item: 'Table Lamp',
        description: 'Stylish table lamp for ambient lighting',
        estimatedCost: 60,
        category: 'lighting',
        priority: 'medium'
      }
    ];

    // Filter suggestions based on budget
    return suggestions.filter(s => s.estimatedCost <= budget * 0.2);
  }
}
