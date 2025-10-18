import type {RoomDimensions} from './types/Room';
import type {Furniture} from './types/Furniture';
import type {AppState} from './types/App';
import {Room3D} from './components/Room3D';
import {FurnitureManager} from './components/FurnitureManager';
import {DecorationAI} from './services/DecorationAI';

export class RoomBuilderApp {
  private room3D!: Room3D;
  private furnitureManager!: FurnitureManager;
  private decorationAI!: DecorationAI;
  private state: AppState;
  private container: HTMLElement;

  constructor() {
    this.container = document.getElementById('app')!;
    this.state = {
      roomDimensions: null,
      furniture: [],
      selectedFurniture: null,
      isEditing: false,
      budget: 1000,
      roomType: 'living'
    };

    this.initializeServices();
    this.initializeUI();
  }

  private initializeServices(): void {
    this.furnitureManager = new FurnitureManager();
    this.decorationAI = new DecorationAI();
  }

  private initializeUI(): void {
    this.container.innerHTML = `
      <div class="app-container">
        <div class="sidebar">
          <div id="room-setup"></div>
          <div id="furniture-palette"></div>
          <div id="suggestions"></div>
          <div id="budget-tracker"></div>
        </div>
        <div class="main-content">
          <div id="3d-viewport"></div>
          <div class="controls">
            <button id="get-suggestions" class="btn-secondary">Get AI Suggestions</button>
            <button id="save-design" class="btn-primary">Save Design</button>
          </div>
          <div class="instructions">
            <p><strong>3D Controls:</strong> Mouse to rotate, scroll to zoom, right-click + drag to pan</p>
            <p><strong>Furniture:</strong> Click items in the sidebar to add them to your room</p>
          </div>
        </div>
      </div>
    `;

    this.setupRoomInput();
    this.setupFurniturePalette();
    this.setupBudgetTracker();
    this.setupEventListeners();
  }

  private setupRoomInput(): void {
    const roomSetup = document.getElementById('room-setup')!;
    roomSetup.innerHTML = `
      <div class="form-section">
        <h3>Room Dimensions</h3>
        <div class="input-group">
          <label for="width">Width (ft):</label>
          <input type="number" id="width" min="1" max="50" step="0.1" placeholder="12">
        </div>
        <div class="input-group">
          <label for="length">Length (ft):</label>
          <input type="number" id="length" min="1" max="50" step="0.1" placeholder="15">
        </div>
        <div class="input-group">
          <label for="height">Height (ft):</label>
          <input type="number" id="height" min="6" max="20" step="0.1" placeholder="9">
        </div>
        <button id="create-room" class="btn-primary">Create Room</button>
      </div>
    `;
    
    document.getElementById('create-room')?.addEventListener('click', () => {
      this.handleCreateRoom();
    });
  }

  private setupFurniturePalette(): void {
    const palette = document.getElementById('furniture-palette')!;
    const templates = this.furnitureManager.getTemplates();
    
    palette.innerHTML = `
      <div class="palette-section">
        <h3>Furniture Library</h3>
        <div class="category-tabs">
          <button class="tab-btn active" data-category="all">All</button>
          <button class="tab-btn" data-category="seating">Seating</button>
          <button class="tab-btn" data-category="storage">Storage</button>
          <button class="tab-btn" data-category="lighting">Lighting</button>
          <button class="tab-btn" data-category="functional">Functional</button>
        </div>
        <div class="furniture-grid">
          ${templates.map(template => `
            <div class="furniture-item" data-template='${JSON.stringify(template)}'>
              <div class="furniture-preview" style="background-color: #${template.color.toString(16).padStart(6, '0')}"></div>
              <div class="furniture-info">
                <span class="furniture-name">${template.name}</span>
                <span class="furniture-price">$${template.price}</span>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;

    this.setupFurnitureEventListeners();
  }

