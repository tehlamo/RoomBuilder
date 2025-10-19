import type {RoomDimensions} from './types/Room';
import type {AppState} from './types/App';
import {Room3D} from './components/Room3D';
import {FurnitureManager} from './components/FurnitureManager';
import {DecorationAI} from './services/DecorationAI';
import {DesignGallery} from './components/DesignGallery';
import {PublishDialog} from './components/PublishDialog';
import {AuthService} from './services/AuthService';
import {UserProfile} from './components/UserProfile';
import {LoginModal} from './components/LoginModal';

export class RoomBuilderApp {
  private room3D: Room3D | null = null;
  private furnitureManager!: FurnitureManager;
  private decorationAI!: DecorationAI;
  private designGallery!: DesignGallery;
  private publishDialog!: PublishDialog;
  private authService!: AuthService;
  private userProfile!: UserProfile;
  private loginModal!: LoginModal;
  private state: AppState;
  private container: HTMLElement;
  private currentView: 'builder' | 'gallery' = 'builder';

  constructor() {
    this.container = document.getElementById('app')!;
    this.state = {
      roomDimensions: null,
      furniture: [],
      selectedFurniture: null,
      isEditing: false,
      budget: 1000,
      roomType: 'living',
      isPublished: false
    };

    this.initializeServices();
    this.initializeUI();
  }

  private initializeServices(): void {
    this.furnitureManager = new FurnitureManager();
    this.decorationAI = new DecorationAI();
    this.publishDialog = new PublishDialog(this.container);
    this.authService = new AuthService();
    this.loginModal = new LoginModal(this.container);
  }

  private initializeUI(): void {
    this.container.innerHTML = `
      <div class="app-container">
        <div class="sidebar">
          <div id="user-profile"></div>
          <div id="room-management"></div>
          <div id="room-setup"></div>
          <div id="furniture-palette"></div>
          <div id="suggestions"></div>
          <div id="budget-tracker"></div>
        </div>
        <div class="main-content">
          <div id="3d-viewport"></div>
          <div class="drag-instructions hidden" id="drag-instructions">
            <strong>Drag Mode:</strong> Click and drag furniture to move them around the room
          </div>
          <div class="selection-instructions hidden" id="selection-instructions">
            <strong>Selection Mode:</strong> Click furniture to select, then use colored handles to move along specific axes
            <br><span class="handle-x">Red = X-axis</span> | <span class="handle-y">Green = Y-axis</span> | <span class="handle-z">Blue = Z-axis</span>
            <br><strong>Rotation:</strong> <span class="handle-x">Red sphere = X-rotation</span> | <span class="handle-y">Green sphere = Y-rotation</span> | <span class="handle-z">Blue sphere = Z-rotation</span>
          </div>
          <div class="controls">
            <button id="get-suggestions" class="btn-secondary">Get AI Suggestions</button>
            <button id="edit-mode" class="btn-secondary" disabled>Edit Mode</button>
            <button id="delete-selected" class="btn-secondary" disabled>Delete Selected</button>
            <button id="reset-view" class="btn-secondary">Reset View</button>
            <button id="toggle-bounding-boxes" class="btn-secondary">Show Bounding Boxes</button>
            <button id="publish-design" class="btn-primary">Publish Design</button>
            <button id="browse-designs" class="btn-secondary">
              <i class="icon-community"></i> Browse Community
            </button>
          </div>
          <div class="manipulation-controls" id="manipulation-controls" style="display: none;">
            <div class="manipulation-mode-buttons">
              <button id="manipulation-mode-move" class="btn-manipulation active" data-mode="move">
                <i class="icon-move"></i> Move
              </button>
              <button id="manipulation-mode-rotate" class="btn-manipulation" data-mode="rotate">
                <i class="icon-rotate"></i> Rotate
              </button>
              <button id="manipulation-mode-delete" class="btn-manipulation" data-mode="delete">
                <i class="icon-delete"></i> Delete
              </button>
            </div>
            <div class="manipulation-actions" id="manipulation-actions" style="display: none;">
              <div class="position-controls">
                <label>Position:</label>
                <div class="position-inputs">
                  <input type="number" id="position-x" placeholder="X" step="0.1">
                  <input type="number" id="position-y" placeholder="Y" step="0.1">
                  <input type="number" id="position-z" placeholder="Z" step="0.1">
                  <button id="apply-position" class="btn-small">Apply</button>
                </div>
              </div>
              <div class="rotation-controls">
                <label>Rotation:</label>
                <div class="rotation-buttons">
                  <button id="rotate-left" class="btn-small">↺ 45°</button>
                  <button id="rotate-right" class="btn-small">↻ 45°</button>
                </div>
              </div>
              <div class="drag-settings">
                <label>Drag Settings:</label>
                <div class="drag-options">
                  <label class="checkbox-label">
                    <input type="checkbox" id="snap-to-grid" checked>
                    <span>Snap to Grid (0.5 units)</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div class="instructions">
            <p><strong>3D Controls:</strong> Mouse to rotate, scroll to zoom, right-click + drag to pan</p>
            <p><strong>Furniture:</strong> Click items in the sidebar to add them to your room</p>
          </div>
        </div>
      </div>
    `;

    this.setupUserProfile();
    this.setupRoomManagement();
    this.setupRoomInput();
    this.setupFurniturePalette();
    this.setupBudgetTracker();
    this.setupEventListeners();
    this.setupAuthStateListener();
    this.updateAllButtonStates(); // Set initial button states
  }

