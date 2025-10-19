import type { RoomDimensions } from '../types/Room';
import type { Furniture } from '../types/Furniture';
import type { DecorationSuggestion } from '../types/App';

export interface AISuggestion {
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
  source?: string;
  imageUrl?: string;
}

export class DecorationAI {
  private apiKey: string;
  private baseUrl: string = 'https://generativelanguage.googleapis.com/v1beta';

  constructor() {
    this.apiKey = import.meta.env.VITE_GEMINI_API_KEY || 'your-gemini-api-key-here';
  }

  async getDecorationSuggestions(
    roomDimensions: RoomDimensions,
    existingFurniture: Furniture[],
    roomType: string,
    budget: number
  ): Promise<DecorationSuggestion[]> {
    try {
      // Use Gemini API to get intelligent suggestions
      const aiSuggestions = await this.getGeminiSuggestions(roomDimensions, existingFurniture, roomType, budget);
      return aiSuggestions;
    } catch (error) {
      console.error('Error getting AI suggestions:', error);
      // Show error message instead of fallback
      throw new Error('Unable to get AI suggestions. Please check your API key and try again.');
    }
  }

  private async getGeminiSuggestions(
    roomDimensions: RoomDimensions,
    existingFurniture: Furniture[],
    roomType: string,
    budget: number
  ): Promise<DecorationSuggestion[]> {
    if (!this.apiKey || this.apiKey === 'your-gemini-api-key-here') {
      throw new Error('Gemini API key not configured. Please set VITE_GEMINI_API_KEY in your .env file.');
    }
    
    const prompt = this.createPrompt(roomDimensions, existingFurniture, roomType, budget);
    
    const response = await fetch(`${this.baseUrl}/models/gemini-2.5-flash:generateContent?key=${this.apiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: prompt
          }]
        }],
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 8192,
        },
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Gemini API error response:', errorText);
      throw new Error(`Gemini API error: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    
    if (!data.candidates || !data.candidates[0] || !data.candidates[0].content) {
      throw new Error('Invalid response format from Gemini API');
    }
    
    // Handle different response structures
    let generatedText = '';
    
    if (data.candidates[0].content.parts && data.candidates[0].content.parts[0]) {
      // Standard structure with parts
      generatedText = data.candidates[0].content.parts[0].text;
    } else if (data.candidates[0].content.text) {
      // Direct text in content
      generatedText = data.candidates[0].content.text;
    } else if (data.candidates[0].text) {
      // Text directly in candidate
      generatedText = data.candidates[0].text;
    } else if (data.candidates[0].content && typeof data.candidates[0].content === 'string') {
      // Content is directly a string
      generatedText = data.candidates[0].content;
    } else {
      throw new Error('Unexpected response structure from Gemini API');
    }
    
    // Parse the AI response into structured suggestions
    return this.parseAISuggestions(generatedText, budget);
  }

  private createPrompt(
    roomDimensions: RoomDimensions,
    existingFurniture: Furniture[],
    roomType: string,
    budget: number
  ): string {
    const furnitureList = existingFurniture.map(f => `${f.name} (${f.type})`).join(', ');
    
    return `You are an expert interior designer. Suggest 5 specific furniture items for a ${roomType} room with these exact dimensions: ${roomDimensions.width}ft wide × ${roomDimensions.length}ft long × ${roomDimensions.height}ft high. Budget: $${budget}.

Consider the room proportions:
- Floor area: ${(roomDimensions.width * roomDimensions.length).toFixed(1)} sq ft
- Room volume: ${(roomDimensions.width * roomDimensions.length * roomDimensions.height).toFixed(1)} cubic ft
- Aspect ratio: ${(roomDimensions.width / roomDimensions.length).toFixed(2)}:1

For each suggestion, provide:
1. Specific item name (e.g., "IKEA HEMNES Dresser", "West Elm Modern Sofa")
2. Brief description
3. Estimated cost in USD
4. Category (seating, storage, lighting, decoration, functional)
5. Priority (high, medium, low)
6. Dimensions in feet (width x height x depth)
7. Brand/store where it can be purchased
8. Actual product URL (real link to the product)
9. Brief reasoning for the suggestion based on room size

Format as JSON:
{
  "suggestions": [
    {
      "item": "Specific Item Name",
      "description": "Brief description",
      "estimatedCost": 150,
      "category": "storage",
      "priority": "high",
      "dimensions": {"width": 2.5, "height": 3.0, "depth": 1.5},
      "brand": "IKEA",
      "productUrl": "https://actual-product-url.com",
      "reasoning": "Why this item fits the space"
    }
  ]
}

Focus on real, purchasable items that fit the room dimensions and budget. Consider the existing furniture and suggest complementary pieces.`;
  }

  private parseAISuggestions(aiResponse: string, budget: number): DecorationSuggestion[] {
    try {
      // Extract JSON from the response
      const jsonMatch = aiResponse.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        throw new Error('No JSON found in AI response');
      }

      const parsed = JSON.parse(jsonMatch[0]);
      const suggestions = parsed.suggestions || [];

      // Convert AI suggestions to our format and filter by budget
      return suggestions
        .filter((s: any) => s.estimatedCost <= budget * 0.3) // Max 30% of budget per item
        .map((s: any) => ({
          item: s.item || 'Unknown Item',
          description: s.description || 'AI suggested item',
          estimatedCost: s.estimatedCost || 0,
          category: s.category || 'decoration',
          priority: s.priority || 'medium'
        }))
        .slice(0, 7); // Limit to 7 suggestions

    } catch (error) {
      console.error('Error parsing AI suggestions:', error);
      throw new Error('Failed to parse AI suggestions. Please try again.');
    }
  }

