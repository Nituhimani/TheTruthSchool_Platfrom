#!/bin/bash

# Development setup script for TheTruthSchool

echo "🚀 Setting up TheTruthSchool development environment..."

# Check if pnpm is installed
if ! command -v pnpm &> /dev/null; then
    echo "Installing pnpm..."
    npm install -g pnpm
fi

# Install dependencies
echo "📦 Installing dependencies..."
pnpm install

# Copy environment file
if [ ! -f .env ]; then
    echo "📄 Creating .env file from template..."
    cp .env.example .env
    echo "⚠️  Please update .env with your actual values"
fi

# Set up git hooks (optional)
echo "🔧 Setting up git hooks..."
npx husky install

echo "✅ Development environment setup complete!"
echo ""
echo "Next steps:"
echo "1. Update .env with your API keys"
echo "2. Start development: pnpm dev"
echo "3. Visit http://localhost:3000"