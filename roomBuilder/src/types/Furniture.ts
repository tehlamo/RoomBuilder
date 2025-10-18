export interface Furniture {
  id: string;
  name: string;
  type: 'chair' | 'table' | 'bed' | 'sofa' | 'dresser' | 'lamp' | 'decoration' | 'storage';
  width: number;
  height: number;
  depth: number;
  x: number;
  y: number;
  z: number;
  rotation: number; // in degrees
  color: number;
  price?: number;
  category: 'seating' | 'storage' | 'lighting' | 'decoration' | 'functional';
}

export interface FurnitureTemplate {
  name: string;
  type: string;
  dimensions: { 
    width: number; 
    height: number; 
    depth: number 
  };
  color: number;
  price: number;
  category: string;
  description: string;
}

export interface FurniturePosition {
  x: number;
  y: number;
  z: number;
  rotation: number;
}