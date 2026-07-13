#!/bin/bash

# Playwright OrangeHRM Automation Setup Script
# This script will set up the entire project

echo "🚀 Setting up Playwright OrangeHRM Automation Framework..."
echo ""

# Step 1: Check Node.js installation
echo "📦 Checking Node.js installation..."
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js v16 or higher."
    exit 1
fi

NODE_VERSION=$(node -v)
echo "✅ Node.js $NODE_VERSION is installed"
echo ""

# Step 2: Install NPM dependencies
echo "📦 Installing NPM dependencies..."
npm install
echo "✅ NPM dependencies installed"
echo ""

# Step 3: Install Playwright browsers
echo "🌐 Installing Playwright browsers..."
npx playwright install
echo "✅ Playwright browsers installed"
echo ""

# Step 4: Create necessary directories
echo "📁 Creating necessary directories..."
mkdir -p screenshots
mkdir -p videos
mkdir -p test-results
mkdir -p playwright-report
mkdir -p allure-results
mkdir -p allure-report
echo "✅ Directories created"
echo ""

# Step 5: Display next steps
echo "✨ Setup complete!"
echo ""
echo "🎯 Next Steps:"
echo "1. Run tests: npm test"
echo "2. Run in headed mode: npm run test:headed"
echo "3. Run in UI mode: npm run test:ui"
echo "4. View report: npm run report"
echo ""
echo "📚 For more information, check README.md"
echo ""
echo "Happy Testing! 🎉"
