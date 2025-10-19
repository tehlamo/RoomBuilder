import type { Furniture, FurnitureTemplate, FurniturePosition } from '../types/Furniture';

export class FurnitureManager {
  private furniture: Furniture[] = [];
  private templates: FurnitureTemplate[] = [
    // BEDS - Standard mattress sizes
    {
      name: 'Twin Bed',
      type: 'bed',
      dimensions: { width: 2.5, height: 1.5, depth: 6.25 }, // 30" x 18" x 75"
      color: 0x2F4F4F,
      price: 300,
      category: 'bedroom',
      description: 'Standard twin size bed (30" x 75")'
    },
    {
      name: 'Twin XL Bed',
      type: 'bed',
      dimensions: { width: 2.5, height: 1.5, depth: 6.75 }, // 30" x 18" x 81"
      color: 0x2F4F4F,
      price: 350,
      category: 'bedroom',
      description: 'Twin XL bed (30" x 81")'
    },
    {
      name: 'Full Bed',
      type: 'bed',
      dimensions: { width: 4.5, height: 1.5, depth: 6.25 }, // 54" x 18" x 75"
      color: 0x2F4F4F,
      price: 500,
      category: 'bedroom',
      description: 'Full size bed (54" x 75")'
    },
    {
      name: 'Queen Bed',
      type: 'bed',
      dimensions: { width: 5, height: 1.5, depth: 6.67 }, // 60" x 18" x 80"
      color: 0x2F4F4F,
      price: 600,
      category: 'bedroom',
      description: 'Queen size bed (60" x 80")'
    },
    {
      name: 'King Bed',
      type: 'bed',
      dimensions: { width: 6.33, height: 1.5, depth: 6.67 }, // 76" x 18" x 80"
      color: 0x2F4F4F,
      price: 800,
      category: 'bedroom',
      description: 'King size bed (76" x 80")'
    },
    {
      name: 'California King Bed',
      type: 'bed',
      dimensions: { width: 6, height: 1.5, depth: 7 }, // 72" x 18" x 84"
      color: 0x2F4F4F,
      price: 850,
      category: 'bedroom',
      description: 'California King bed (72" x 84")'
    },
    
    // SEATING
    {
      name: 'Dining Chair',
      type: 'chair',
      dimensions: { width: 1.5, height: 3, depth: 1.5 }, // 18" x 36" x 18"
      color: 0x8B4513,
      price: 120,
      category: 'seating',
      description: 'Standard dining chair'
    },
    {
      name: 'Office Chair',
      type: 'chair',
      dimensions: { width: 2, height: 3.5, depth: 2 }, // 24" x 42" x 24"
      color: 0x4169E1,
      price: 200,
      category: 'seating',
      description: 'Ergonomic office chair'
    },
    {
      name: '2-Seat Sofa',
      type: 'sofa',
      dimensions: { width: 5, height: 2.5, depth: 2.5 }, // 60" x 30" x 30"
      color: 0x4169E1,
      price: 600,
      category: 'seating',
      description: '2-seat loveseat'
    },
    {
      name: '3-Seat Sofa',
      type: 'sofa',
      dimensions: { width: 7, height: 2.5, depth: 2.5 }, // 84" x 30" x 30"
      color: 0x4169E1,
      price: 800,
      category: 'seating',
      description: '3-seat sofa'
    },
    {
      name: 'Sectional Sofa',
      type: 'sofa',
      dimensions: { width: 8, height: 2.5, depth: 3 }, // 96" x 30" x 36"
      color: 0x4169E1,
      price: 1200,
      category: 'seating',
      description: 'Large sectional sofa'
    },
    
    // TABLES
    {
      name: 'Coffee Table',
      type: 'table',
      dimensions: { width: 3, height: 1.25, depth: 1.5 }, // 36" x 15" x 18"
      color: 0x654321,
      price: 250,
      category: 'functional',
      description: 'Standard coffee table'
    },
    {
      name: 'End Table',
      type: 'table',
      dimensions: { width: 1.5, height: 1.5, depth: 1.5 }, // 18" x 18" x 18"
      color: 0x654321,
      price: 150,
      category: 'functional',
      description: 'Side/end table'
    },
    {
      name: 'Dining Table (4-seat)',
      type: 'table',
      dimensions: { width: 3, height: 2.5, depth: 2 }, // 36" x 30" x 24"
      color: 0x8B4513,
      price: 400,
      category: 'functional',
      description: '4-person dining table'
    },
    {
      name: 'Dining Table (6-seat)',
      type: 'table',
      dimensions: { width: 4, height: 2.5, depth: 2.5 }, // 48" x 30" x 30"
      color: 0x8B4513,
      price: 500,
      category: 'functional',
      description: '6-person dining table'
    },
    {
      name: 'Dining Table (8-seat)',
      type: 'table',
      dimensions: { width: 5, height: 2.5, depth: 3 }, // 60" x 30" x 36"
      color: 0x8B4513,
      price: 600,
      category: 'functional',
      description: '8-person dining table'
    },
    {
      name: 'Desk',
      type: 'table',
      dimensions: { width: 4, height: 2.5, depth: 2 }, // 48" x 30" x 24"
      color: 0x654321,
      price: 300,
      category: 'functional',
      description: 'Standard office desk'
    },
    
    // STORAGE
    {
      name: 'Dresser',
      type: 'storage',
      dimensions: { width: 3, height: 2.5, depth: 1.5 }, // 36" x 30" x 18"
      color: 0x8B4513,
      price: 400,
      category: 'storage',
      description: 'Standard dresser'
    },
    {
      name: 'Nightstand',
      type: 'storage',
      dimensions: { width: 1.5, height: 1.5, depth: 1.5 }, // 18" x 18" x 18"
      color: 0x8B4513,
      price: 150,
      category: 'storage',
      description: 'Bedside nightstand'
    },
    {
      name: 'Bookshelf',
      type: 'storage',
      dimensions: { width: 2, height: 5, depth: 1 }, // 24" x 60" x 12"
      color: 0x654321,
      price: 200,
      category: 'storage',
      description: 'Tall bookshelf'
    },
    {
      name: 'Wardrobe',
      type: 'storage',
      dimensions: { width: 2, height: 6, depth: 1.5 }, // 24" x 72" x 18"
      color: 0x8B4513,
      price: 500,
      category: 'storage',
      description: 'Standalone wardrobe'
    },
    
    // LIGHTING
    {
      name: 'Floor Lamp',
      type: 'lamp',
      dimensions: { width: 1, height: 5, depth: 1 }, // 12" x 60" x 12"
      color: 0x000000,
      price: 80,
      category: 'lighting',
      description: 'Modern floor lamp'
    },
    {
      name: 'Table Lamp',
      type: 'lamp',
      dimensions: { width: 0.5, height: 1.5, depth: 0.5 }, // 6" x 18" x 6"
      color: 0x000000,
      price: 50,
      category: 'lighting',
      description: 'Standard table lamp'
    },
    {
      name: 'Ceiling Fan',
      type: 'lighting',
      dimensions: { width: 2, height: 0.5, depth: 2 }, // 24" x 6" x 24"
      color: 0x000000,
      price: 150,
      category: 'lighting',
      description: 'Ceiling fan with light'
    }
  ];

