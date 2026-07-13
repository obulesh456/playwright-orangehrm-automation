import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

/**
 * EmployeePage - Page Object Model for Employee Management
 * Handles employee CRUD operations
 */
export class EmployeePage extends BasePage {
  // Locators
  readonly addEmployeeButton: Locator;
  readonly firstNameInput: Locator;
  readonly middleNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly employeeIdInput: Locator;
  readonly saveButton: Locator;
  readonly cancelButton: Locator;
  readonly successMessage: Locator;
  readonly employeeList: Locator;
  readonly searchEmployeeInput: Locator;
  readonly searchButton: Locator;
  readonly deleteButton: Locator;
  readonly confirmDeleteButton: Locator;

  constructor(page: Page) {
    super(page);
    
    // Initialize locators
    this.addEmployeeButton = page.locator('button:has-text("Add")');
    this.firstNameInput = page.locator('input[name="firstName"]');
    this.middleNameInput = page.locator('input[name="middleName"]');
    this.lastNameInput = page.locator('input[name="lastName"]');
    this.employeeIdInput = page.locator('.oxd-input--active').nth(4);
    this.saveButton = page.locator('button[type="submit"]');
    this.cancelButton = page.locator('button:has-text("Cancel")');
    this.successMessage = page.locator('.oxd-toast-content-text');
    this.employeeList = page.locator('.oxd-table-card');
    this.searchEmployeeInput = page.locator('.oxd-input').first();
    this.searchButton = page.locator('button[type="submit"]');
    this.deleteButton = page.locator('.oxd-icon-button').filter({ hasText: 'delete' });
    this.confirmDeleteButton = page.locator('.oxd-button--label-danger');
  }

  /**
   * Navigate to Add Employee page
   */
  async navigateToAddEmployee(): Promise<void> {
    await this.click(this.addEmployeeButton);
    await this.waitForElement(this.firstNameInput);
  }

  /**
   * Add new employee
   */
  async addEmployee(
    firstName: string,
    middleName: string,
    lastName: string
  ): Promise<void> {
    await this.fill(this.firstNameInput, firstName);
    await this.fill(this.middleNameInput, middleName);
    await this.fill(this.lastNameInput, lastName);
    await this.click(this.saveButton);
  }

  /**
   * Add employee with all details
   */
  async addEmployeeWithId(
    firstName: string,
    middleName: string,
    lastName: string,
    employeeId: string
  ): Promise<void> {
    await this.fill(this.firstNameInput, firstName);
    await this.fill(this.middleNameInput, middleName);
    await this.fill(this.lastNameInput, lastName);
    await this.fill(this.employeeIdInput, employeeId);
    await this.click(this.saveButton);
  }

  /**
   * Search employee
   */
  async searchEmployee(employeeName: string): Promise<void> {
    await this.fill(this.searchEmployeeInput, employeeName);
    await this.click(this.searchButton);
    await this.waitForNavigation();
  }

  /**
   * Delete employee
   */
  async deleteEmployee(): Promise<void> {
    await this.click(this.deleteButton);
    await this.waitForElement(this.confirmDeleteButton);
    await this.click(this.confirmDeleteButton);
  }

  /**
   * Get success message
   */
  async getSuccessMessage(): Promise<string> {
    await this.waitForElement(this.successMessage);
    return await this.getText(this.successMessage);
  }

  /**
   * Get employee count from list
   */
  async getEmployeeCount(): Promise<number> {
    return await this.employeeList.count();
  }

  /**
   * Verify employee added successfully
   */
  async isEmployeeAdded(): Promise<boolean> {
    return await this.isVisible(this.successMessage);
  }

  /**
   * Cancel employee creation
   */
  async cancelEmployeeCreation(): Promise<void> {
    await this.click(this.cancelButton);
  }
}