  private setupRoomManagement(): void {
    const roomManagement = document.getElementById('room-management')!;
    roomManagement.innerHTML = `
      <div class="room-management-section">
        <h3>Room Management</h3>
        <div class="room-actions">
          <button id="clear-room-btn" class="btn-warning" disabled>Clear Room</button>
          <button id="delete-room-btn" class="btn-danger" disabled>Delete Room</button>
        </div>
      </div>
    `;

    document.getElementById('clear-room-btn')?.addEventListener('click', () => {
      this.clearCurrentRoom();
    });

    document.getElementById('delete-room-btn')?.addEventListener('click', () => {
      this.deleteCurrentRoom();
    });
  }

  private setupRoomInput(): void {
    const roomSetup = document.getElementById('room-setup')!;
    roomSetup.innerHTML = `
      <div class="form-section">
        <h3>Room Dimensions</h3>
        <div class="input-group">
          <label for="width">Width:</label>
          <div class="dimension-input">
            <input type="number" id="width-ft" min="1" max="50" step="1" placeholder="12" value="12">
            <span>ft</span>
            <input type="number" id="width-in" min="0" max="11" step="1" placeholder="0" value="0">
            <span>in</span>
          </div>
        </div>
        <div class="input-group">
          <label for="length">Length:</label>
          <div class="dimension-input">
            <input type="number" id="length-ft" min="1" max="50" step="1" placeholder="15" value="15">
            <span>ft</span>
            <input type="number" id="length-in" min="0" max="11" step="1" placeholder="0" value="0">
            <span>in</span>
          </div>
        </div>
        <div class="input-group">
          <label for="height">Height:</label>
          <div class="dimension-input">
            <input type="number" id="height-ft" min="6" max="20" step="1" placeholder="9" value="9">
            <span>ft</span>
            <input type="number" id="height-in" min="0" max="11" step="1" placeholder="0" value="0">
            <span>in</span>
          </div>
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
          <button class="tab-btn" data-category="bedroom">Bedroom</button>
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

    document.getElementById('edit-mode')?.addEventListener('click', () => {
      this.toggleEditMode();
    });

    document.getElementById('delete-selected')?.addEventListener('click', () => {
      this.deleteSelectedFurniture();
    });

    document.getElementById('reset-view')?.addEventListener('click', () => {
      this.resetCameraView();
    });

    document.getElementById('toggle-bounding-boxes')?.addEventListener('click', () => {
      this.toggleBoundingBoxes();
    });

    document.getElementById('publish-design')?.addEventListener('click', () => {
      this.publishDesign();
    });

    document.getElementById('browse-designs')?.addEventListener('click', () => {
      this.toggleGallery();
    });

    // Manipulation controls
    this.setupManipulationEventListeners();
  }

  private setupManipulationEventListeners(): void {
    // Manipulation mode buttons
    document.querySelectorAll('.btn-manipulation').forEach(button => {
      button.addEventListener('click', (e) => {
        const target = e.target as HTMLElement;
        const mode = target.dataset.mode as 'move' | 'rotate' | 'delete';
        this.setManipulationMode(mode);
      });
    });

    // Position controls
    document.getElementById('apply-position')?.addEventListener('click', () => {
      this.applyPosition();
    });

    // Rotation controls
    document.getElementById('rotate-left')?.addEventListener('click', () => {
      this.rotateSelectedFurniture('counterclockwise');
    });

    document.getElementById('rotate-right')?.addEventListener('click', () => {
      this.rotateSelectedFurniture('clockwise');
    });

    // Snap to grid toggle
    document.getElementById('snap-to-grid')?.addEventListener('change', (e) => {
      const checkbox = e.target as HTMLInputElement;
      if (this.room3D) {
        this.room3D.setSnapToGrid(checkbox.checked);
      }
    });

    // Listen for furniture selection events from Room3D
    const viewport = document.getElementById('3d-viewport');
    if (viewport) {
      viewport.addEventListener('furnitureSelected', (e: any) => {
        this.onFurnitureSelected(e.detail);
      });

      viewport.addEventListener('furnitureDeselected', (e: any) => {
        this.onFurnitureDeselected(e.detail);
      });

      viewport.addEventListener('furnitureDragged', (e: any) => {
        this.onFurnitureDragged(e.detail);
      });

      viewport.addEventListener('furnitureDeleted', (e: any) => {
        this.onFurnitureDeleted(e.detail);
      });
    }
  }

  private handleCreateRoom(): void {
    // Check if user is authenticated
    if (!this.authService.isAuthenticated()) {
      this.loginModal.show(() => {
        // After successful login, proceed with room creation
        this.proceedWithCreateRoom();
      });
      return;
    }

    this.proceedWithCreateRoom();
  }

  private proceedWithCreateRoom(): void {
    
    // Get feet and inches for each dimension
    const widthFt = parseInt((document.getElementById('width-ft') as HTMLInputElement).value) || 0;
    const widthIn = parseInt((document.getElementById('width-in') as HTMLInputElement).value) || 0;
    const lengthFt = parseInt((document.getElementById('length-ft') as HTMLInputElement).value) || 0;
    const lengthIn = parseInt((document.getElementById('length-in') as HTMLInputElement).value) || 0;
    const heightFt = parseInt((document.getElementById('height-ft') as HTMLInputElement).value) || 0;
    const heightIn = parseInt((document.getElementById('height-in') as HTMLInputElement).value) || 0;

    // Convert to total feet (with decimal for inches)
    const width = widthFt + (widthIn / 12);
    const length = lengthFt + (lengthIn / 12);
    const height = heightFt + (heightIn / 12);

    if (width <= 0 || length <= 0 || height <= 0) {
      alert('All dimensions must be greater than 0');
      return;
    }

    if (width < 6 || length < 6 || height < 6) {
      alert('Room dimensions must be at least 6 feet in all directions');
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
      
      this.room3D = new Room3D(viewport, this);
      this.room3D.createRoom(dimensions);
      
      // Update UI
      const roomSetup = document.getElementById('room-setup');
      const furniturePalette = document.getElementById('furniture-palette');
      
      if (roomSetup) roomSetup.style.display = 'none';
      if (furniturePalette) furniturePalette.style.display = 'block';
      
      // Update room management buttons
      this.updateRoomManagementButtons();
      this.updateAllButtonStates();
    } catch (error) {
      console.error('Error creating room:', error);
      alert('Error creating room. Please check the console for details.');
    }
  }

  private addFurnitureToRoom(template: any): void {
    // Check if user is authenticated
    if (!this.authService.isAuthenticated()) {
      this.loginModal.show(() => {
        // After successful login, proceed with adding furniture
        this.proceedWithAddFurniture(template);
      });
      return;
    }

    this.proceedWithAddFurniture(template);
  }

  private proceedWithAddFurniture(template: any): void {
    if (!this.state.roomDimensions) {
      alert('Please create a room first');
      return;
    }

    const position = {
      x: 0, // Center of room (room is centered at origin)
      y: template.dimensions.height / 2, // Half height above floor (floor is at Y=0)
      z: 0, // Center of room (room is centered at origin)
      rotation: 0
    };

    const furniture = this.furnitureManager.addFurniture(template, position);
    if (this.room3D) {
      this.room3D.addFurniture(furniture);
    }
    this.state.furniture.push(furniture);
    this.updateBudgetDisplay();
    this.updateRoomManagementButtons();
    this.updateAllButtonStates();
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
    // Check if user is authenticated
    if (!this.authService.isAuthenticated()) {
      this.loginModal.show(() => {
        // After successful login, proceed with AI suggestions
        this.proceedWithAISuggestions();
      });
      return;
    }

    this.proceedWithAISuggestions();
  }

  private async proceedWithAISuggestions(): Promise<void> {
    if (!this.state.roomDimensions) {
      alert('Please create a room first');
      return;
    }

    try {
      const isConnected = await this.decorationAI.testConnection();
      
      if (!isConnected) {
        throw new Error('Cannot connect to Gemini API. Please check your API key.');
      }
      const suggestions = await this.decorationAI.getDecorationSuggestions(
        this.state.roomDimensions,
        this.state.furniture,
        this.state.roomType,
        this.state.budget
      );

      this.displaySuggestions(suggestions);
    } catch (error) {
      console.error('Error getting AI suggestions:', error);
      this.showNotification('AI suggestions unavailable. Please check your API key and try again.', 'error');
      
      // Show empty suggestions section with error message
      const suggestionsDiv = document.getElementById('suggestions')!;
      suggestionsDiv.innerHTML = `
        <div class="suggestions-section">
          <h3>AI Suggestions</h3>
          <div class="suggestion-error">
            <p>Unable to get AI suggestions. Please ensure your Gemini API key is configured correctly.</p>
            <p>Check the console for more details.</p>
          </div>
        </div>
      `;
    }
  }

  private displaySuggestions(suggestions: any[]): void {
    const suggestionsDiv = document.getElementById('suggestions')!;
    suggestionsDiv.innerHTML = `
      <div class="suggestions-section">
        <h3>AI Suggestions</h3>
        <div class="suggestions-list">
          ${suggestions.map((suggestion, index) => `
            <div class="suggestion-item" data-suggestion-index="${index}">
              <div class="suggestion-header">
                <span class="suggestion-name">${suggestion.item}</span>
                <span class="suggestion-cost">$${suggestion.estimatedCost}</span>
              </div>
              <p class="suggestion-description">${suggestion.description}</p>
              <div class="suggestion-meta">
                <span class="suggestion-category">${suggestion.category}</span>
                <span class="suggestion-priority priority-${suggestion.priority}">${suggestion.priority}</span>
              </div>
              <div class="suggestion-actions">
                <button class="btn-small btn-primary add-suggestion-btn" data-suggestion-index="${index}">
                  Add to Room
                </button>
                <button class="btn-small btn-secondary view-details-btn" data-suggestion-index="${index}">
                  View Details
                </button>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;

    // Add event listeners for suggestion actions
    this.setupSuggestionEventListeners(suggestions);
  }

  private setupSuggestionEventListeners(suggestions: any[]): void {
    // Add to room buttons
    document.querySelectorAll('.add-suggestion-btn').forEach(btn => {
      btn.addEventListener('click', async (e) => {
        const index = parseInt((e.target as HTMLElement).dataset.suggestionIndex!);
        const suggestion = suggestions[index];
        await this.addSuggestionToRoom(suggestion);
      });
    });

    // View details buttons
    document.querySelectorAll('.view-details-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const index = parseInt((e.target as HTMLElement).dataset.suggestionIndex!);
        const suggestion = suggestions[index];
        this.showSuggestionDetails(suggestion);
      });
    });
  }

  private async addSuggestionToRoom(suggestion: any): Promise<void> {
    try {
      // Check if user is authenticated
      if (!this.authService.isAuthenticated()) {
        this.loginModal.show(() => {
          this.addSuggestionToRoom(suggestion);
        });
        return;
      }

      // Create furniture template from AI suggestion
      const furnitureTemplate = await this.decorationAI.createFurnitureFromSuggestion(suggestion);
      
      // Add to room using existing furniture system
      const position = {
        x: 0,
        y: furnitureTemplate.dimensions.height / 2,
        z: 0,
        rotation: 0
      };

      const furniture = this.furnitureManager.addFurniture(furnitureTemplate, position);
      if (this.room3D) {
        this.room3D.addFurniture(furniture);
      }
      this.state.furniture.push(furniture);
      this.updateBudgetDisplay();
      this.updateRoomManagementButtons();
      this.updateAllButtonStates();

      this.showNotification(`Added "${furniture.name}" to your room!`, 'success');
      
    } catch (error) {
      console.error('Error adding suggestion to room:', error);
      this.showNotification('Error adding suggestion to room', 'error');
    }
  }

  private showSuggestionDetails(suggestion: any): void {
    // Create a modal or detailed view for the suggestion
    const modal = document.createElement('div');
    modal.className = 'suggestion-modal';
    modal.innerHTML = `
      <div class="modal-content">
        <div class="modal-header">
          <h3>${suggestion.item}</h3>
          <button class="close-modal">&times;</button>
        </div>
        <div class="modal-body">
          <p><strong>Description:</strong> ${suggestion.description}</p>
          <p><strong>Category:</strong> ${suggestion.category}</p>
          <p><strong>Priority:</strong> ${suggestion.priority}</p>
          <p><strong>Estimated Cost:</strong> $${suggestion.estimatedCost}</p>
          ${suggestion.dimensions ? `
            <p><strong>Dimensions:</strong> ${suggestion.dimensions.width}ft × ${suggestion.dimensions.height}ft × ${suggestion.dimensions.depth}ft</p>
          ` : ''}
          ${suggestion.brand ? `
            <p><strong>Brand:</strong> ${suggestion.brand}</p>
          ` : ''}
          ${suggestion.reasoning ? `
            <p><strong>Why this fits:</strong> ${suggestion.reasoning}</p>
          ` : ''}
          ${suggestion.productUrl ? `
            <p><strong>Product Link:</strong> <a href="${suggestion.productUrl}" target="_blank" rel="noopener noreferrer">View Product →</a></p>
          ` : ''}
        </div>
        <div class="modal-footer">
          <button class="btn-primary add-suggestion-btn">Add to Room</button>
          <button class="btn-secondary close-modal">Close</button>
        </div>
      </div>
    `;

    document.body.appendChild(modal);

    // Add event listeners
    modal.querySelector('.close-modal')?.addEventListener('click', () => {
      document.body.removeChild(modal);
    });

    modal.querySelector('.add-suggestion-btn')?.addEventListener('click', async () => {
      await this.addSuggestionToRoom(suggestion);
      document.body.removeChild(modal);
    });

    // Close on background click
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        document.body.removeChild(modal);
      }
    });
  }

  private showNotification(message: string, type: 'success' | 'error'): void {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Auto remove after 3 seconds
    setTimeout(() => {
      if (document.body.contains(notification)) {
        document.body.removeChild(notification);
      }
    }, 3000);
  }

  private toggleEditMode(): void {
    // Check if user is authenticated
    if (!this.authService.isAuthenticated()) {
      this.loginModal.show(() => {
        // After successful login, proceed with edit mode
        this.proceedWithToggleEditMode();
      });
      return;
    }

    this.proceedWithToggleEditMode();
  }

  private proceedWithToggleEditMode(): void {
    this.state.isEditing = !this.state.isEditing;
    const editButton = document.getElementById('edit-mode') as HTMLButtonElement;
    const deleteButton = document.getElementById('delete-selected') as HTMLButtonElement;
    const manipulationControls = document.getElementById('manipulation-controls');
    
    if (this.state.isEditing) {
      editButton.textContent = 'Exit Edit';
      editButton.classList.add('active');
      deleteButton.disabled = false;
      
      // Show manipulation controls
      if (manipulationControls) {
        manipulationControls.style.display = 'block';
      }
      
      // Show drag instructions
      const dragInstructions = document.getElementById('drag-instructions');
      if (dragInstructions) {
        dragInstructions.classList.remove('hidden');
      }
      
      // Show selection instructions
      const selectionInstructions = document.getElementById('selection-instructions');
      if (selectionInstructions) {
        selectionInstructions.classList.remove('hidden');
      }
      
      // Add drag mode class to viewport
      const viewport = document.getElementById('3d-viewport');
      if (viewport) {
        viewport.classList.add('drag-mode');
      }
      
      this.setManipulationMode('move');
    } else {
      editButton.textContent = 'Edit Mode';
      editButton.classList.remove('active');
      deleteButton.disabled = true;
      this.state.selectedFurniture = null;
      
      // Hide manipulation controls
      if (manipulationControls) {
        manipulationControls.style.display = 'none';
      }
      
      // Hide drag instructions
      const dragInstructions = document.getElementById('drag-instructions');
      if (dragInstructions) {
        dragInstructions.classList.add('hidden');
      }
      
      // Hide selection instructions
      const selectionInstructions = document.getElementById('selection-instructions');
      if (selectionInstructions) {
        selectionInstructions.classList.add('hidden');
      }
      
      // Remove drag mode class from viewport
      const viewport = document.getElementById('3d-viewport');
      if (viewport) {
        viewport.classList.remove('drag-mode', 'dragging');
      }
      
      if (this.room3D) {
        this.room3D.setManipulationMode('none');
      }
    }
  }

  private deleteSelectedFurniture(): void {
    // Check if user is authenticated
    if (!this.authService.isAuthenticated()) {
      this.loginModal.show(() => {
        // After successful login, proceed with deleting furniture
        this.proceedWithDeleteSelectedFurniture();
      });
      return;
    }

    this.proceedWithDeleteSelectedFurniture();
  }

  private proceedWithDeleteSelectedFurniture(): void {
    if (!this.state.selectedFurniture) {
      alert('Please select a furniture item first');
      return;
    }

    if (confirm(`Are you sure you want to delete "${this.state.selectedFurniture.name}"?`)) {
      // Remove from furniture manager
      this.furnitureManager.removeFurniture(this.state.selectedFurniture.id);
      
      // Remove from 3D scene
      if (this.room3D) {
        this.room3D.removeFurniture(this.state.selectedFurniture.id);
      }
      
      // Remove from state
      this.state.furniture = this.state.furniture.filter(f => f.id !== this.state.selectedFurniture!.id);
      this.state.selectedFurniture = null;
      
      // Update budget display
      this.updateBudgetDisplay();
      
      this.updateRoomManagementButtons();
      this.updateAllButtonStates();
    }
  }

  private resetCameraView(): void {
    // Check if user is authenticated
    if (!this.authService.isAuthenticated()) {
      this.loginModal.show(() => {
        // After successful login, proceed with resetting camera
        this.proceedWithResetCameraView();
      });
      return;
    }

    this.proceedWithResetCameraView();
  }

  private proceedWithResetCameraView(): void {
    if (!this.state.roomDimensions || !this.room3D) {
      alert('Please create a room first');
      return;
    }

    this.room3D.resetView();
  }

  private toggleBoundingBoxes(): void {
    if (!this.room3D) {
      alert('Please create a room first');
      return;
    }

    const button = document.getElementById('toggle-bounding-boxes') as HTMLButtonElement;
    const isCurrentlyVisible = button.textContent === 'Hide Bounding Boxes';
    
    this.room3D.toggleBoundingBoxes(!isCurrentlyVisible);
    
    button.textContent = isCurrentlyVisible ? 'Show Bounding Boxes' : 'Hide Bounding Boxes';
  }

  private publishDesign(): void {
    if (!this.state.roomDimensions || this.state.furniture.length === 0) {
      alert('Please create a room and add some furniture before publishing.');
      return;
    }

    // User should already be authenticated to reach this point
    // since they needed to be authenticated to create room and add furniture
    this.proceedWithPublishing();
  }

  private proceedWithPublishing(): void {
    if (!this.state.roomDimensions) {
      alert('Room dimensions are required for publishing.');
      return;
    }

    let thumbnail = '';
    if (this.room3D) {
      try {
        thumbnail = this.room3D.captureThumbnail();
      } catch (error) {
        console.error('Error capturing thumbnail:', error);
      }
    }

    const designData = {
      roomDimensions: this.state.roomDimensions,
      furniture: this.state.furniture,
      budget: this.state.budget,
      roomType: this.state.roomType,
      thumbnail: thumbnail
    };

    this.publishDialog.show(designData, (designId) => {
      this.state.isPublished = true;
      this.updateRoomManagementButtons();
      this.showGallery();
    });
  }

  private toggleGallery(): void {
    // Check if user is authenticated
    if (!this.authService.isAuthenticated()) {
      this.loginModal.show(() => {
        // After successful login, proceed with gallery
        this.proceedWithToggleGallery();
      });
      return;
    }

    this.proceedWithToggleGallery();
  }

  private proceedWithToggleGallery(): void {
    if (this.currentView === 'builder') {
      this.showGallery();
    } else {
      this.showBuilder();
    }
  }

  private showGallery(): void {
    this.currentView = 'gallery';
    
    // Hide the main content and show gallery
    const mainContent = document.querySelector('.main-content') as HTMLElement;
    mainContent.innerHTML = '<div id="gallery-container"></div>';
    
    // Initialize and show the gallery
    const galleryContainer = document.getElementById('gallery-container')!;
    this.designGallery = new DesignGallery(galleryContainer, this.authService);
    this.designGallery.initialize();

    galleryContainer.addEventListener('designSelected', (e: any) => {
      const design = e.detail.design;
      this.loadDesignFromGallery(design);
    });

    // Listen for navigation events
    galleryContainer.addEventListener('navigateToBuilder', (e: any) => {
      const action = e.detail.action;
      if (action === 'createNewRoom') {
        this.showBuilder();
        this.resetToInitialState();
      } else if (action === 'backToBuilder') {
        this.showBuilder();
      }
    });

    // Update button text
    const browseBtn = document.getElementById('browse-designs') as HTMLButtonElement;
    browseBtn.textContent = 'Back to Builder';
  }

  private showBuilder(): void {
    this.currentView = 'builder';
    
    // Restore the main content
    const mainContent = document.querySelector('.main-content') as HTMLElement;
    mainContent.innerHTML = `
      <div id="3d-viewport"></div>
      <div class="drag-instructions hidden" id="drag-instructions">
        <strong>Drag Mode:</strong> Click and drag furniture to move them around the room
      </div>
      <div class="selection-instructions hidden" id="selection-instructions">
        <strong>Selection Mode:</strong> Click furniture to select, then use colored handles to move along specific axes
        <br><span class="handle-x">Red = X-axis</span> | <span class="handle-y">Green = Y-axis</span> | <span class="handle-z">Blue = Z-axis</span>
        <br><strong>Rotation:</strong> <span class="handle-x">Red sphere = X-rotation</span> | <span class="handle-y">Green sphere = Y-rotation</span> | <span class="handle-z">Blue sphere = Z-rotation</span>
      </div>
      <div class="controls">
        <button id="get-suggestions" class="btn-secondary">Get AI Suggestions</button>
        <button id="edit-mode" class="btn-secondary" disabled>Edit Mode</button>
        <button id="delete-selected" class="btn-secondary" disabled>Delete Selected</button>
        <button id="reset-view" class="btn-secondary">Reset View</button>
        <button id="toggle-bounding-boxes" class="btn-secondary">Show Bounding Boxes</button>
        <button id="publish-design" class="btn-primary">Publish Design</button>
        <button id="browse-designs" class="btn-secondary">
          <i class="icon-community"></i> Browse Community
        </button>
      </div>
      <div class="manipulation-controls" id="manipulation-controls" style="display: none;">
        <div class="manipulation-mode-buttons">
          <button id="manipulation-mode-move" class="btn-manipulation active" data-mode="move">
            <i class="icon-move"></i> Move
          </button>
          <button id="manipulation-mode-rotate" class="btn-manipulation" data-mode="rotate">
            <i class="icon-rotate"></i> Rotate
          </button>
          <button id="manipulation-mode-delete" class="btn-manipulation" data-mode="delete">
            <i class="icon-delete"></i> Delete
          </button>
        </div>
        <div class="manipulation-actions" id="manipulation-actions" style="display: none;">
          <div class="position-controls">
            <label>Position:</label>
            <div class="position-inputs">
              <input type="number" id="position-x" placeholder="X" step="0.1">
              <input type="number" id="position-y" placeholder="Y" step="0.1">
              <input type="number" id="position-z" placeholder="Z" step="0.1">
              <button id="apply-position" class="btn-small">Apply</button>
            </div>
          </div>
          <div class="rotation-controls">
            <label>Rotation:</label>
            <div class="rotation-buttons">
              <button id="rotate-left" class="btn-small">↺ 45°</button>
              <button id="rotate-right" class="btn-small">↻ 45°</button>
            </div>
          </div>
          <div class="drag-settings">
            <label>Drag Settings:</label>
            <div class="drag-options">
              <label class="checkbox-label">
                <input type="checkbox" id="snap-to-grid" checked>
                <span>Snap to Grid (0.5 units)</span>
              </label>
            </div>
          </div>
        </div>
      </div>
      <div class="instructions">
        <p><strong>3D Controls:</strong> Mouse to rotate, scroll to zoom, right-click + drag to pan</p>
        <p><strong>Furniture:</strong> Click items in the sidebar to add them to your room</p>
      </div>
    `;

    // Re-setup event listeners and room management
    this.setupEventListeners();
    this.setupRoomManagement();
    this.updateRoomManagementButtons();

    // Re-initialize 3D viewport if room exists
    if (this.state.roomDimensions) {
      try {
        const viewport = document.getElementById('3d-viewport')!;
        this.room3D = new Room3D(viewport, this);
        this.room3D.createRoom(this.state.roomDimensions);
        
        // Re-add furniture
        this.state.furniture.forEach(furniture => {
          if (this.room3D) {
            this.room3D.addFurniture(furniture);
          }
        });
        
        console.log('3D viewport re-initialized successfully');
      } catch (error) {
        console.error('Error re-initializing 3D viewport:', error);
        // Don't show alert here as it might be called during navigation
      }
    }

    // Update button text and states
    const browseBtn = document.getElementById('browse-designs') as HTMLButtonElement;
    browseBtn.textContent = 'Browse Community';
    
    // Update all button states
    this.updateAllButtonStates();
  }

  private loadDesignFromGallery(design: any): void {
    this.showBuilder();
    
    this.state.roomDimensions = design.roomDimensions;
    this.state.furniture = design.furniture;
    this.state.budget = design.budget;
    this.state.roomType = design.roomType;
    this.state.isPublished = false;

    // Update the UI
    this.updateBudgetDisplay();
    
    if (this.state.roomDimensions) {
      try {
        const viewport = document.getElementById('3d-viewport')!;
        viewport.style.width = '100%';
        viewport.style.height = 'calc(100vh - 70px)';
        
        setTimeout(() => {
          this.room3D = new Room3D(viewport, this);
          if (this.state.roomDimensions) {
            this.room3D.createRoom(this.state.roomDimensions);
          }
          
          this.state.furniture.forEach(furniture => {
            if (this.room3D) {
              this.room3D.addFurniture(furniture);
            }
          });
          
          this.updateRoomManagementButtons();
          this.updateAllButtonStates();
        }, 100);
        
      } catch (error) {
        console.error('Error loading design into 3D viewport:', error);
        alert('Error loading design. Please try again.');
      }
    }
  }

  // Removed unused saveDesign method - using publishDesign instead

  private setupUserProfile(): void {
    const userProfileContainer = document.getElementById('user-profile')!;
    this.userProfile = new UserProfile(userProfileContainer, this.authService);
    this.userProfile.render();

    // Listen for login requests
    userProfileContainer.addEventListener('requestLogin', () => {
      this.loginModal.show(() => {
        // Refresh user profile after login
        this.userProfile.refresh();
      });
    });
  }

  private setupAuthStateListener(): void {
    // Listen for authentication state changes
    this.authService.onAuthStateChange(() => {
      // Refresh user profile when auth state changes
      if (this.userProfile) {
        this.userProfile.refresh();
      }
      
      // Update all button states based on authentication
      this.updateAllButtonStates();
    });
  }

  private updatePublishButtonState(): void {
    const publishBtn = document.getElementById('publish-design') as HTMLButtonElement;
    if (publishBtn) {
      publishBtn.textContent = 'Publish Design';
      publishBtn.title = 'Publish your design to the community';
      publishBtn.disabled = false; // Keep enabled to allow sign-in
    }
  }

  private updateAllButtonStates(): void {
    const isAuthenticated = this.authService.isAuthenticated();
    
    // Update publish button
    this.updatePublishButtonState();
    
    // Update create room button
    const createRoomBtn = document.getElementById('create-room') as HTMLButtonElement;
    if (createRoomBtn) {
      createRoomBtn.textContent = 'Create Room';
      createRoomBtn.title = 'Create a new room';
      createRoomBtn.disabled = false; // Keep enabled to allow sign-in
    }
    
    // Update AI suggestions button
    const aiBtn = document.getElementById('get-suggestions') as HTMLButtonElement;
    if (aiBtn) {
      aiBtn.textContent = 'Get AI Suggestions';
      aiBtn.title = 'Get AI-powered decoration suggestions';
      aiBtn.disabled = false; // Keep enabled to allow sign-in
    }
    
    // Update browse designs button
    const browseBtn = document.getElementById('browse-designs') as HTMLButtonElement;
    if (browseBtn) {
      browseBtn.textContent = 'Browse Community';
      browseBtn.title = 'Browse community designs';
      browseBtn.disabled = false; // Keep enabled to allow sign-in
    }
    
    // Update edit mode button
    const editBtn = document.getElementById('edit-mode') as HTMLButtonElement;
    if (editBtn) {
      const hasRoom = this.state.roomDimensions !== null;
      const hasFurniture = this.state.furniture.length > 0;
      const canEdit = isAuthenticated && hasRoom && hasFurniture;
      
      editBtn.disabled = !canEdit;
      editBtn.title = canEdit ? 'Edit furniture in your room' : 'Create a room and add furniture first';
      
      if (!canEdit) {
        editBtn.textContent = 'Edit Mode';
        editBtn.classList.remove('active');
      }
    }
    
    // Update room management buttons
    const clearBtn = document.getElementById('clear-room-btn') as HTMLButtonElement;
    const deleteBtn = document.getElementById('delete-room-btn') as HTMLButtonElement;
    
    if (clearBtn) {
      clearBtn.textContent = 'Clear Room';
      clearBtn.title = 'Remove all furniture from the room';
      clearBtn.disabled = !isAuthenticated || !this.state.roomDimensions || this.state.furniture.length === 0;
    }
    
    if (deleteBtn) {
      deleteBtn.textContent = 'Delete Room';
      deleteBtn.title = 'Delete the current room and start over';
      deleteBtn.disabled = !isAuthenticated;
    }
  }


  private deleteCurrentRoom(): void {
    // Check if user is authenticated
    if (!this.authService.isAuthenticated()) {
      this.loginModal.show(() => {
        // After successful login, proceed with deleting room
        this.proceedWithDeleteRoom();
      });
      return;
    }

    this.proceedWithDeleteRoom();
  }

  private proceedWithDeleteRoom(): void {
    if (!this.state.roomDimensions) {
      // If no room exists, just reset to initial state
      console.log('No room to delete, resetting to initial state...');
      this.resetToInitialState();
      return;
    }

    if (confirm('Are you sure you want to delete the current room? This will remove all furniture and reset the design.')) {
      console.log('Deleting current room...');
      this.resetToInitialState();
      console.log('Room deleted successfully');
    }
  }

  private resetToInitialState(): void {
    // Reset the application state
    this.state = {
      roomDimensions: null,
      furniture: [],
      selectedFurniture: null,
      isEditing: false,
      budget: 1000,
      roomType: 'living',
      isPublished: false
    };

    // Safely clear the 3D viewport without breaking it
    this.safelyClearViewport();

    // Show room setup form and hide furniture palette
    const roomSetup = document.getElementById('room-setup');
    const furniturePalette = document.getElementById('furniture-palette');
    
    if (roomSetup) roomSetup.style.display = 'block';
    if (furniturePalette) furniturePalette.style.display = 'none';

    // Update budget display
    this.updateBudgetDisplay();

    // Update room management buttons
    this.updateRoomManagementButtons();
    this.updateAllButtonStates(); // Update all buttons including Edit Mode

    console.log('Reset to initial state - ready for new room setup');
  }

  private clearCurrentRoom(): void {
    // Check if user is authenticated
    if (!this.authService.isAuthenticated()) {
      this.loginModal.show(() => {
        // After successful login, proceed with clearing room
        this.proceedWithClearRoom();
      });
      return;
    }

    this.proceedWithClearRoom();
  }

  private proceedWithClearRoom(): void {
    if (!this.state.roomDimensions) {
      alert('No room to clear');
      return;
    }

    if (confirm('Are you sure you want to clear all furniture from the current room? The room will remain but all furniture will be removed.')) {
      console.log('Clearing furniture from current room...');
      
      // Clear furniture from 3D scene first
      if (this.room3D) {
        this.room3D.clearAllFurniture();
      }
      
      // Clear furniture from state and manager
      this.state.furniture = [];
      this.furnitureManager = new FurnitureManager(); // Reset furniture manager

      // Update budget display
      this.updateBudgetDisplay();

      this.updateRoomManagementButtons();
      this.updateAllButtonStates();
    }
  }

  private updateRoomManagementButtons(): void {
    const deleteBtn = document.getElementById('delete-room-btn') as HTMLButtonElement;
    const clearBtn = document.getElementById('clear-room-btn') as HTMLButtonElement;
    
    // Delete Room button is always enabled (can reset to initial state)
    if (deleteBtn) {
      deleteBtn.disabled = false;
    }
    
    // Clear Room button is disabled if room is published or if no room/furniture
    if (clearBtn) {
      const isDisabled = this.state.isPublished || 
                        !this.state.roomDimensions || 
                        this.state.furniture.length === 0;
      clearBtn.disabled = isDisabled;
      
      // Update button text and title based on published state
      if (this.state.isPublished) {
        clearBtn.textContent = 'Room Published';
        clearBtn.title = 'Cannot clear room after publishing';
        clearBtn.classList.add('published-disabled');
      } else {
        clearBtn.textContent = 'Clear Room';
        clearBtn.title = 'Remove all furniture from the room';
        clearBtn.classList.remove('published-disabled');
      }
    }
    
    this.updateAllButtonStates();
  }

  private safelyClearViewport(): void {
    try {
      const viewport = document.getElementById('3d-viewport');
      if (!viewport) return;

      viewport.innerHTML = '';
      this.room3D = null;
    } catch (error) {
      console.error('Error clearing viewport:', error);
      const viewport = document.getElementById('3d-viewport');
      if (viewport) {
        viewport.innerHTML = '';
      }
    }
  }

  // ===== MANIPULATION SYSTEM =====

  /**
   * Set the manipulation mode
   */
  private setManipulationMode(mode: 'move' | 'rotate' | 'delete'): void {
    if (!this.room3D) return;

    // Set mode in Room3D
    this.room3D.setManipulationMode(mode);

    this.updateManipulationUI(mode);
  }

  /**
   * Update manipulation UI based on mode
   */
  private updateManipulationUI(mode: string): void {
    // Update active button
    document.querySelectorAll('.btn-manipulation').forEach(btn => {
      btn.classList.remove('active');
    });
    document.querySelector(`[data-mode="${mode}"]`)?.classList.add('active');

    // Show/hide manipulation controls
    const manipulationControls = document.getElementById('manipulation-controls');
    const manipulationActions = document.getElementById('manipulation-actions');
    
    if (manipulationControls) {
      manipulationControls.style.display = 'block';
    }

    if (manipulationActions) {
      manipulationActions.style.display = mode === 'move' || mode === 'rotate' ? 'block' : 'none';
    }
  }

  /**
   * Handle furniture selection
   */
  private onFurnitureSelected(detail: { furnitureId: string; mode: string }): void {
    this.state.selectedFurniture = this.state.furniture.find(f => f.id === detail.furnitureId) || null;
    
    if (detail.mode === 'move' && this.state.selectedFurniture) {
      this.updatePositionInputs();
    }
  }

  /**
   * Handle furniture deselection
   */
  private onFurnitureDeselected(_detail: { mode: string }): void {
    this.state.selectedFurniture = null;
  }

  /**
   * Handle furniture drag completion
   */
  private onFurnitureDragged(detail: { furnitureId: string; position: { x: number; y: number; z: number } }): void {
    const furniture = this.state.furniture.find(f => f.id === detail.furnitureId);
    if (furniture) {
      furniture.x = detail.position.x;
      furniture.y = detail.position.y;
      furniture.z = detail.position.z;
    }
  }

  /**
   * Handle furniture deletion
   */
  private onFurnitureDeleted(detail: { furnitureId: string }): void {
    this.furnitureManager.removeFurniture(detail.furnitureId);
    this.state.furniture = this.state.furniture.filter(f => f.id !== detail.furnitureId);
    this.state.selectedFurniture = null;
    this.updateBudgetDisplay();
    this.updateRoomManagementButtons();
    this.updateAllButtonStates();
  }

  /**
   * Update position input fields with current furniture position
   */
  private updatePositionInputs(): void {
    if (!this.room3D || !this.state.selectedFurniture) return;

    const position = this.room3D.getFurniturePosition(this.state.selectedFurniture.id);
    if (position) {
      const xInput = document.getElementById('position-x') as HTMLInputElement;
      const yInput = document.getElementById('position-y') as HTMLInputElement;
      const zInput = document.getElementById('position-z') as HTMLInputElement;

      if (xInput) xInput.value = position.x.toFixed(1);
      if (yInput) yInput.value = position.y.toFixed(1);
      if (zInput) zInput.value = position.z.toFixed(1);
    }
  }

  /**
   * Apply new position to selected furniture
   */
  private applyPosition(): void {
    if (!this.room3D || !this.state.selectedFurniture) return;

    const xInput = document.getElementById('position-x') as HTMLInputElement;
    const yInput = document.getElementById('position-y') as HTMLInputElement;
    const zInput = document.getElementById('position-z') as HTMLInputElement;

    const newPosition = {
      x: parseFloat(xInput.value) || 0,
      y: parseFloat(yInput.value) || 0,
      z: parseFloat(zInput.value) || 0
    };

    const success = this.room3D.moveFurniture(this.state.selectedFurniture.id, newPosition);
    
    if (success) {
      // Update furniture position in state
      const furniture = this.state.furniture.find(f => f.id === this.state.selectedFurniture!.id);
      if (furniture) {
        furniture.x = newPosition.x;
        furniture.y = newPosition.y;
        furniture.z = newPosition.z;
      }
    } else {
      alert('Cannot move furniture to that position - it would be outside room boundaries!');
    }
  }

  /**
   * Rotate selected furniture
   */
  private rotateSelectedFurniture(direction: 'clockwise' | 'counterclockwise'): void {
    if (!this.room3D || !this.state.selectedFurniture) return;

    const success = this.room3D.rotateFurniture(this.state.selectedFurniture.id, direction);
    
    if (success) {
      // Update furniture rotation in state
      const furniture = this.state.furniture.find(f => f.id === this.state.selectedFurniture!.id);
      if (furniture) {
        furniture.rotation = this.room3D.getFurnitureRotation(this.state.selectedFurniture.id);
      }
    }
  }

  /**
   * Update furniture rotation in state (called from Room3D)
   */
  updateFurnitureRotation(furnitureId: string, rotation: number): void {
    const furniture = this.state.furniture.find(f => f.id === furnitureId);
    if (furniture) {
      furniture.rotation = rotation;
    }
  }

}
