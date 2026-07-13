import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { DashboardPage } from '../pages/DashboardPage';

/**
 * Login Test Suite
 * Tests all login scenarios including positive and negative cases
 */
test.describe('OrangeHRM Login Tests', () => {
  let loginPage: LoginPage;
  let dashboardPage: DashboardPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    dashboardPage = new DashboardPage(page);
    
    // Navigate to login page
    await loginPage.navigateToLoginPage();
  });

  test('TC001 - Verify login page loads successfully', async () => {
    // Verify login page elements are visible
    const isLoaded = await loginPage.isLoginPageLoaded();
    expect(isLoaded).toBeTruthy();
    
    const isLogoVisible = await loginPage.isLogoVisible();
    expect(isLogoVisible).toBeTruthy();
  });

  test('TC002 - Login with valid credentials @smoke', async () => {
    // Perform login
    await loginPage.loginWithValidCredentials();
    
    // Verify dashboard is loaded
    const isDashboardVisible = await dashboardPage.isDashboardLoaded();
    expect(isDashboardVisible).toBeTruthy();
    
    // Verify dashboard title
    const dashboardTitle = await dashboardPage.getDashboardTitle();
    expect(dashboardTitle).toBe('Dashboard');
  });

  test('TC003 - Login with invalid username', async () => {
    // Login with invalid username
    await loginPage.login('InvalidUser', 'admin123');
    
    // Verify error message
    const errorMessage = await loginPage.getErrorMessage();
    expect(errorMessage).toContain('Invalid credentials');
  });

  test('TC004 - Login with invalid password', async () => {
    // Login with invalid password
    await loginPage.login('Admin', 'wrongpassword');
    
    // Verify error message
    const errorMessage = await loginPage.getErrorMessage();
    expect(errorMessage).toContain('Invalid credentials');
  });

  test('TC005 - Login with empty credentials', async () => {
    // Click login without entering credentials
    await loginPage.login('', '');
    
    // Verify we stay on login page
    const isLoginPageVisible = await loginPage.isLoginPageLoaded();
    expect(isLoginPageVisible).toBeTruthy();
  });

  test('TC006 - Login with empty username', async () => {
    // Login with empty username
    await loginPage.login('', 'admin123');
    
    // Verify we stay on login page
    const isLoginPageVisible = await loginPage.isLoginPageLoaded();
    expect(isLoginPageVisible).toBeTruthy();
  });

  test('TC007 - Login with empty password', async () => {
    // Login with empty password
    await loginPage.login('Admin', '');
    
    // Verify we stay on login page
    const isLoginPageVisible = await loginPage.isLoginPageLoaded();
    expect(isLoginPageVisible).toBeTruthy();
  });

  test('TC008 - Verify logout functionality @smoke', async () => {
    // Login first
    await loginPage.loginWithValidCredentials();
    await dashboardPage.isDashboardLoaded();
    
    // Logout
    await dashboardPage.logout();
    
    // Verify redirected to login page
    const isLoginPageVisible = await loginPage.isLoginPageLoaded();
    expect(isLoginPageVisible).toBeTruthy();
  });

  test('TC009 - Verify login page title', async ({ page }) => {
    const title = await loginPage.getTitle();
    expect(title).toContain('OrangeHRM');
  });

  test('TC010 - Clear login form', async () => {
    // Fill login form
    await loginPage.login('TestUser', 'TestPass');
    
    // Clear the form
    await loginPage.clearLoginForm();
    
    // Verify fields are empty
    const usernameValue = await loginPage.getUsernameValue();
    const passwordValue = await loginPage.getPasswordValue();
    
    expect(usernameValue).toBe('');
    expect(passwordValue).toBe('');
  });
});
