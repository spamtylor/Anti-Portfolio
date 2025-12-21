#!/bin/bash
# Self-Healing Script
# Automatically fixes common issues and maintains project health

set -e  # Exit on error

echo "🔧 Running self-healing routines..."

# Check and fix file permissions
echo "🔐 Checking file permissions..."
chmod +x scripts/*.sh 2>/dev/null || true

# Check for outdated dependencies
if [ -f package.json ]; then
    echo "📦 Checking dependencies..."
    if command -v npm &> /dev/null; then
        npm outdated || echo "⚠️  Some dependencies are outdated. Run 'npm update' to update."
    fi
fi

# Validate project structure
echo "🏗️  Validating project structure..."
./scripts/validate.sh || {
    echo "⚠️  Validation issues found. Review output above."
}

# Update project state timestamp
if [ -f .diamond/project-state.json ]; then
    echo "💎 Updating project state..."
    # Update lastUpdated timestamp (requires jq or manual edit)
    if command -v jq &> /dev/null; then
        jq '.lastUpdated = now' .diamond/project-state.json > .diamond/project-state.json.tmp
        mv .diamond/project-state.json.tmp .diamond/project-state.json
    else
        echo "⚠️  jq not found. Install jq for automatic timestamp updates."
    fi
fi

# Check for common issues
echo "🔍 Checking for common issues..."

# Check for large files
echo "📏 Checking file sizes..."
find . -name "*.md" -type f ! -path "./node_modules/*" ! -path "./.git/*" | while read file; do
    lines=$(wc -l < "$file" 2>/dev/null | tr -d ' ' || echo "0")
    if [ "$lines" -gt 2000 ]; then
        echo "⚠️  Large file detected: $file ($lines lines) - consider splitting"
    fi
done

# Check for missing documentation
echo "📚 Checking documentation..."
if [ ! -f docs/GUIDES/getting-started.md ]; then
    echo "⚠️  Getting started guide missing. Consider creating it."
fi

# Health check summary
echo ""
echo "✅ Self-healing complete!"
echo ""
echo "Next steps:"
echo "1. Review any warnings above"
echo "2. Run './scripts/validate.sh' for detailed validation"
echo "3. Update .memory/context.md if significant changes made"

