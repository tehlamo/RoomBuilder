export interface RoomDimensions {
  width: number;
  length: number;
  height: number;
}

export interface RoomType {
  type: 'living' | 'bedroom' | 'bathroom' | 'hallway' | 'kitchen' | 'office' | 'guest' | 'other' | 'dining';
  style: 'modern' | 'traditional' | 'minimalist' | 'industrial';
}