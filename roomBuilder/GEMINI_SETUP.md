# Gemini API Setup for AI Furniture Suggestions

## Overview
The app now uses Google's Gemini API to provide intelligent furniture suggestions based on room dimensions, existing furniture, and budget.

## Setup Instructions

### 1. Get Gemini API Key
1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Create a new API key
4. Copy the API key

### 2. Configure Environment Variables
Create a `.env` file in the `roomBuilder` directory:

```bash
# .env file
VITE_GEMINI_API_KEY=your-actual-api-key-here
```

### 3. Features
- **Intelligent Suggestions**: AI analyzes room dimensions, existing furniture, and budget
- **Real Furniture**: Suggests actual purchasable items from real brands
- **Smart Categorization**: Automatically categorizes suggestions (seating, storage, lighting, etc.)
- **Dynamic Dimensions**: Gets real dimensions for suggested furniture
- **One-Click Addition**: Add AI suggestions directly to your room

### 4. How It Works
1. User clicks "Get AI Suggestions"
2. App sends room details to Gemini API
3. AI returns specific furniture recommendations
4. User can view details or add items directly to room
5. Items are created with real dimensions and properties

### 5. Fallback System
If the API is unavailable, the app falls back to static suggestions to ensure functionality.

## API Usage
The app makes two types of API calls:
1. **Initial Suggestions**: Gets 5-7 furniture recommendations
2. **Furniture Specifications**: Gets detailed specs for selected items

## Cost Considerations
- Gemini API has free tier with generous limits
- Each suggestion request uses minimal tokens
- Fallback system prevents API dependency
