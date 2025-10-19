import type { PublishedDesign, DesignFilters } from '../types/Firestore';
import { FirestoreService } from '../services/FirestoreService';
import { DesignViewer } from './DesignViewer';

export class DesignGallery {
  private firestoreService: FirestoreService;
  private container: HTMLElement;
  private currentFilters: DesignFilters;
  private lastDoc: any = null;
  private hasMore: boolean = true;

  constructor(container: HTMLElement) {
    this.container = container;
    this.firestoreService = new FirestoreService();
    this.currentFilters = {
      sortBy: 'newest',
      limit: 12
    };
  }

  async initialize(): Promise<void> {
    console.log('Initializing DesignGallery...');
    this.renderGallery();
    this.setupEventListeners();
    await this.loadDesigns(true); // Reset on initial load
    console.log('DesignGallery initialization complete');
  }

  private renderGallery(): void {
    this.container.innerHTML = `
      <div class="gallery-container">
        <div class="gallery-header">
          <div class="gallery-title-section">
            <h2>Community Designs</h2>
            <div class="gallery-actions">
              <button id="create-new-room" class="btn-primary">
                <i class="icon-plus"></i> Create New Room
              </button>
              <button id="back-to-builder" class="btn-secondary">
                <i class="icon-arrow-left"></i> Back to Builder
              </button>
            </div>
          </div>
          <div class="debug-actions" style="margin-bottom: 15px;">
            <button id="create-test-design" class="btn-secondary" style="font-size: 12px; padding: 5px 10px;">
              Create Test Design
            </button>
          </div>
          <div class="gallery-filters">
            <select id="room-type-filter" class="filter-select">
              <option value="">All Room Types</option>
              <option value="living">Living Room</option>
              <option value="bedroom">Bedroom</option>
              <option value="kitchen">Kitchen</option>
              <option value="bathroom">Bathroom</option>
              <option value="office">Office</option>
              <option value="dining">Dining Room</option>
            </select>
            <select id="sort-filter" class="filter-select">
              <option value="newest">Newest</option>
              <option value="popular">Most Popular</option>
              <option value="likes">Most Liked</option>
              <option value="views">Most Viewed</option>
            </select>
            <div class="budget-filter">
              <label>Budget Range:</label>
              <input type="number" id="budget-min" placeholder="Min" min="0">
              <span>-</span>
              <input type="number" id="budget-max" placeholder="Max" min="0">
            </div>
          </div>
        </div>
        <div class="gallery-grid" id="designs-grid">
          <!-- Designs will be loaded here -->
        </div>
        <div class="gallery-loading" id="loading-indicator" style="display: none;">
          <div class="spinner"></div>
          <p>Loading more designs...</p>
        </div>
        <button id="load-more-btn" class="btn-primary" style="display: none;">Load More</button>
      </div>
    `;
  }

  private async loadDesigns(reset: boolean = true): Promise<void> {
    console.log('DesignGallery: loadDesigns called with reset:', reset);
    
    if (reset) {
      this.lastDoc = null;
      this.hasMore = true;
      document.getElementById('designs-grid')!.innerHTML = '';
      console.log('DesignGallery: Reset state, cleared grid');
    }

    if (!this.hasMore) {
      console.log('DesignGallery: No more designs to load, returning');
      return;
    }

    try {
      document.getElementById('loading-indicator')!.style.display = 'block';
      document.getElementById('load-more-btn')!.style.display = 'none';

      const filters = { ...this.currentFilters, lastDoc: this.lastDoc };
      console.log('Loading designs with filters:', filters);
      
      const result = await this.firestoreService.getPublicDesigns(filters);
      console.log('DesignGallery: Firestore result:', result);
      console.log('DesignGallery: Number of designs loaded:', result.designs.length);
      console.log('DesignGallery: Has more:', result.hasMore);

      this.lastDoc = result.lastDoc;
      this.hasMore = result.hasMore;

      if (reset) {
        document.getElementById('designs-grid')!.innerHTML = '';
      }

      if (result.designs.length === 0) {
        console.log('DesignGallery: No designs found, showing no designs message');
        // Only show no designs message if this is a reset (first load)
        if (reset) {
          this.showNoDesignsMessage();
        }
      } else {
        console.log('DesignGallery: Found designs, adding cards:', result.designs.length);
        result.designs.forEach(design => {
          console.log('DesignGallery: Adding design card for:', design.title);
          this.addDesignCard(design);
        });
      }

      if (this.hasMore) {
        document.getElementById('load-more-btn')!.style.display = 'block';
      }

    } catch (error) {
      console.error('Error loading designs:', error);
      this.showError('Failed to load designs. Please try again.');
    } finally {
      document.getElementById('loading-indicator')!.style.display = 'none';
    }
  }

