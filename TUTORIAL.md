# 📚 Playwright Test Automation - Complete Tutorial

## Learning Path for Self-Study

This tutorial will guide you through understanding and mastering Playwright test automation using this OrangeHRM framework as a reference.

---

## 🎯 Chapter 1: Understanding the Framework Architecture

### 1.1 What is Page Object Model (POM)?

**Page Object Model** is a design pattern where:
- Each web page is represented as a class
- Page elements are defined as class properties
- Page actions are defined as class methods

**Example from LoginPage.ts:**

```typescript
export class LoginPage extends BasePage {
  // Page Elements (Locators)
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;

  constructor(page: Page) {
    super(page);
    this.usernameInput = page.locator('input[name="username"]');
    this.passwordInput = page.locator('input[name="password"]');
    this.loginButton = page.locator('button[type="submit"]');
  }

  // Page Actions (Methods)
  async login(username: string, password: string): Promise<void> {
    await this.fill(this.usernameInput, username);
    await this.fill(this.passwordInput, password);
    await this.click(this.loginButton);
  }
}
```

**Why POM?**
✅ **Reusability**: Use same page methods in multiple tests
✅ **Maintainability**: Change locator in one place
✅ **Readability**: Tests are more readable
✅ **Separation of Concerns**: Page logic separate from test logic

---

### 1.2 Framework Structure Explained

```
Framework
├── pages/           → Page Objects (HOW to interact with pages)
├── tests/           → Test Cases (WHAT to test)
├── utils/           → Helpers (Shared utilities)
├── config/          → Configuration files
└── reports/         → Test execution reports
```

---

## 🎯 Chapter 2: Locator Strategies

### 2.1 Types of Locators

Playwright provides multiple ways to find elements:

```typescript
// 1. By CSS Selector
page.locator('input[name="username"]')
page.locator('.login-button')
page.locator('#submit-btn')

// 2. By Text
page.locator('text=Login')
page.locator('button:has-text("Submit")')

// 3. By Role (Recommended - Accessibility)
page.getByRole('button', { name: 'Login' })
page.getByRole('textbox', { name: 'Username' })

// 4. By Placeholder
page.getByPlaceholder('Enter username')

// 5. By Label
page.getByLabel('Username')

// 6. By Test ID (Best for automation)
page.getByTestId('login-button')

// 7. By XPath (Use sparingly)
page.locator('//input[@name="username"]')
```

### 2.2 Best Practices for Locators

**Priority Order:**
1. ✅ Test IDs (`data-testid`)
2. ✅ Roles and Accessibility attributes
3. ✅ Semantic locators (label, placeholder)
4. ⚠️ CSS Selectors (stable ones)
5. ❌ XPath (only when no other option)

**Example:**
```typescript
// ❌ Bad - Fragile, depends on structure
page.locator('div > div > input:nth-child(2)')

// ✅ Good - Semantic and stable
page.locator('input[name="username"]')
page.getByRole('textbox', { name: 'Username' })
```

---

## 🎯 Chapter 3: Writing Your First Test

### 3.1 Test Structure

Every Playwright test follows this structure:

```typescript
import { test, expect } from '@playwright/test';

test.describe('Test Suite Name', () => {
  
  // Runs before EACH test
  test.beforeEach(async ({ page }) => {
    // Setup code
  });

  // Individual test case
  test('Test Case Name', async ({ page }) => {
    // 1. Arrange (Setup)
    // 2. Act (Perform action)
    // 3. Assert (Verify result)
  });

  // Runs after EACH test
  test.afterEach(async ({ page }) => {
    // Cleanup code
  });
});
```

### 3.2 Real Example - Login Test

```typescript
test('Login with valid credentials', async ({ page }) => {
  // 1. ARRANGE - Setup test data and navigate
  const loginPage = new LoginPage(page);
  await loginPage.navigateToLoginPage();

  // 2. ACT - Perform the action
  await loginPage.login('Admin', 'admin123');

  // 3. ASSERT - Verify expected outcome
  const dashboardPage = new DashboardPage(page);
  const isVisible = await dashboardPage.isDashboardLoaded();
  expect(isVisible).toBeTruthy();
});
```

---

## 🎯 Chapter 4: Assertions in Playwright

### 4.1 Common Assertions

```typescript
// Boolean assertions
expect(value).toBeTruthy();
expect(value).toBeFalsy();
expect(value).toBe(expectedValue);
expect(value).toEqual(expectedValue);

// String assertions
expect(text).toContain('substring');
expect(text).toMatch(/regex/);

// Number assertions
expect(count).toBeGreaterThan(0);
expect(count).toBeLessThan(10);
expect(count).toBe(5);

// Array assertions
expect(array).toHaveLength(3);
expect(array).toContain(item);

// Element assertions (Playwright specific)
await expect(page.locator('.title')).toBeVisible();
await expect(page.locator('.error')).toBeHidden();
await expect(page.locator('input')).toHaveValue('text');
await expect(page.locator('h1')).toHaveText('Welcome');
await expect(page.locator('button')).toBeEnabled();
await expect(page.locator('input')).toBeFocused();
```

---

## 🎯 Chapter 5: Wait Strategies

### 5.1 Why Waits are Important

Web applications are asynchronous. Elements may not appear immediately.

### 5.2 Playwright's Auto-Waiting

Playwright automatically waits for elements before actions:

```typescript
// Automatically waits for element to be:
// - Attached to DOM
// - Visible
// - Stable (not animating)
// - Enabled
await page.locator('button').click();
```

### 5.3 Explicit Waits

```typescript
// Wait for element to be visible
await page.locator('.element').waitFor({ state: 'visible' });

// Wait for element to be hidden
await page.locator('.element').waitFor({ state: 'hidden' });

// Wait for navigation
await page.waitForLoadState('networkidle');

// Wait for URL
await page.waitForURL('**/dashboard');

// Wait for timeout (avoid this!)
await page.waitForTimeout(2000); // ❌ Bad practice
```

---

## 🎯 Chapter 6: Running Tests

### 6.1 Command Line Options

```bash
# Run all tests
npx playwright test

# Run specific file
npx playwright test tests/login.spec.ts

# Run tests with specific tag
npx playwright test --grep @smoke

# Run in headed mode (see browser)
npx playwright test --headed

# Run in debug mode (step through)
npx playwright test --debug

# Run on specific browser
npx playwright test --project=chromium
npx playwright test --project=firefox
npx playwright test --project=webkit
```
