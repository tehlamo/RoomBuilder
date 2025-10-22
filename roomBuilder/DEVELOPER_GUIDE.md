# 🚀 Developer Guide - Room Builder Application

## 📋 Table of Contents

1. [Project Overview](#project-overview)
2. [Architecture](#architecture)
3. [File Structure](#file-structure)
4. [Component Guide](#component-guide)
5. [Service Guide](#service-guide)
6. [Type Definitions](#type-definitions)
7. [Development Workflow](#development-workflow)
8. [Common Patterns](#common-patterns)
9. [Debugging Guide](#debugging-guide)
10. [Testing Strategy](#testing-strategy)

## 🎯 Project Overview

The Room Builder is a 3D room planning application built with TypeScript, Three.js, and Firebase. It allows users to create, design, and share 3D room layouts with furniture placement.

### **Key Features:**
- 🏠 **3D Room Creation** - Design rooms with custom dimensions
- 🪑 **Furniture Management** - Add, move, and arrange furniture
- 🤖 **AI Suggestions** - Get AI-powered decoration recommendations
- 👥 **Community Sharing** - Publish and browse community designs
- 💾 **Local Storage** - Save and manage personal room designs
- 🔍 **Smart Search** - Find furniture by compatibility with room size

## 🏗️ Architecture

### **High-Level Architecture:**
```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   App.ts        │    │   Components    │    │   Services      │
│   (Main App)    │◄──►│   (UI Logic)    │◄──►│   (Business)    │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         ▼                       ▼                       ▼
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Room3D.ts     │    │   Firebase      │    │   Local Storage │
│   (3D Engine)   │    │   (Database)    │    │   (User Data)   │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

### **Data Flow:**
1. **User Interaction** → App.ts
2. **App.ts** → Components (UI updates)
3. **App.ts** → Services (Business logic)
4. **Services** → Firebase/Local Storage (Data persistence)
5. **Components** → 3D Scene (Visual updates)

## 📁 File Structure

```
roomBuilder/
├── src/
│   ├── App.ts                    # 🏛️ Main application orchestrator
│   ├── main.ts                   # 🚀 Application entry point
│   ├── components/               # 🧩 UI Components
│   │   ├── Room3D.ts            # 🎮 3D rendering engine
│   │   ├── FurnitureManager.ts   # 🪑 Furniture data management
│   │   ├── DesignGallery.ts      # 🖼️ Community designs
│   │   ├── PublishDialog.ts      # 📤 Publishing interface
│   │   ├── UserProfile.ts        # 👤 User authentication UI
│   │   ├── LoginModal.ts         # 🔐 Login interface
│   │   └── CubeLogo.ts          # 🎲 3D logo component
│   ├── services/                 # 🔧 Business Logic Services
│   │   ├── AuthService.ts        # 🔐 Authentication
│   │   ├── FirestoreService.ts   # 🗄️ Database operations
│   │   └── DecorationAI.ts       # 🤖 AI suggestions
│   ├── types/                    # 📝 TypeScript Definitions
│   │   ├── App.ts               # 🏠 Application state types
│   │   ├── Room.ts              # 🏠 Room-related types
│   │   └── Furniture.ts         # 🪑 Furniture-related types
│   ├── config/                  # ⚙️ Configuration
│   │   └── firebase.ts          # 🔥 Firebase setup
│   └── style.css                # 🎨 Application styles
├── public/                      # 🌐 Static assets
├── dist/                        # 📦 Built application
└── docs/                        # 📚 Documentation
```

## 🧩 Component Guide

### **1. App.ts - Main Application Class**

**Purpose:** Central orchestrator that manages all application state and coordinates between components.

**Key Sections:**
- **Core Setup** - Initialization and service setup
- **UI Management** - All user interface components
- **Event Handlers** - User interaction management
- **Room Management** - Room creation and manipulation
- **Furniture Management** - Furniture operations
- **Mode Management** - Edit/View mode switching
- **3D Operations** - 3D scene interactions
- **Data Management** - Local storage and Firestore sync

**Key Methods:**
```typescript
// Core functionality
initializeUI()           // Setup all UI components
handleCreateRoom()       // Create new room
addFurnitureToRoom()     // Add furniture
toggleEditMode()         // Switch to edit mode
publishDesign()          // Publish to community
```

### **2. Room3D.ts - 3D Rendering Engine**

**Purpose:** Handles all 3D scene rendering, camera controls, and 3D interactions using Three.js.

**Key Sections:**
- **Core 3D Setup** - Scene, camera, renderer initialization
- **Room Management** - Room mesh creation and management
- **Furniture Management** - Furniture mesh operations
- **Manipulation System** - Drag, rotate, delete operations
- **Event Handlers** - Mouse and keyboard interactions
- **Animation Loop** - Continuous rendering

**Key Methods:**
```typescript
// 3D operations
createRoom(dimensions)   // Create 3D room
addFurniture(furniture)  // Add furniture to scene
setManipulationMode()    // Set interaction mode
moveFurniture()          // Move furniture in 3D
rotateFurniture()        // Rotate furniture
```

### **3. FurnitureManager.ts - Furniture Data Management**

**Purpose:** Manages furniture templates, instances, and provides furniture-related operations.

**Key Sections:**
- **Template Management** - Furniture catalog with 20+ items
- **Instance Management** - Furniture placement and tracking
- **Category Organization** - Beds, seating, tables, storage, lighting
- **Cost Calculation** - Budget tracking functionality

**Key Methods:**
```typescript
// Furniture operations
addFurniture(template, position)  // Add furniture instance
removeFurniture(id)              // Remove furniture
getTemplates()                   // Get furniture catalog
getTotalCost()                   // Calculate total cost
```

### **4. DesignGallery.ts - Community Designs**

**Purpose:** Displays and manages community-shared room designs.

**Key Features:**
- **Design Display** - Grid layout of community designs
- **Search & Filter** - Find designs by criteria
- **Like System** - Like/unlike designs
- **View Tracking** - Track design views
- **Navigation** - Switch between builder and gallery

### **5. PublishDialog.ts - Publishing Interface**

**Purpose:** Handles publishing room designs to the community.

**Key Features:**
- **Design Preview** - Show design thumbnail
- **Metadata Input** - Title, description, tags
- **Validation** - Ensure design meets requirements
- **Firestore Upload** - Save to database

### **6. UserProfile.ts - User Authentication UI**

**Purpose:** Manages user authentication state and profile display.

**Key Features:**
- **Login/Logout** - Authentication state management
- **Profile Display** - Show user information
- **Auth State** - Track authentication status

### **7. LoginModal.ts - Login Interface**

**Purpose:** Handles user login via Google authentication.

**Key Features:**
- **Google OAuth** - Firebase authentication
- **Modal Interface** - Popup login form
- **Error Handling** - Login error management

### **8. CubeLogo.ts - 3D Logo Component**

**Purpose:** Renders an interactive 3D cube logo for branding.

**Key Features:**
- **3D Animation** - Rotating cube animation
- **Responsive Design** - Adapts to container size
- **Performance** - Optimized rendering

## 🔧 Service Guide

### **1. AuthService.ts - Authentication Service**

**Purpose:** Manages user authentication and authorization.

**Key Methods:**
```typescript
// Authentication
signInWithGoogle()       // Google OAuth login
signOut()               // User logout
isAuthenticated()       // Check auth status
getCurrentUser()        // Get current user data
onAuthStateChange()     // Listen for auth changes
```

### **2. FirestoreService.ts - Database Service**

**Purpose:** Handles all Firestore database operations.

**Key Methods:**
```typescript
// Design operations
publishDesign(design)   // Publish design to community
getPublicDesigns()      // Get community designs
getUserDesigns(uid)     // Get user's designs
likeDesign(id)          // Like a design
incrementViews(id)      // Track design views

// User operations
createUserProfile()     // Create user profile
updateUserProfile()     // Update user data
```

### **3. DecorationAI.ts - AI Suggestions Service**

**Purpose:** Provides AI-powered decoration suggestions using Gemini API.

**Key Methods:**
```typescript
// AI operations
getDecorationSuggestions()  // Get AI suggestions
createFurnitureFromSuggestion()  // Convert AI suggestion to furniture
testConnection()           // Test API connectivity
```

## 📝 Type Definitions

### **Core Types:**

```typescript
// App State
interface AppState {
  roomDimensions: RoomDimensions | null;
  furniture: Furniture[];
  selectedFurniture: Furniture | null;
  isEditing: boolean;
  isViewing: boolean;
  budget: number;
  roomType: string;
  isPublished: boolean;
}

// Room Dimensions
interface RoomDimensions {
  width: number;
  length: number;
  height: number;
}

// Furniture
interface Furniture {
  id: string;
  name: string;
  type: string;
  width: number;
  height: number;
  depth: number;
  x: number;
  y: number;
  z: number;
  rotation: number;
  color: number;
  price: number;
  category: string;
}
```

## 🔄 Development Workflow

### **1. Setting Up Development Environment:**

```bash
# Navigate to project directory
cd roomBuilder

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Deploy to GitHub Pages
npm run deploy
```

### **2. Adding New Features:**

1. **Identify the right component** for your feature
2. **Follow existing patterns** for consistency
3. **Add proper TypeScript types**
4. **Update related components** if needed
5. **Test thoroughly** before committing

### **3. Modifying Existing Features:**

1. **Find the relevant component** using the structure guide
2. **Understand the current implementation**
3. **Make changes following existing patterns**
4. **Update related components** if necessary
5. **Test the changes** thoroughly

### **4. Debugging Issues:**

1. **Identify the problem area** using the component guide
2. **Check browser console** for errors
3. **Use browser dev tools** to inspect 3D scene
4. **Check Firebase console** for database issues
5. **Verify authentication state** if auth-related

## 🎯 Common Patterns

### **1. Authentication Flow:**
```typescript
private someAction(): void {
  if (!this.authService.isAuthenticated()) {
    this.loginModal.show(() => {
      this.proceedWithSomeAction();
    });
    return;
  }
  this.proceedWithSomeAction();
}
```

### **2. UI State Updates:**
```typescript
private updateSomething(): void {
  // Update state
  this.state.something = newValue;
  
  // Update UI elements
  this.updateUI();
  
  // Update button states
  this.updateAllButtonStates();
}
```

### **3. Error Handling:**
```typescript
try {
  // Do something
  await someAsyncOperation();
} catch (error) {
  console.error('Error message:', error);
  this.showNotification('User-friendly message', 'error');
}
```

### **4. Event Dispatching:**
```typescript
private dispatchCustomEvent(data: any): void {
  const event = new CustomEvent('eventName', {
    detail: data
  });
  this.container.dispatchEvent(event);
}
```

## 🐛 Debugging Guide

### **Common Issues and Solutions:**

#### **1. 3D Scene Not Rendering:**
- Check if `Room3D` is properly initialized
- Verify container element exists
- Check for Three.js errors in console
- Ensure room dimensions are set

#### **2. Furniture Not Appearing:**
- Check if furniture is added to both `FurnitureManager` and `Room3D`
- Verify furniture position is within room bounds
- Check for mesh creation errors

#### **3. Authentication Issues:**
- Verify Firebase configuration
- Check Google OAuth settings
- Ensure authorized domains are set
- Check browser console for auth errors

#### **4. Database Connection Issues:**
- Verify Firestore rules are correct
- Check Firebase project configuration
- Ensure user is authenticated
- Check network connectivity

#### **5. AI Suggestions Not Working:**
- Verify Gemini API key is set
- Check API quota and limits
- Ensure network connectivity
- Check for API response errors

### **Debugging Tools:**

1. **Browser Dev Tools:**
   - Console for errors
   - Network tab for API calls
   - Elements tab for DOM inspection

2. **Three.js Inspector:**
   - Use Three.js dev tools extension
   - Inspect 3D scene objects
   - Debug rendering issues

3. **Firebase Console:**
   - Monitor database operations
   - Check authentication logs
   - View Firestore data

## 🧪 Testing Strategy

### **Manual Testing Checklist:**

#### **Core Functionality:**
- [ ] Room creation with different dimensions
- [ ] Furniture addition and removal
- [ ] 3D manipulation (move, rotate, delete)
- [ ] Mode switching (edit/view)
- [ ] Authentication flow
- [ ] Design publishing
- [ ] Community gallery browsing

#### **Edge Cases:**
- [ ] Invalid room dimensions
- [ ] Furniture outside room bounds
- [ ] Network connectivity issues
- [ ] Authentication failures
- [ ] Large furniture catalogs
- [ ] Browser compatibility

#### **Performance:**
- [ ] 3D scene performance with many furniture items
- [ ] Large room dimensions
- [ ] Complex furniture arrangements
- [ ] Memory usage monitoring

### **Automated Testing (Future):**
- Unit tests for utility functions
- Integration tests for component interactions
- E2E tests for user workflows
- Performance tests for 3D rendering

## 🚀 Deployment Guide

### **GitHub Pages Deployment:**

1. **Build the application:**
   ```bash
   npm run build
   ```

2. **Deploy to GitHub Pages:**
   ```bash
   npm run deploy
   ```

3. **Configure Firebase for production:**
   - Add production domain to authorized domains
   - Update OAuth settings
   - Configure Firestore rules

### **Environment Variables:**
- `VITE_FIREBASE_API_KEY` - Firebase API key
- `VITE_GEMINI_API_KEY` - Gemini AI API key
- Other Firebase configuration variables

## 📚 Additional Resources

### **Documentation:**
- [CODE_STRUCTURE_GUIDE.md](./CODE_STRUCTURE_GUIDE.md) - Detailed code structure
- [ENVIRONMENT_SETUP.md](./ENVIRONMENT_SETUP.md) - Environment configuration
- [FIRESTORE_RULES_DEPLOYMENT.md](./FIRESTORE_RULES_DEPLOYMENT.md) - Database rules

### **External Documentation:**
- [Three.js Documentation](https://threejs.org/docs/)
- [Firebase Documentation](https://firebase.google.com/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [Vite Documentation](https://vitejs.dev/guide/)

---

**This guide provides everything needed to understand, develop, and maintain the Room Builder application! 🎉**