  private addDesignCard(design: PublishedDesign): void {
    console.log('DesignGallery: addDesignCard called for:', design.title);
    const grid = document.getElementById('designs-grid')!;
    if (!grid) {
      console.error('DesignGallery: designs-grid element not found!');
      return;
    }
    const card = document.createElement('div');
    card.className = 'design-card';
    card.innerHTML = `
      <div class="design-thumbnail" style="background-color: #f0f0f0;">
        ${design.thumbnail ? `<img src="${design.thumbnail}" alt="${design.title}">` : '<div class="placeholder-thumbnail">3D Preview</div>'}
      </div>
      <div class="design-info">
        <h3 class="design-title">${design.title}</h3>
        <p class="design-description">${design.description}</p>
        <div class="design-meta">
          <span class="design-room-type">${design.roomType}</span>
          <span class="design-budget">$${design.budget}</span>
        </div>
        <div class="design-stats">
          <span class="stat">
            <i class="icon-heart"></i> ${design.likes}
          </span>
          <span class="stat">
            <i class="icon-eye"></i> ${design.views}
          </span>
          <span class="stat">
            <i class="icon-furniture"></i> ${design.furniture.length}
          </span>
        </div>
        <div class="design-author">
          <img src="${design.author.photoURL || '/default-avatar.png'}" alt="${design.author.displayName}" class="author-avatar">
          <span class="author-name">${design.author.displayName}</span>
        </div>
        <div class="design-actions">
          <button class="btn-secondary view-design-btn" data-design-id="${design.id}">Load Design</button>
          <button class="btn-primary like-design-btn" data-design-id="${design.id}">
            <i class="icon-heart"></i> Like
          </button>
        </div>
      </div>
    `;

    grid.appendChild(card);
    console.log('DesignGallery: Card added to grid, total cards:', grid.children.length);
  }

  private setupEventListeners(): void {
    // Filter changes
    document.getElementById('room-type-filter')?.addEventListener('change', (e) => {
      const value = (e.target as HTMLSelectElement).value;
      this.currentFilters.roomType = value || undefined;
      this.loadDesigns(true);
    });

    document.getElementById('sort-filter')?.addEventListener('change', (e) => {
      const value = (e.target as HTMLSelectElement).value;
      this.currentFilters.sortBy = value as any;
      this.loadDesigns(true);
    });

    // Budget filter
    const budgetMin = document.getElementById('budget-min') as HTMLInputElement;
    const budgetMax = document.getElementById('budget-max') as HTMLInputElement;

    budgetMin?.addEventListener('input', () => {
      this.currentFilters.budgetMin = budgetMin.value ? parseFloat(budgetMin.value) : undefined;
      this.loadDesigns(true);
    });

    budgetMax?.addEventListener('input', () => {
      this.currentFilters.budgetMax = budgetMax.value ? parseFloat(budgetMax.value) : undefined;
      this.loadDesigns(true);
    });

    // Load more button
    document.getElementById('load-more-btn')?.addEventListener('click', () => {
      this.loadDesigns(false);
    });

    // Test design button
    document.getElementById('create-test-design')?.addEventListener('click', async () => {
      try {
        await this.firestoreService.createTestDesign();
        console.log('Test design created, reloading gallery...');
        await this.loadDesigns(true);
      } catch (error) {
        console.error('Error creating test design:', error);
      }
    });

    // Navigation buttons
    document.getElementById('create-new-room')?.addEventListener('click', () => {
      this.container.dispatchEvent(new CustomEvent('navigateToBuilder', {
        detail: { action: 'createNewRoom' }
      }));
    });

    document.getElementById('back-to-builder')?.addEventListener('click', () => {
      this.container.dispatchEvent(new CustomEvent('navigateToBuilder', {
        detail: { action: 'backToBuilder' }
      }));
    });

    // Design card interactions
    document.addEventListener('click', (e) => {
      const target = e.target as HTMLElement;
      console.log('DesignGallery: Click event on:', target.className, target.tagName);
      
      if (target.classList.contains('view-design-btn')) {
        const designId = target.getAttribute('data-design-id');
        console.log('DesignGallery: View design button clicked, designId:', designId);
        if (designId) {
          this.viewDesign(designId);
        }
      }

      if (target.classList.contains('like-design-btn')) {
        const designId = target.getAttribute('data-design-id');
        if (designId) {
          this.likeDesign(designId, target);
        }
      }
    });
  }

