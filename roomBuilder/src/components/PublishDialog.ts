// import type { PublishedDesign } from '../types/Firestore';
import type { RoomDimensions } from '../types/Room';
import type { Furniture } from '../types/Furniture';
import { FirestoreService } from '../services/FirestoreService';
import { AuthService } from '../services/AuthService';

export class PublishDialog {
  private container: HTMLElement;
  private firestoreService: FirestoreService;
  private authService: AuthService;
  private onPublishCallback?: (designId: string) => void;

  constructor(container: HTMLElement) {
    this.container = container;
    this.firestoreService = new FirestoreService();
    this.authService = new AuthService();
  }

  show(
    designData: {
      roomDimensions: RoomDimensions;
      furniture: Furniture[];
      budget: number;
      roomType: string;
      thumbnail?: string;
    },
    onPublish?: (designId: string) => void
  ): void {
    this.onPublishCallback = onPublish;
    this.renderDialog(designData);
  }

  private renderDialog(designData: {
    roomDimensions: RoomDimensions;
    furniture: Furniture[];
    budget: number;
    roomType: string;
    thumbnail?: string;
  }): void {
    // Remove any existing dialog overlays first
    const existingOverlays = this.container.querySelectorAll('.publish-dialog-overlay');
    existingOverlays.forEach(overlay => overlay.remove());

    // Create the dialog overlay and append it to the container (don't replace content)
    const dialogOverlay = document.createElement('div');
    dialogOverlay.className = 'publish-dialog-overlay';
    dialogOverlay.innerHTML = `
      <div class="publish-dialog">
        <div class="publish-dialog-header">
          <h2>Publish Your Design</h2>
          <button class="close-dialog-btn">&times;</button>
        </div>
        <div class="publish-dialog-content">
          <form id="publish-form">
            <div class="form-group">
              <label for="design-title">Design Title *</label>
              <input type="text" id="design-title" required placeholder="Enter a catchy title for your design">
            </div>
            
            <div class="form-group">
              <label for="design-description">Description *</label>
              <textarea id="design-description" required placeholder="Describe your design, inspiration, or any special features..."></textarea>
            </div>
            
            <div class="form-group">
              <label for="design-tags">Tags (comma-separated)</label>
              <input type="text" id="design-tags" placeholder="modern, cozy, minimal, etc.">
              <small>Help others find your design by adding relevant tags</small>
            </div>
            
            <div class="form-group">
              <label class="checkbox-label">
                <input type="checkbox" id="is-public" checked>
                <span class="checkmark"></span>
                Make this design public
              </label>
              <small>Public designs can be viewed and liked by other users</small>
            </div>
            
            <div class="design-summary">
              <h3>Design Summary</h3>
              <div class="summary-grid">
                <div class="summary-item">
                  <span class="summary-label">Room Type:</span>
                  <span class="summary-value">${designData.roomType}</span>
                </div>
                <div class="summary-item">
                  <span class="summary-label">Dimensions:</span>
                  <span class="summary-value">${designData.roomDimensions.width} × ${designData.roomDimensions.length} × ${designData.roomDimensions.height} ft</span>
                </div>
                <div class="summary-item">
                  <span class="summary-label">Furniture Items:</span>
                  <span class="summary-value">${designData.furniture.length}</span>
                </div>
                <div class="summary-item">
                  <span class="summary-label">Total Budget:</span>
                  <span class="summary-value">$${designData.budget}</span>
                </div>
              </div>
            </div>
          </form>
        </div>
        <div class="publish-dialog-footer">
          <button type="button" class="btn-secondary" id="cancel-publish">Cancel</button>
          <button type="button" class="btn-primary" id="publish-design">Publish Design</button>
        </div>
      </div>
    `;

    // Append the dialog overlay to the container
    this.container.appendChild(dialogOverlay);
    
    this.setupEventListeners(designData, dialogOverlay);
  }

