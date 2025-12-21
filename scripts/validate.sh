#!/bin/bash
# Project Validation Script
# Checks project health, file sizes, documentation, etc.

set -e  # Exit on error

echo "🔍 Validating project..."

ERRORS=0
WARNINGS=0

# File size limits
MAX_SPEC=500
MAX_DESIGN=1000
MAX_CODE=300
MAX_DOCS=800
MAX_ADR=200

# Check spec files
echo "📋 Checking spec files..."
find docs/SPEC -name "*.md" 2>/dev/null | while read file; do
    if [ -f "$file" ]; then
        lines=$(wc -l < "$file" | tr -d ' ')
        if [ $lines -gt $MAX_SPEC ]; then
            echo "❌ $file exceeds $MAX_SPEC lines ($lines lines)"
            ERRORS=$((ERRORS + 1))
        fi
    fi
done

# Check design files
echo "📐 Checking design files..."
find docs/DESIGN -name "*.md" 2>/dev/null | while read file; do
    if [ -f "$file" ]; then
        lines=$(wc -l < "$file" | tr -d ' ')
        if [ $lines -gt $MAX_DESIGN ]; then
            echo "❌ $file exceeds $MAX_DESIGN lines ($lines lines)"
            ERRORS=$((ERRORS + 1))
        fi
    fi
done

# Check ADRs
echo "📝 Checking ADRs..."
find docs/DESIGN/ADRs -name "*.md" 2>/dev/null | while read file; do
    if [ -f "$file" ]; then
        lines=$(wc -l < "$file" | tr -d ' ')
        if [ $lines -gt $MAX_ADR ]; then
            echo "⚠️  $file exceeds $MAX_ADR lines ($lines lines) - consider splitting"
            WARNINGS=$((WARNINGS + 1))
        fi
    fi
done

# Check core files
echo "📄 Checking core documentation files..."
if [ -f SPEC.md ]; then
    lines=$(wc -l < SPEC.md | tr -d ' ')
    if [ $lines -gt $MAX_SPEC ]; then
        echo "❌ SPEC.md exceeds $MAX_SPEC lines ($lines lines)"
        ERRORS=$((ERRORS + 1))
    fi
fi

if [ -f DESIGN.md ]; then
    lines=$(wc -l < DESIGN.md | tr -d ' ')
    if [ $lines -gt $MAX_DESIGN ]; then
        echo "❌ DESIGN.md exceeds $MAX_DESIGN lines ($lines lines)"
        ERRORS=$((ERRORS + 1))
    fi
fi

# Check for required files
echo "📚 Checking required files..."
REQUIRED_FILES=(
    "README.md"
    "SPEC.md"
    "DESIGN.md"
    "TODO.md"
    ".steering/principles.md"
    ".steering/ai-agent-rules.md"
    ".memory/context.md"
    ".memory/debug-log.md"
    ".diamond/project-state.json"
)

for file in "${REQUIRED_FILES[@]}"; do
    if [ ! -f "$file" ]; then
        echo "⚠️  Missing required file: $file"
        WARNINGS=$((WARNINGS + 1))
    fi
done

# Check project structure
echo "🏗️  Checking project structure..."
REQUIRED_DIRS=(
    "docs/SPEC"
    "docs/DESIGN/ADRs"
    "docs/MEMORY"
    ".steering"
    ".memory"
    ".diamond"
)

for dir in "${REQUIRED_DIRS[@]}"; do
    if [ ! -d "$dir" ]; then
        echo "⚠️  Missing required directory: $dir"
        WARNINGS=$((WARNINGS + 1))
    fi
done

# Summary
echo ""
echo "📊 Validation Summary:"
echo "   Errors: $ERRORS"
echo "   Warnings: $WARNINGS"

if [ $ERRORS -eq 0 ] && [ $WARNINGS -eq 0 ]; then
    echo "✅ All checks passed!"
    exit 0
elif [ $ERRORS -eq 0 ]; then
    echo "⚠️  Validation passed with warnings"
    exit 0
else
    echo "❌ Validation failed with $ERRORS error(s)"
    exit 1
fi