  /**
   * Test the API connection
   */
  async testConnection(): Promise<boolean> {
    try {
      if (!this.apiKey || this.apiKey === 'your-gemini-api-key-here') {
        return false;
      }

      const response = await fetch(`${this.baseUrl}/models?key=${this.apiKey}`);
      return response.ok;
    } catch (error) {
      return false;
    }
  }

  /**
   * Create a furniture template from an AI suggestion
   */
  async createFurnitureFromSuggestion(suggestion: DecorationSuggestion): Promise<any> {
    try {
      // Use Gemini to get detailed furniture specifications
      const furnitureSpec = await this.getFurnitureSpecification(suggestion);
      
      return {
        name: suggestion.item,
        type: this.mapCategoryToType(suggestion.category),
        dimensions: furnitureSpec.dimensions || { width: 2, height: 2, depth: 2 },
        color: furnitureSpec.color || 0x8B4513,
        price: suggestion.estimatedCost,
        category: suggestion.category,
        description: suggestion.description,
        brand: furnitureSpec.brand,
        source: furnitureSpec.source,
        imageUrl: furnitureSpec.imageUrl
      };
    } catch (error) {
      console.error('Error creating furniture from suggestion:', error);
      // Return a basic template
      return {
        name: suggestion.item,
        type: this.mapCategoryToType(suggestion.category),
        dimensions: { width: 2, height: 2, depth: 2 },
        color: 0x8B4513,
        price: suggestion.estimatedCost,
        category: suggestion.category,
        description: suggestion.description
      };
    }
  }

  private async getFurnitureSpecification(suggestion: DecorationSuggestion): Promise<any> {
    const prompt = `Provide detailed specifications for the furniture item: "${suggestion.item}"

Please provide:
1. Exact dimensions in feet (width x height x depth)
2. Typical color/material (provide hex color code)
3. Brand/manufacturer
4. Where to purchase (store/website)
5. Product image URL if available

Format as JSON:
{
  "dimensions": {"width": 2.5, "height": 3.0, "depth": 1.5},
  "color": "#8B4513",
  "brand": "IKEA",
  "source": "ikea.com",
  "imageUrl": "https://example.com/image.jpg"
}`;

    try {
      const response = await fetch(`${this.baseUrl}/models/gemini-2.5-flash:generateContent?key=${this.apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }]
        })
      });

      if (!response.ok) throw new Error('API request failed');

      const data = await response.json();
      const text = data.candidates[0].content.parts[0].text;
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
      }
    } catch (error) {
      console.error('Error getting furniture specification:', error);
    }

    // Fallback specifications
    return {
      dimensions: { width: 2, height: 2, depth: 2 },
      color: 0x8B4513,
      brand: 'Unknown',
      source: 'Various retailers'
    };
  }

  private mapCategoryToType(category: string): string {
    const mapping: { [key: string]: string } = {
      'seating': 'chair',
      'storage': 'dresser',
      'lighting': 'lamp',
      'decoration': 'decoration',
      'functional': 'table'
    };
    return mapping[category] || 'decoration';
  }

}