  private setupEventListeners(designData: {
    roomDimensions: RoomDimensions;
    furniture: Furniture[];
    budget: number;
    roomType: string;
  }, dialogOverlay: HTMLElement): void {
    // Close dialog
    dialogOverlay.querySelector('.close-dialog-btn')?.addEventListener('click', () => {
      this.close(dialogOverlay);
    });

    dialogOverlay.querySelector('#cancel-publish')?.addEventListener('click', () => {
      this.close(dialogOverlay);
    });

    // Publish design
    dialogOverlay.querySelector('#publish-design')?.addEventListener('click', async () => {
      await this.handlePublish(designData);
    });

    // Close on overlay click
    dialogOverlay.addEventListener('click', (e) => {
      if (e.target === e.currentTarget) {
        this.close(dialogOverlay);
      }
    });
  }

  private async handlePublish(designData: {
    roomDimensions: RoomDimensions;
    furniture: Furniture[];
    budget: number;
    roomType: string;
  }): Promise<void> {
    const form = document.getElementById('publish-form') as HTMLFormElement;
    
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    const title = (document.getElementById('design-title') as HTMLInputElement).value;
    const description = (document.getElementById('design-description') as HTMLTextAreaElement).value;
    const tagsInput = (document.getElementById('design-tags') as HTMLInputElement).value;
    const isPublic = (document.getElementById('is-public') as HTMLInputElement).checked;

    const tags = tagsInput
      ? tagsInput.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0)
      : [];

    try {
      // Show loading state
      const publishBtn = document.getElementById('publish-design') as HTMLButtonElement;
      // Show loading state
      publishBtn.textContent = 'Publishing...';
      publishBtn.disabled = true;

      // Get authenticated user data
      const currentUser = this.authService.getCurrentUser();
      if (!currentUser) {
        throw new Error('User not authenticated');
      }

      const userData = {
        uid: currentUser.uid,
        displayName: currentUser.displayName,
        photoURL: currentUser.photoURL
      };

      const designId = await this.firestoreService.saveDesign({
        title,
        description,
        roomDimensions: designData.roomDimensions,
        furniture: designData.furniture,
        budget: designData.budget,
        roomType: designData.roomType,
        author: userData,
        isPublic,
        tags,
        thumbnail: designData.thumbnail
      });

      // Success!
      this.showSuccess(designId);

      // Call callback if provided
      if (this.onPublishCallback) {
        this.onPublishCallback(designId);
      }

    } catch (error) {
      console.error('Error publishing design:', error);
      this.showError('Failed to publish design. Please try again.');
      
      // Reset button state
      const publishBtn = document.getElementById('publish-design') as HTMLButtonElement;
      publishBtn.textContent = 'Publish Design';
      publishBtn.disabled = false;
    }
  }

  private showSuccess(designId: string): void {
    // Remove any existing dialog overlays first
    const existingOverlays = this.container.querySelectorAll('.publish-dialog-overlay');
    existingOverlays.forEach(overlay => overlay.remove());

    // Create success dialog overlay
    const successOverlay = document.createElement('div');
    successOverlay.className = 'publish-dialog-overlay';
    successOverlay.innerHTML = `
      <div class="publish-dialog success-dialog">
        <div class="success-content">
          <div class="success-icon">✓</div>
          <h2>Design Published Successfully!</h2>
          <p>Your design has been shared with the community.</p>
          <div class="success-actions">
            <button class="btn-primary" id="view-design" data-design-id="${designId}">View My Design</button>
            <button class="btn-secondary" id="close-success">Close</button>
          </div>
        </div>
      </div>
    `;

    // Append the success dialog overlay to the container
    this.container.appendChild(successOverlay);

    // Setup success dialog event listeners
    successOverlay.querySelector('#view-design')?.addEventListener('click', () => {
      // Emit event to view the design
      this.container.dispatchEvent(new CustomEvent('viewPublishedDesign', {
        detail: { designId }
      }));
      this.close(successOverlay);
    });

    successOverlay.querySelector('#close-success')?.addEventListener('click', () => {
      this.close(successOverlay);
    });
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
    
    const form = document.getElementById('publish-form');
    form?.insertBefore(errorDiv, form.firstChild);
    
    // Remove error after 5 seconds
    setTimeout(() => {
      errorDiv.remove();
    }, 5000);
  }

  private close(dialogOverlay?: HTMLElement): void {
    // Remove only the modal overlay, not the entire container
    const overlay = dialogOverlay || document.querySelector('.publish-dialog-overlay');
    if (overlay) {
      overlay.remove();
    }
  }
}
