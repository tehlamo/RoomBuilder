import { Room3D } from './Room3D';
import { FirestoreService } from '../services/FirestoreService';
import type { PublishedDesign } from '../types/Firestore';

export class DesignViewer {
  private container: HTMLElement;
  private firestoreService: FirestoreService;
  private room3D: Room3D | null = null;
  private currentDesign: PublishedDesign | null = null;

  constructor(container: HTMLElement) {
    this.container = container;
    this.firestoreService = new FirestoreService();
  }

  async loadDesign(designId: string): Promise<void> {
    try {
      // Show loading state
      this.showLoading();

      // Get design data
      const design = await this.firestoreService.getDesign(designId);
      if (!design) {
        throw new Error('Design not found');
      }

      this.currentDesign = design;
      this.renderDesignView(design);

      // Initialize 3D scene
      await this.initialize3DScene(design);

      // Increment view count
      await this.firestoreService.incrementViews(designId);

    } catch (error) {
      console.error('Error loading design:', error);
      this.showError('Failed to load design. Please try again.');
    }
  }

  private showLoading(): void {
    this.container.innerHTML = `
      <div class="design-viewer-loading">
        <div class="loading-spinner"></div>
        <p>Loading design...</p>
      </div>
    `;
  }

  private showError(message: string): void {
    this.container.innerHTML = `
      <div class="design-viewer-error">
        <div class="error-icon">⚠️</div>
        <h3>Error</h3>
        <p>${message}</p>
        <button class="btn-primary" onclick="window.history.back()">Go Back</button>
      </div>
    `;
  }

  private renderDesignView(design: PublishedDesign): void {
    const authorName = design.author?.displayName || 'Anonymous';
    const authorAvatar = design.author?.photoURL || '';
    const createdAt = new Date(design.createdAt).toLocaleDateString();
    
    this.container.innerHTML = `
      <div class="design-viewer">
        <div class="design-viewer-header">
          <div class="design-info">
            <h1 class="design-title">${design.title}</h1>
            <p class="design-description">${design.description}</p>
            <div class="design-meta">
              <span class="design-room-type">${design.roomType}</span>
              <span class="design-budget">$${design.budget.toLocaleString()}</span>
              <span class="design-date">${createdAt}</span>
            </div>
            <div class="design-stats">
              <span class="stat"><i class="icon-heart"></i> ${design.likes}</span>
              <span class="stat"><i class="icon-eye"></i> ${design.views}</span>
              <span class="stat"><i class="icon-comment"></i> ${design.commentsCount || 0}</span>
            </div>
          </div>
          <div class="design-author">
            <div class="author-info">
              ${authorAvatar ? `<img src="${authorAvatar}" alt="${authorName}" class="author-avatar">` : `<div class="default-avatar"><i class="icon-user"></i></div>`}
              <div class="author-details">
                <span class="author-name">${authorName}</span>
                <span class="author-email">${design.author?.email || ''}</span>
              </div>
            </div>
          </div>
          <div class="design-actions">
            <button class="btn-secondary" id="like-design">
              <i class="icon-heart"></i> Like (${design.likes})
            </button>
            <button class="btn-secondary" id="load-in-builder">
              <i class="icon-edit"></i> Load in Builder
            </button>
            <button class="btn-secondary" id="go-back">
              <i class="icon-arrow-left"></i> Back to Gallery
            </button>
          </div>
        </div>
        
        <div class="design-viewer-content">
          <div class="design-3d-viewer">
            <div id="design-3d-viewport"></div>
            <div class="design-3d-controls">
              <div class="control-instructions">
                <p><strong>3D Controls:</strong> Mouse to rotate, scroll to zoom, right-click + drag to pan</p>
              </div>
            </div>
          </div>
          
          <div class="design-details">
            <div class="furniture-list">
              <h3>Furniture in this Design</h3>
              <div class="furniture-items">
                ${design.furniture.map(item => `
                  <div class="furniture-item-detail">
                    <div class="furniture-preview" style="background-color: #${item.color.toString(16).padStart(6, '0')}"></div>
                    <div class="furniture-info">
                      <span class="furniture-name">${item.name}</span>
                      <span class="furniture-price">$${item.price || 'N/A'}</span>
                    </div>
                  </div>
                `).join('')}
              </div>
            </div>
            
            <div class="design-tags">
              <h3>Tags</h3>
              <div class="tag-list">
                ${design.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
              </div>
            </div>
          </div>
        </div>
      </div>
    `;

    this.setupEventListeners(design);
  }

  private async initialize3DScene(design: PublishedDesign): Promise<void> {
    const viewport = document.getElementById('design-3d-viewport');
    if (!viewport) return;

    try {
      this.room3D = new Room3D(viewport);
      this.room3D.createRoom(design.roomDimensions);
      
      // Add furniture
      design.furniture.forEach(furniture => {
        this.room3D.addFurniture(furniture);
      });
    } catch (error) {
      console.error('Error initializing 3D scene:', error);
    }
  }

  private setupEventListeners(design: PublishedDesign): void {
    // Like button
    document.getElementById('like-design')?.addEventListener('click', async () => {
      await this.handleLike(design.id);
    });

    // Load in builder button
    document.getElementById('load-in-builder')?.addEventListener('click', () => {
      this.loadInBuilder(design);
    });

    // Go back button
    document.getElementById('go-back')?.addEventListener('click', () => {
      window.history.back();
    });
  }

  private async handleLike(designId: string): Promise<void> {
    try {
      await this.firestoreService.likeDesign(designId);
      // Update the like button
      const likeBtn = document.getElementById('like-design');
      if (likeBtn) {
        likeBtn.innerHTML = '<i class="icon-heart"></i> Liked!';
        likeBtn.classList.add('liked');
      }
    } catch (error) {
      console.error('Error liking design:', error);
    }
  }

  private loadInBuilder(design: PublishedDesign): void {
    // Emit event to switch back to builder with this design
    this.container.dispatchEvent(new CustomEvent('loadDesignInBuilder', {
      detail: { design }
    }));
  }

  // Cleanup method
  public destroy(): void {
    if (this.room3D) {
      // Clean up 3D resources if needed
      this.room3D = null;
    }
  }
}
