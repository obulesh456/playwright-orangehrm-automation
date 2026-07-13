import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

/**
 * LoginPage - Page Object Model for OrangeHRM Login Page
 * Handles all login-related actions
 */
export class LoginPage extends BasePage {
  // Locators
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly errorMessage: Locator;
  readonly forgotPasswordLink: Locator;
  readonly logoImage: Locator;

  constructor(page: Page) {
    super(page);
    
    // Initialize locators
    this.usernameInput = page.locator('input[name="username"]');
    this.passwordInput = page.locator('input[name="password"]');
    this.loginButton = page.locator('button[type="submit"]');
    this.errorMessage = page.locator('.oxd-alert-content-text');
    this.forgotPasswordLink = page.locator('.orangehrm-login-forgot-header');
    this.logoImage = page.locator('.orangehrm-login-branding img');
  }

  /**
   * Navigate to login page
   */
  async navigateToLoginPage(): Promise<void> {
    await this.goto('/web/index.php/auth/login');
    await this.waitForElement(this.loginButton);
  }

  /**
   * Perform login
   */
  async login(username: string, password: string): Promise<void> {
    await this.fill(this.usernameInput, username);
    await this.fill(this.passwordInput, password);
    await this.click(this.loginButton);
  }

  /**
   * Login with valid credentials
   */
  async loginWithValidCredentials(): Promise<void> {
    await this.login(
      process.env.USERNAME || 'Admin',
      process.env.PASSWORD || 'admin123'
    );
  }

  /**
   * Get error message text
   */
  async getErrorMessage(): Promise<string> {
    await this.waitForElement(this.errorMessage);
    return await this.getText(this.errorMessage);
  }

  /**
   * Verify login page is loaded
   */
  async isLoginPageLoaded(): Promise<boolean> {
    try {
      await this.waitForElement(this.loginButton, 5000);
      return await this.isVisible(this.loginButton);
    } catch (error) {
      return false;
    }
  }

  /**
   * Click forgot password link
   */
  async clickForgotPassword(): Promise<void> {
    await this.click(this.forgotPasswordLink);
  }

  /**
   * Check if logo is visible
   */
  async isLogoVisible(): Promise<boolean> {
    try {
      await this.waitForElement(this.logoImage, 5000);
      return await this.isVisible(this.logoImage);
    } catch (error) {
      return false;
    }
  }

  /**
   * Clear login form
   */
  async clearLoginForm(): Promise<void> {
    await this.usernameInput.clear();
    await this.passwordInput.clear();
  }

  /**
   * Get username field value
   */
  async getUsernameValue(): Promise<string> {
    return await this.usernameInput.inputValue();
  }

  /**
   * Get password field value
   */
  async getPasswordValue(): Promise<string> {
    return await this.passwordInput.inputValue();
  }
}
