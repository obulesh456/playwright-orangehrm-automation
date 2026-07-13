import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { DashboardPage } from '../pages/DashboardPage';

/**
 * Dashboard Test Suite
 * Tests dashboard navigation and functionality
 */
test.describe('OrangeHRM Dashboard Tests', () => {
  let loginPage: LoginPage;
  let dashboardPage: DashboardPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    dashboardPage = new DashboardPage(page);
    
    // Login before each test
    await loginPage.navigateToLoginPage();
    await loginPage.loginWithValidCredentials();
    await dashboardPage.isDashboardLoaded();
  });

  test('TC011 - Verify dashboard navigation @smoke', async () => {
    const isDashboardLoaded = await dashboardPage.isDashboardLoaded();
    expect(isDashboardLoaded).toBeTruthy();
  });

  test('TC012 - Navigate to Admin module', async ({ page }) => {
    await dashboardPage.navigateToAdmin();
    expect(page.url()).toContain('admin');
  });

  test('TC013 - Navigate to PIM module', async ({ page }) => {
    await dashboardPage.navigateToPIM();
    expect(page.url()).toContain('pim');
  });

  test('TC014 - Navigate to Leave module', async ({ page }) => {
    await dashboardPage.navigateToLeave();
    expect(page.url()).toContain('leave');
  });

  test('TC015 - Navigate to Time module', async ({ page }) => {
    await dashboardPage.navigateToTime();
    expect(page.url()).toContain('time');
  });

  test('TC016 - Navigate to Recruitment module', async ({ page }) => {
    await dashboardPage.navigateToRecruitment();
    expect(page.url()).toContain('recruitment');
  });

  test('TC017 - Navigate to My Info', async ({ page }) => {
    await dashboardPage.navigateToMyInfo();
    expect(page.url()).toContain('pim/viewMyDetails');
  });

  test('TC018 - Navigate to Performance module', async ({ page }) => {
    await dashboardPage.navigateToPerformance();
    expect(page.url()).toContain('performance');
  });

  test('TC019 - Verify dashboard title', async () => {
    const title = await dashboardPage.getDashboardTitle();
    expect(title).toBe('Dashboard');
  });

  test('TC020 - Verify user can logout from dashboard', async () => {
    await dashboardPage.logout();
    const isLoginPageVisible = await loginPage.isLoginPageLoaded();
    expect(isLoginPageVisible).toBeTruthy();
  });
});
