# 🚀 Quick Start Guide - Playwright OrangeHRM Automation

## ⚡ 5-Minute Setup

### Step 1: Navigate to Project Directory
```bash
cd ~/RBMobileLatest/playwright-orangehrm-automation
```

### Step 2: Run Setup Script
```bash
chmod +x setup.sh
./setup.sh
```

OR manually:
```bash
npm install
npx playwright install
```

### Step 3: Run Your First Test
```bash
npm test
```

---

## 📖 Understanding the Framework (For Learning)

### 1. **What is This Framework?**

This is an **enterprise-level test automation framework** similar to what companies use for testing web applications. It follows industry best practices.

### 2. **Key Concepts You'll Learn**

#### **Page Object Model (POM)**
- Think of each webpage as a "blueprint" or "class"
- Each button, input field, link is a "property"
- Each action (click, type, verify) is a "method"

**Example:**
```
LoginPage
  Properties: username field, password field, login button
  Methods: enterUsername(), enterPassword(), clickLogin()
```

#### **Test Structure**
```
Test = Arrange + Act + Assert

1. Arrange: Set up test (navigate to page, create data)
2. Act: Perform action (click button, fill form)
3. Assert: Verify result (check if login successful)
```

---

## 🎓 Learning Path

### Week 1: Basics
- [ ] Understand project structure
- [ ] Read `pages/LoginPage.ts` - See how page objects work
- [ ] Read `tests/login.spec.ts` - See how tests are written
- [ ] Run tests and see them execute
- [ ] Modify a test (change username, add new assertion)

### Week 2: Page Objects
- [ ] Create a new page object (e.g., LeavePage)
- [ ] Add locators for page elements
- [ ] Add methods for page actions
- [ ] Write tests using your new page object

### Week 3: Advanced Concepts
- [ ] Understand different locator strategies
- [ ] Learn about wait strategies
- [ ] Explore different assertion types
- [ ] Add screenshots and videos to tests

### Week 4: Best Practices
- [ ] Add test data management
- [ ] Implement retry logic
- [ ] Generate reports
- [ ] Run tests in different browsers

---

## 📝 Common Commands Explained

### Running Tests

```bash
# Run all tests
npm test
# What it does: Executes all test files in tests/ folder

# Run specific test file
npm run test:login
# What it does: Runs only login.spec.ts tests

# Run in headed mode (see browser window)
npm run test:headed
# What it does: Opens browser window so you can see test execution

# Run in debug mode (step through each action)
npm run test:debug
# What it does: Pauses at each step, lets you inspect elements

# Run in UI mode (interactive test runner)
npm run test:ui
# What it does: Opens Playwright UI with test list and timeline
```

### Viewing Reports

```bash
# View HTML report
npm run report
# What it does: Opens browser with test results, screenshots, videos

# Generate Allure report (advanced reporting)
npm run allure:generate
npm run allure:open
```

---

## 🔍 How to Read the Code

### Example: LoginPage.ts

```typescript
// 1. Import necessary modules
import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

// 2. Define the page class
export class LoginPage extends BasePage {
  
  // 3. Define page elements (locators)
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;

  // 4. Constructor - Initialize locators
  constructor(page: Page) {
    super(page);  // Call parent class
    
    // Find elements on the page
    this.usernameInput = page.locator('input[name="username"]');
    this.passwordInput = page.locator('input[name="password"]');
    this.loginButton = page.locator('button[type="submit"]');
  }

  // 5. Define page actions (methods)
  async login(username: string, password: string): Promise<void> {
    await this.fill(this.usernameInput, username);      // Type username
    await this.fill(this.passwordInput, password);      // Type password
    await this.click(this.loginButton);                 // Click login
  }
}
```

### Example: login.spec.ts

```typescript
// 1. Import test framework and page objects
import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

// 2. Test suite (group of related tests)
test.describe('Login Tests', () => {
  
  // 3. Setup before each test
  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.navigateToLoginPage();
  });

  // 4. Individual test case
  test('Login with valid credentials', async () => {
    // Arrange
    const username = 'Admin';
    const password = 'admin123';

    // Act
    await loginPage.login(username, password);

    // Assert
    const dashboardPage = new DashboardPage(page);
    expect(await dashboardPage.isDashboardLoaded()).toBeTruthy();
  });
});
```

---

## 🎯 Exercises for Practice

### Exercise 1: Modify Existing Test
File: `tests/login.spec.ts`

**Task**: Add a new test case for login with username only (no password)

```typescript
test('Login with username only', async () => {
  await loginPage.login('Admin', '');
  const isLoginPageVisible = await loginPage.isLoginPageLoaded();
  expect(isLoginPageVisible).toBeTruthy();
});
```

### Exercise 2: Add New Locator
File: `pages/LoginPage.ts`

**Task**: Add a locator for "Remember Me" checkbox

```typescript
readonly rememberMeCheckbox: Locator;

// In constructor:
this.rememberMeCheckbox = page.locator('input[type="checkbox"]');
```

### Exercise 3: Create New Method
File: `pages/LoginPage.ts`

**Task**: Add method to check "Remember Me" checkbox

```typescript
async checkRememberMe(): Promise<void> {
  await this.click(this.rememberMeCheckbox);
}
```

---

## 🆘 Troubleshooting

### Problem: "Cannot find module"
**Solution**: Run `npm install`

### Problem: "Browser not installed"
**Solution**: Run `npx playwright install`

### Problem: "Test timeout"
**Solution**: Increase timeout in `playwright.config.ts`

### Problem: "Element not found"
**Solution**: Check if locator is correct, add wait before action

---

## 📚 Additional Resources

- [Playwright Official Docs](https://playwright.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [OrangeHRM Demo Site](https://opensource-demo.orangehrmlive.com)

---

**Ready to Start? Run: `npm test` and watch the magic! ✨**