  addFurniture(template: FurnitureTemplate, position: FurniturePosition): Furniture {
    const furniture: Furniture = {
      id: this.generateId(),
      name: template.name,
      type: template.type as any,
      width: template.dimensions.width,
      height: template.dimensions.height,
      depth: template.dimensions.depth,
      x: position.x,
      y: position.y,
      z: position.z,
      rotation: position.rotation,
      color: template.color,
      price: template.price,
      category: template.category as any,
      // Preserve additional properties from AI suggestions
      brand: (template as any).brand,
      productUrl: (template as any).productUrl,
      reasoning: (template as any).reasoning,
      description: (template as any).description
    };
    
    this.furniture.push(furniture);
    return furniture;
  }

  removeFurniture(id: string): boolean {
    const index = this.furniture.findIndex(f => f.id === id);
    if (index !== -1) {
      this.furniture.splice(index, 1);
      return true;
    }
    return false;
  }

  updateFurniturePosition(id: string, position: FurniturePosition): boolean {
    const furniture = this.furniture.find(f => f.id === id);
    if (furniture) {
      furniture.x = position.x;
      furniture.y = position.y;
      furniture.z = position.z;
      furniture.rotation = position.rotation;
      return true;
    }
    return false;
  }

  getFurniture(): Furniture[] {
    return [...this.furniture];
  }

  getFurnitureById(id: string): Furniture | undefined {
    return this.furniture.find(f => f.id === id);
  }

  getTemplates(): FurnitureTemplate[] {
    return [...this.templates];
  }

  getTemplatesByCategory(category: string): FurnitureTemplate[] {
    return this.templates.filter(t => t.category === category);
  }

  getTotalCost(): number {
    return this.furniture.reduce((total, furniture) => total + (furniture.price || 0), 0);
  }

  private generateId(): string {
    return Math.random().toString(36).substr(2, 9);
  }
}