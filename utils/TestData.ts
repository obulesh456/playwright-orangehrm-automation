/**
 * TestData - Centralized test data management
 * Contains all test data used across test suites
 */

export class TestData {
  // Login credentials
  static readonly VALID_USERNAME = process.env.USERNAME || 'Admin';
  static readonly VALID_PASSWORD = process.env.PASSWORD || 'admin123';
  static readonly INVALID_USERNAME = 'InvalidUser';
  static readonly INVALID_PASSWORD = 'WrongPassword';

  // Employee data
  static readonly EMPLOYEE_FIRST_NAME = 'John';
  static readonly EMPLOYEE_MIDDLE_NAME = 'Michael';
  static readonly EMPLOYEE_LAST_NAME = 'Doe';

  // URLs
  static readonly BASE_URL = process.env.BASE_URL || 'https://opensource-demo.orangehrmlive.com';
  static readonly LOGIN_URL = '/web/index.php/auth/login';
  static readonly DASHBOARD_URL = '/web/index.php/dashboard/index';

  // Error messages
  static readonly INVALID_CREDENTIALS_ERROR = 'Invalid credentials';
  static readonly REQUIRED_FIELD_ERROR = 'Required';

  // Success messages
  static readonly SUCCESS_MESSAGE = 'Success';
  static readonly EMPLOYEE_ADDED_SUCCESS = 'Successfully Saved';

  /**
   * Generate random employee data
   */
  static generateRandomEmployee() {
    const timestamp = Date.now();
    return {
      firstName: `Test_${timestamp}`,
      middleName: 'Auto',
      lastName: `User_${timestamp}`,
      employeeId: `EMP${timestamp}`,
    };
  }

  /**
   * Generate random email
   */
  static generateRandomEmail(): string {
    const timestamp = Date.now();
    return `test${timestamp}@example.com`;
  }

  /**
   * Generate random phone number
   */
  static generateRandomPhone(): string {
    return `+1${Math.floor(Math.random() * 9000000000) + 1000000000}`;
  }
}
