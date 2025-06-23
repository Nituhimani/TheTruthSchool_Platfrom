#!/bin/bash
echo "🔧 Setting up git hooks..."

cat > .git/hooks/pre-commit << 'HOOK'
#!/bin/sh
echo "🔍 Running Biome checks..."

# Run Biome on all files (it's fast enough)
pnpm biome check --apply ./apps ./packages

# Check if any files were modified
if ! git diff --exit-code --quiet; then
  echo "✨ Biome fixed formatting issues. Please review and commit again."
  exit 1
fi

echo "✅ All checks passed!"
HOOK

chmod +x .git/hooks/pre-commit
echo "✅ Git hooks setup complete!"
