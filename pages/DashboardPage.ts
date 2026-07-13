import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

/**
 * DashboardPage - Page Object Model for OrangeHRM Dashboard
 * Handles navigation and dashboard actions
 */
export class DashboardPage extends BasePage {
  // Locators
  readonly dashboardHeader: Locator;
  readonly userDropdown: Locator;
  readonly logoutButton: Locator;
  readonly adminMenu: Locator;
  readonly pimMenu: Locator;
  readonly leaveMenu: Locator;
  readonly timeMenu: Locator;
  readonly recruitmentMenu: Locator;
  readonly myInfoMenu: Locator;
  readonly performanceMenu: Locator;
  readonly dashboardMenu: Locator;
  readonly directoryMenu: Locator;
  readonly maintenanceMenu: Locator;
  readonly claimMenu: Locator;
  readonly buzzMenu: Locator;

  constructor(page: Page) {
    super(page);
    
    // Initialize locators
    this.dashboardHeader = page.locator('.oxd-topbar-header-breadcrumb h6');
    this.userDropdown = page.locator('.oxd-userdropdown-tab');
    this.logoutButton = page.locator('text=Logout');
    
    // Menu items
    this.adminMenu = page.locator('a[href="/web/index.php/admin/viewAdminModule"]');
    this.pimMenu = page.locator('a[href="/web/index.php/pim/viewPimModule"]');
    this.leaveMenu = page.locator('a[href="/web/index.php/leave/viewLeaveModule"]');
    this.timeMenu = page.locator('a[href="/web/index.php/time/viewTimeModule"]');
    this.recruitmentMenu = page.locator('a[href="/web/index.php/recruitment/viewRecruitmentModule"]');
    this.myInfoMenu = page.locator('a[href="/web/index.php/pim/viewMyDetails"]');
    this.performanceMenu = page.locator('a[href="/web/index.php/performance/viewPerformanceModule"]');
    this.dashboardMenu = page.locator('a[href="/web/index.php/dashboard/index"]');
    this.directoryMenu = page.locator('a[href="/web/index.php/directory/viewDirectory"]');
    this.maintenanceMenu = page.locator('a[href="/web/index.php/maintenance/viewMaintenanceModule"]');
    this.claimMenu = page.locator('a[href="/web/index.php/claim/viewClaimModule"]');
    this.buzzMenu = page.locator('a[href="/web/index.php/buzz/viewBuzz"]');
  }

  /**
   * Verify dashboard is loaded
   */
  async isDashboardLoaded(): Promise<boolean> {
    await this.waitForElement(this.dashboardHeader);
    return await this.isVisible(this.dashboardHeader);
  }

  /**
   * Get dashboard title
   */
  async getDashboardTitle(): Promise<string> {
    return await this.getText(this.dashboardHeader);
  }

  /**
   * Logout from application
   */
  async logout(): Promise<void> {
    await this.click(this.userDropdown);
    await this.waitForElement(this.logoutButton);
    await this.click(this.logoutButton);
    // Wait for navigation to login page to complete
    await this.waitForNavigation();
  }

  /**
   * Navigate to Admin module
   */
  async navigateToAdmin(): Promise<void> {
    await this.click(this.adminMenu);
    await this.waitForNavigation();
  }

  /**
   * Navigate to PIM module
   */
  async navigateToPIM(): Promise<void> {
    await this.click(this.pimMenu);
    await this.waitForNavigation();
  }

  /**
   * Navigate to Leave module
   */
  async navigateToLeave(): Promise<void> {
    await this.click(this.leaveMenu);
    await this.waitForNavigation();
  }

  /**
   * Navigate to Time module
   */
  async navigateToTime(): Promise<void> {
    await this.click(this.timeMenu);
    await this.waitForNavigation();
  }

  /**
   * Navigate to Recruitment module
   */
  async navigateToRecruitment(): Promise<void> {
    await this.click(this.recruitmentMenu);
    await this.waitForNavigation();
  }

  /**
   * Navigate to My Info
   */
  async navigateToMyInfo(): Promise<void> {
    await this.click(this.myInfoMenu);
    await this.waitForNavigation();
  }

  /**
   * Navigate to Performance module
   */
  async navigateToPerformance(): Promise<void> {
    await this.click(this.performanceMenu);
    await this.waitForNavigation();
  }
}
