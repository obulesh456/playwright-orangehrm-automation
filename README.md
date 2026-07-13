# 🚀 Playwright OrangeHRM Automation Framework

A comprehensive test automation framework for OrangeHRM using Playwright and TypeScript, following industry best practices and enterprise-level design patterns.

## 📋 Table of Contents
- [Features](#features)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running Tests](#running-tests)
- [Reporting](#reporting)
- [Best Practices](#best-practices)

## ✨ Features

- ✅ **Page Object Model (POM)** design pattern
- ✅ **TypeScript** for type safety
- ✅ **Multiple Browser Support** (Chromium, Firefox, WebKit)
- ✅ **Parallel Test Execution**
- ✅ **HTML, JSON, JUnit Reports**
- ✅ **Allure Reporting Integration**
- ✅ **Screenshot on Failure**
- ✅ **Video Recording**
- ✅ **Environment Configuration** via .env
- ✅ **Retry Mechanism** for flaky tests
- ✅ **CI/CD Ready**

## 📁 Project Structure

```
playwright-orangehrm-automation/
├── pages/                      # Page Object Models
│   ├── BasePage.ts            # Base page with common methods
│   ├── LoginPage.ts           # Login page object
│   ├── DashboardPage.ts       # Dashboard page object
│   └── EmployeePage.ts        # Employee page object
├── tests/                      # Test specifications
│   ├── login.spec.ts          # Login test cases
│   ├── dashboard.spec.ts      # Dashboard test cases
│   └── employee.spec.ts       # Employee test cases
├── utils/                      # Utility functions
│   └── TestData.ts            # Test data management
├── test-results/              # Test execution results
├── playwright-report/         # HTML test reports
├── allure-results/            # Allure test results
├── allure-report/             # Allure HTML reports
├── screenshots/               # Screenshots on failure
├── videos/                    # Video recordings
├── .env                       # Environment variables
├── playwright.config.ts       # Playwright configuration
├── package.json               # NPM dependencies
├── tsconfig.json              # TypeScript configuration
└── README.md                  # Documentation
```

## 📦 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v16 or higher)
- **npm** or **yarn**
- **Git**

## 🛠️ Installation

### Step 1: Clone or Navigate to the Project

```bash
cd ~/RBMobileLatest/playwright-orangehrm-automation
```

### Step 2: Install Dependencies

```bash
npm install
```

### Step 3: Install Playwright Browsers

```bash
npx playwright install
```

OR

```bash
npm run install:browsers
```

## ⚙️ Configuration

### Environment Variables (.env)

Update the `.env` file with your configuration:

```env
BASE_URL=https://opensource-demo.orangehrmlive.com
USERNAME=Admin
PASSWORD=admin123
HEADLESS=false
BROWSER=chromium
```

### Playwright Configuration (playwright.config.ts)

Customize browser settings, timeouts, and reporters as needed.

## 🧪 Running Tests

### Run All Tests

```bash
npm test
```

### Run Tests in Headed Mode (See Browser)

```bash
npm run test:headed
```

### Run Tests in UI Mode (Interactive)

```bash
npm run test:ui
```

### Run Tests in Debug Mode

```bash
npm run test:debug
```

### Run Specific Test File

```bash
npm run test:login
npm run test:employee
```

### Run Tests on Specific Browser

```bash
npm run test:chrome
npm run test:firefox
npm run test:safari
```

### Run Tests on All Browsers

```bash
npm run test:all-browsers
```

### Run Tests with Tag

```bash
npx playwright test --grep @smoke
```

## 📊 Reporting

### HTML Report

```bash
npm run report
```

OR

```bash
npx playwright show-report
```

### Allure Report

Generate Allure report:

```bash
npm run allure:generate
```

Open Allure report:

```bash
npm run allure:open
```

## 📸 Screenshots and Videos

- **Screenshots**: Captured automatically on test failure in `screenshots/` folder
- **Videos**: Recorded on test failure in `videos/` folder

## 🎯 Best Practices Implemented

### 1. **Page Object Model (POM)**
- Separate page logic from test logic
- Reusable page methods
- Easy maintenance

### 2. **Base Page Class**
- Common methods in BasePage
- Reduces code duplication
- Centralized wait strategies

### 3. **Test Data Management**
- Centralized test data in TestData class
- Environment-based configuration
- Dynamic data generation

### 4. **Naming Conventions**
- Test cases: `TC001`, `TC002`, etc.
- Descriptive test names
- Clear test descriptions

### 5. **Error Handling**
- Try-catch blocks for critical operations
- Meaningful error messages
- Screenshot on failure

### 6. **Wait Strategies**
- Explicit waits instead of hard-coded sleeps
- Wait for element visibility
- Wait for navigation

## 📝 Test Cases Covered

### Login Module
- ✅ Valid login
- ✅ Invalid username
- ✅ Invalid password
- ✅ Empty credentials
- ✅ Logout functionality

### Dashboard Module
- ✅ Navigation to all modules
- ✅ User dropdown actions
- ✅ Dashboard elements verification

### Employee Module
- ✅ Add new employee
- ✅ Search employee
- ✅ Update employee
- ✅ Delete employee

## 🔧 Troubleshooting

### Issue: Browsers not installed
```bash
npx playwright install
```

### Issue: Tests failing due to timeout
Increase timeout in `playwright.config.ts`:
```typescript
timeout: 60 * 1000, // 60 seconds
```

### Issue: Cannot find module
```bash
npm install
```

## 🚀 CI/CD Integration

### GitHub Actions Example

Create `.github/workflows/playwright.yml`:

```yaml
name: Playwright Tests
on:
  push:
    branches: [ main, master ]
  pull_request:
    branches: [ main, master ]
jobs:
  test:
    timeout-minutes: 60
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v3
    - uses: actions/setup-node@v3
      with:
        node-version: 18
    - name: Install dependencies
      run: npm ci
    - name: Install Playwright Browsers
      run: npx playwright install --with-deps
    - name: Run Playwright tests
      run: npm test
    - uses: actions/upload-artifact@v3
      if: always()
      with:
        name: playwright-report
        path: playwright-report/
        retention-days: 30
```

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📧 Contact

- **Author**: Obulesu G
- **Email**: obuleshg@example.com

## 📄 License

This project is licensed under the MIT License.

---

**Happy Testing! 🎉**
