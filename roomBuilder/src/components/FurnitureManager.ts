import type { Furniture, FurnitureTemplate, FurniturePosition } from '../types/Furniture';

export class FurnitureManager {
  private furniture: Furniture[] = [];
  private templates: FurnitureTemplate[] = [
    {
      name: 'Modern Chair',
      type: 'chair',
      dimensions: { width: 2, height: 3, depth: 2 },
      color: 0x8B4513,
      price: 150,
      category: 'seating',
      description: 'Comfortable modern chair'
    },
    {
      name: 'Coffee Table',
      type: 'table',
      dimensions: { width: 4, height: 1.5, depth: 2 },
      color: 0x654321,
      price: 200,
      category: 'functional',
      description: 'Stylish coffee table'
    },
    {
      name: 'Sofa',
      type: 'sofa',
      dimensions: { width: 6, height: 2.5, depth: 3 },
      color: 0x4169E1,
      price: 800,
      category: 'seating',
      description: 'Comfortable 3-seater sofa'
    },
    {
      name: 'Dining Table',
      type: 'table',
      dimensions: { width: 6, height: 2.5, depth: 3 },
      color: 0x8B4513,
      price: 400,
      category: 'functional',
      description: 'Large dining table'
    },
    {
      name: 'Bed',
      type: 'bed',
      dimensions: { width: 5, height: 2, depth: 7 },
      color: 0x2F4F4F,
      price: 600,
      category: 'functional',
      description: 'Queen size bed'
    },
    {
      name: 'Floor Lamp',
      type: 'lamp',
      dimensions: { width: 1, height: 5, depth: 1 },
      color: 0x000000,
      price: 80,
      category: 'lighting',
      description: 'Modern floor lamp'
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
      category: template.category as any
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