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
    this.renderGallery();
    await this.loadDesigns();
    this.setupEventListeners();
  }

  private renderGallery(): void {
    this.container.innerHTML = `
      <div class="gallery-container">
        <div class="gallery-header">
          <h2>Community Designs</h2>
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
    if (reset) {
      this.lastDoc = null;
      this.hasMore = true;
      document.getElementById('designs-grid')!.innerHTML = '';
    }

    if (!this.hasMore) return;

    try {
      document.getElementById('loading-indicator')!.style.display = 'block';
      document.getElementById('load-more-btn')!.style.display = 'none';

      const filters = { ...this.currentFilters, lastDoc: this.lastDoc };
      const result = await this.firestoreService.getPublicDesigns(filters);

      this.lastDoc = result.lastDoc;
      this.hasMore = result.hasMore;

      if (reset) {
        document.getElementById('designs-grid')!.innerHTML = '';
      }

      result.designs.forEach(design => {
        this.addDesignCard(design);
      });

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
    const grid = document.getElementById('designs-grid')!;
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
          <button class="btn-secondary view-design-btn" data-design-id="${design.id}">View Design</button>
          <button class="btn-primary like-design-btn" data-design-id="${design.id}">
            <i class="icon-heart"></i> Like
          </button>
        </div>
      </div>
    `;

    grid.appendChild(card);
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

    // Design card interactions
    document.addEventListener('click', (e) => {
      const target = e.target as HTMLElement;
      
      if (target.classList.contains('view-design-btn')) {
        const designId = target.getAttribute('data-design-id');
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
      // Create design viewer and load the design
      const designViewer = new DesignViewer(this.container);
      await designViewer.loadDesign(designId);
      
      // Listen for events from the design viewer
      this.container.addEventListener('loadDesignInBuilder', (e: any) => {
        const design = e.detail.design;
        this.container.dispatchEvent(new CustomEvent('designSelected', {
          detail: { design }
        }));
      });
      
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
      this.showError('Failed to like design. Please try again.');
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
