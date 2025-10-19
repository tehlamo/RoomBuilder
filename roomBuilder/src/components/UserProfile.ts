import { AuthService } from '../services/AuthService';

export class UserProfile {
  private container: HTMLElement;
  private authService: AuthService;

  constructor(container: HTMLElement, authService: AuthService) {
    this.container = container;
    this.authService = authService;
  }

  render(): void {
    const user = this.authService.getCurrentUser();
    const isAuthenticated = this.authService.isAuthenticated();
    
    if (user && isAuthenticated) {
      this.renderLoggedInProfile(user);
    } else {
      this.renderLoggedOutProfile();
    }
  }

  private renderLoggedInProfile(user: any): void {
    
    // Create avatar element with proper fallback
    const hasPhotoURL = this.testPhotoURL(user.photoURL);
    const avatarHTML = hasPhotoURL 
      ? `<img src="${user.photoURL}" alt="${user.displayName || 'User'}" class="user-avatar" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">`
      : '';
    
    const fallbackAvatarHTML = `<div class="default-avatar" ${hasPhotoURL ? 'style="display:none;"' : ''}>
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
        <circle cx="12" cy="7" r="4"></circle>
      </svg>
    </div>`;

    this.container.innerHTML = `
      <div class="user-profile logged-in">
        <div class="login-status">
          <div class="status-indicator">
            <div class="status-dot"></div>
            <span class="status-text">Logged In</span>
          </div>
        </div>
        <div class="user-info">
          ${avatarHTML}
          ${fallbackAvatarHTML}
          <div class="user-details">
            <span class="user-name">${user.displayName || 'Anonymous User'}</span>
            <span class="user-email">${user.email || 'No email'}</span>
          </div>
        </div>
        <button class="logout-btn" id="logout-btn">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
            <polyline points="16,17 21,12 16,7"></polyline>
            <line x1="21" y1="12" x2="9" y2="12"></line>
          </svg>
          Sign Out
        </button>
      </div>
    `;

    // Add logout event listener
    document.getElementById('logout-btn')?.addEventListener('click', async () => {
      await this.handleLogout();
    });
  }

  private renderLoggedOutProfile(): void {
    this.container.innerHTML = `
      <div class="user-profile logged-out">
        <div class="user-info">
          <div class="default-avatar">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
          </div>
          <div class="user-details">
            <span class="user-name">Guest User</span>
            <span class="user-email">Sign in to publish designs</span>
          </div>
        </div>
        <button class="login-btn" id="login-btn">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"></path>
            <polyline points="10,17 15,12 10,7"></polyline>
            <line x1="15" y1="12" x2="3" y2="12"></line>
          </svg>
          Sign In
        </button>
      </div>
    `;

    // Add login event listener
    document.getElementById('login-btn')?.addEventListener('click', () => {
      // This will be handled by the parent component
      this.container.dispatchEvent(new CustomEvent('requestLogin'));
    });
  }

  private async handleLogout(): Promise<void> {
    try {
      await this.authService.signOut();
      this.render(); // Re-render to show logged out state
    } catch (error) {
      console.error('Error signing out:', error);
      // Show error message
      this.showError('Failed to sign out. Please try again.');
    }
  }

  private showError(message: string): void {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    errorDiv.style.cssText = `
      background: #ffebee;
      color: #c62828;
      padding: 8px 12px;
      border-radius: 4px;
      margin: 8px 0;
      text-align: center;
      font-size: 12px;
    `;
    
    this.container.appendChild(errorDiv);
    
    // Remove error after 3 seconds
    setTimeout(() => {
      errorDiv.remove();
    }, 3000);
  }

  // Method to refresh the profile (useful when auth state changes)
  public refresh(): void {
    this.render();
  }

  // Test method to verify photo URL
  private testPhotoURL(url: string): boolean {
    if (!url || url.trim() === '') return false;
    
    // Basic URL validation
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  }
}
