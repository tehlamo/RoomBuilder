import { AuthService } from '../services/AuthService';

export class LoginModal {
  private container: HTMLElement;
  private authService: AuthService;
  private onLoginCallback?: (user: any) => void;

  constructor(container: HTMLElement) {
    this.container = container;
    this.authService = new AuthService();
  }

  show(onLogin?: (user: any) => void): void {
    this.onLoginCallback = onLogin;
    this.renderModal();
  }

  private renderModal(): void {
    // Create modal overlay and append it to the container (don't replace content)
    const modalOverlay = document.createElement('div');
    modalOverlay.className = 'login-modal-overlay';
    modalOverlay.innerHTML = `
      <div class="login-modal">
        <div class="login-modal-header">
          <h2>Sign in to publish designs</h2>
          <button class="close-login-btn">&times;</button>
        </div>
        <div class="login-modal-content">
          <div class="login-description">
            <p>To publish and share your room designs with the community, please sign in with your Google account.</p>
          </div>
          <div class="login-benefits">
            <h3>Benefits of signing in:</h3>
            <ul>
              <li>✨ Publish and share your designs</li>
              <li>❤️ Like and save favorite designs</li>
              <li>💬 Comment on community designs</li>
              <li>👤 Build your design portfolio</li>
              <li>📊 Track your design statistics</li>
            </ul>
          </div>
          <div class="login-actions">
            <button class="google-login-btn" id="google-login">
              <svg class="google-icon" viewBox="0 0 24 24" width="20" height="20">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Continue with Google
            </button>
            <p class="login-privacy">
              By signing in, you agree to our Terms of Service and Privacy Policy.
            </p>
          </div>
        </div>
      </div>
    `;

    this.container.appendChild(modalOverlay);
    this.setupEventListeners();
  }

  private setupEventListeners(): void {
    // Close modal
    document.querySelector('.close-login-btn')?.addEventListener('click', () => {
      this.close();
    });

    // Close on overlay click
    document.querySelector('.login-modal-overlay')?.addEventListener('click', (e) => {
      if (e.target === e.currentTarget) {
        this.close();
      }
    });

    // Google login
    document.getElementById('google-login')?.addEventListener('click', async () => {
      await this.handleGoogleLogin();
    });
  }

  private async handleGoogleLogin(): Promise<void> {
    const loginBtn = document.getElementById('google-login') as HTMLButtonElement;
    
    // Check if already signing in
    if (this.authService.isCurrentlySigningIn()) {
      console.log('Already signing in, please wait...');
      return;
    }
    
    try {
      // Show loading state
      loginBtn.innerHTML = `
        <svg class="google-icon" viewBox="0 0 24 24" width="20" height="20">
          <circle cx="12" cy="12" r="10" stroke="#4285F4" stroke-width="2" fill="none"/>
          <path d="M12 2v4" stroke="#4285F4" stroke-width="2" stroke-linecap="round"/>
          <path d="M12 18v4" stroke="#4285F4" stroke-width="2" stroke-linecap="round"/>
          <path d="M4.93 4.93l2.83 2.83" stroke="#4285F4" stroke-width="2" stroke-linecap="round"/>
          <path d="M16.24 16.24l2.83 2.83" stroke="#4285F4" stroke-width="2" stroke-linecap="round"/>
        </svg>
        Signing in...
      `;
      loginBtn.disabled = true;

      const user = await this.authService.signInWithGoogle();
      
      if (user) {
        // Success
        this.showSuccess(user);
        
        // Call callback if provided
        if (this.onLoginCallback) {
          this.onLoginCallback(user);
        }
      } else {
        throw new Error('No user returned after sign in');
      }

    } catch (error) {
      console.error('Login error:', error);
      this.showError('Failed to sign in. Please try again.');
      
      // Reset button
      loginBtn.innerHTML = `
        <svg class="google-icon" viewBox="0 0 24 24" width="20" height="20">
          <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
          <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
          <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
          <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
        </svg>
        Continue with Google
      `;
      loginBtn.disabled = false;
    }
  }

  private showSuccess(user: any): void {
    // Remove the existing modal content
    const existingOverlay = this.container.querySelector('.login-modal-overlay');
    if (existingOverlay) {
      existingOverlay.remove();
    }

    // Create success modal
    const modalOverlay = document.createElement('div');
    modalOverlay.className = 'login-modal-overlay';
    modalOverlay.innerHTML = `
      <div class="login-modal success-modal">
        <div class="success-content">
          <div class="success-icon">✓</div>
          <h2>Welcome, ${user.displayName}!</h2>
          <p>You're now signed in and can publish your designs.</p>
          <div class="user-info">
            <img src="${user.photoURL || '/default-avatar.png'}" alt="${user.displayName}" class="user-avatar">
            <div class="user-details">
              <span class="user-name">${user.displayName}</span>
              <span class="user-email">${user.email}</span>
            </div>
          </div>
          <button class="btn-primary" id="close-success">Get Started</button>
        </div>
      </div>
    `;

    this.container.appendChild(modalOverlay);

    document.getElementById('close-success')?.addEventListener('click', () => {
      this.close();
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
      margin: 15px 0;
      text-align: center;
    `;
    
    const modalContent = document.querySelector('.login-modal-content');
    modalContent?.insertBefore(errorDiv, modalContent.firstChild);
    
    // Remove error after 5 seconds
    setTimeout(() => {
      errorDiv.remove();
    }, 5000);
  }

  private close(): void {
    // Remove the modal overlay
    const overlay = this.container.querySelector('.login-modal-overlay');
    if (overlay) {
      overlay.remove();
    }
  }
}