  private setupFurnitureEventListeners(): void {
    document.querySelectorAll('.tab-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const category = (e.target as HTMLElement).dataset.category!;
        this.filterFurnitureByCategory(category);
        
        // Update active tab
        document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
        (e.target as HTMLElement).classList.add('active');
      });
    });

    // Furniture selection
    document.querySelectorAll('.furniture-item').forEach(item => {
      item.addEventListener('click', (e) => {
        const template = JSON.parse((e.currentTarget as HTMLElement).dataset.template!);
        this.addFurnitureToRoom(template);
      });
    });
  }

  private filterFurnitureByCategory(category: string): void {
    const furnitureItems = document.querySelectorAll('.furniture-item');
    furnitureItems.forEach(item => {
      const template = JSON.parse((item as HTMLElement).dataset.template!);
      const shouldShow = category === 'all' || template.category === category;
      (item as HTMLElement).style.display = shouldShow ? 'block' : 'none';
    });
  }

  private setupBudgetTracker(): void {
    const budgetTracker = document.getElementById('budget-tracker')!;
    budgetTracker.innerHTML = `
      <div class="budget-section">
        <h3>Budget Tracker</h3>
        <div class="budget-input">
          <label for="budget">Budget:</label>
          <input type="number" id="budget" value="${this.state.budget}" min="0">
        </div>
        <div class="budget-info">
          <div class="budget-item">
            <span>Furniture Cost:</span>
            <span id="furniture-cost">$0</span>
          </div>
          <div class="budget-item">
            <span>Remaining:</span>
            <span id="remaining-budget">$${this.state.budget}</span>
          </div>
        </div>
      </div>
    `;

    const budgetInput = document.getElementById('budget') as HTMLInputElement;
    budgetInput.addEventListener('input', () => {
      this.state.budget = parseFloat(budgetInput.value) || 0;
      this.updateBudgetDisplay();
    });
  }

  private setupEventListeners(): void {
    document.getElementById('get-suggestions')?.addEventListener('click', () => {
      this.getAISuggestions();
    });

    document.getElementById('save-design')?.addEventListener('click', () => {
      this.saveDesign();
    });
  }

  private handleCreateRoom(): void {
    const width = parseFloat((document.getElementById('width') as HTMLInputElement).value);
    const length = parseFloat((document.getElementById('length') as HTMLInputElement).value);
    const height = parseFloat((document.getElementById('height') as HTMLInputElement).value);

    console.log('Creating room with dimensions:', { width, length, height });

    if (!width || !length || !height) {
      alert('Please enter all dimensions');
      return;
    }

    if (width <= 0 || length <= 0 || height <= 0) {
      alert('All dimensions must be greater than 0');
      return;
    }

    const dimensions: RoomDimensions = { width, length, height };
    this.state.roomDimensions = dimensions;
    
    try {
      // Initialize 3D viewport
      const viewport = document.getElementById('3d-viewport')!;
      if (!viewport) {
        throw new Error('3D viewport element not found');
      }
      
      this.room3D = new Room3D(viewport);
      this.room3D.createRoom(dimensions);
      
      // Update UI
      const roomSetup = document.getElementById('room-setup');
      const furniturePalette = document.getElementById('furniture-palette');
      
      if (roomSetup) roomSetup.style.display = 'none';
      if (furniturePalette) furniturePalette.style.display = 'block';
      
      console.log('Room created successfully!');
    } catch (error) {
      console.error('Error creating room:', error);
      alert('Error creating room. Please check the console for details.');
    }
  }

  private addFurnitureToRoom(template: any): void {
    if (!this.state.roomDimensions) {
      alert('Please create a room first');
      return;
    }

    const position = {
      x: (this.state.roomDimensions.width - template.dimensions.width) / 2,
      y: 0,
      z: (this.state.roomDimensions.length - template.dimensions.depth) / 2,
      rotation: 0
    };

    const furniture = this.furnitureManager.addFurniture(template, position);
    this.room3D.addFurniture(furniture);
    this.state.furniture.push(furniture);
    this.updateBudgetDisplay();
    
    console.log(`Added ${furniture.name} to room at position (${furniture.x}, ${furniture.y}, ${furniture.z})`);
  }

  private updateBudgetDisplay(): void {
    const furnitureCost = this.furnitureManager.getTotalCost();
    const remaining = this.state.budget - furnitureCost;
    
    document.getElementById('furniture-cost')!.textContent = `$${furnitureCost}`;
    document.getElementById('remaining-budget')!.textContent = `$${remaining}`;
    
    const remainingElement = document.getElementById('remaining-budget')!;
    if (remaining < 0) {
      remainingElement.style.color = 'red';
    } else if (remaining < this.state.budget * 0.2) {
      remainingElement.style.color = 'orange';
    } else {
      remainingElement.style.color = 'green';
    }
  }

  private async getAISuggestions(): Promise<void> {
    if (!this.state.roomDimensions) {
      alert('Please create a room first');
      return;
    }

    try {
      const suggestions = await this.decorationAI.getDecorationSuggestions(
        this.state.roomDimensions,
        this.state.furniture,
        this.state.roomType,
        this.state.budget
      );

      this.displaySuggestions(suggestions);
    } catch (error) {
      console.error('Error getting AI suggestions:', error);
      alert('Error getting AI suggestions.');
    }
  }

  private displaySuggestions(suggestions: any[]): void {
    const suggestionsDiv = document.getElementById('suggestions')!;
    suggestionsDiv.innerHTML = `
      <div class="suggestions-section">
        <h3>AI Suggestions</h3>
        <div class="suggestions-list">
          ${suggestions.map(suggestion => `
            <div class="suggestion-item">
              <div class="suggestion-header">
                <span class="suggestion-name">${suggestion.item}</span>
                <span class="suggestion-cost">$${suggestion.estimatedCost}</span>
              </div>
              <p class="suggestion-description">${suggestion.description}</p>
              <div class="suggestion-meta">
                <span class="suggestion-category">${suggestion.category}</span>
                <span class="suggestion-priority priority-${suggestion.priority}">${suggestion.priority}</span>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  private saveDesign(): void {
    const design = {
      roomDimensions: this.state.roomDimensions,
      furniture: this.state.furniture,
      budget: this.state.budget,
      timestamp: new Date().toISOString()
    };

    // Save to localStorage
    const savedDesigns = JSON.parse(localStorage.getItem('roomDesigns') || '[]');
    savedDesigns.push(design);
    localStorage.setItem('roomDesigns', JSON.stringify(savedDesigns));

    alert('Design saved successfully!');
  }
}