  private async viewDesign(designId: string): Promise<void> {
    try {
      console.log('DesignGallery: Viewing design with ID:', designId);
      
      // Get the design data first
      const design = await this.firestoreService.getDesign(designId);
      if (!design) {
        throw new Error('Design not found');
      }
      
      console.log('DesignGallery: Design found:', design.title);
      
      // Emit event to load design in builder
      this.container.dispatchEvent(new CustomEvent('designSelected', {
        detail: { design }
      }));
      
    } catch (error) {
      console.error('Error viewing design:', error);
      this.showError('Failed to load design. Please try again.');
    }
  }

  private async likeDesign(designId: string, button: HTMLElement): Promise<void> {
    try {
      await this.firestoreService.likeDesign(designId);
      
      // Update UI
      button.innerHTML = '<i class="icon-heart"></i> Liked!';
      button.classList.add('liked');
      
      // Update the like count in the card
      const card = button.closest('.design-card');
      const stat = card?.querySelector('.stat .icon-heart')?.parentElement;
      if (stat) {
        const currentLikes = parseInt(stat.textContent?.replace(/[^\d]/g, '') || '0');
        stat.innerHTML = `<i class="icon-heart"></i> ${currentLikes + 1}`;
      }
    } catch (error) {
      console.error('Error liking design:', error);
      if (error.message && error.message.includes('permission')) {
        this.showError('Please sign in to like designs.');
      } else {
        this.showError('Failed to like design. Please try again.');
      }
    }
  }

  private showError(message: string): void {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    errorDiv.style.cssText = `
      background: #ffebee;
      color: #c62828;
      padding: 10px;
      border-radius: 4px;
      margin: 10px 0;
      text-align: center;
    `;
    
    const grid = document.getElementById('designs-grid');
    grid?.parentNode?.insertBefore(errorDiv, grid);
    
    // Remove error after 5 seconds
    setTimeout(() => {
      errorDiv.remove();
    }, 5000);
  }

  private showNoDesignsMessage(): void {
    // Remove any existing no designs message
    const existingMessage = document.querySelector('.no-designs-message');
    if (existingMessage) {
      existingMessage.remove();
    }
    
    const noDesignsDiv = document.createElement('div');
    noDesignsDiv.className = 'no-designs-message';
    noDesignsDiv.innerHTML = `
      <div style="text-align: center; padding: 40px 20px; color: #666;">
        <div style="font-size: 48px; margin-bottom: 16px;">🏠</div>
        <h3 style="margin: 0 0 8px 0; color: #333;">No designs found</h3>
        <p style="margin: 0; color: #666;">Be the first to publish a design to the community!</p>
      </div>
    `;
    
    const grid = document.getElementById('designs-grid');
    if (grid) {
      grid.appendChild(noDesignsDiv);
    }
  }

  // Public method to refresh the gallery
  public async refresh(): Promise<void> {
    await this.loadDesigns(true);
  }

  // Public method to update filters
  public updateFilters(newFilters: Partial<DesignFilters>): void {
    this.currentFilters = { ...this.currentFilters, ...newFilters };
    this.loadDesigns(true);
  }
}
