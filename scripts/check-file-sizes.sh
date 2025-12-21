#!/bin/bash
# File Size Check Script
# Enforces file size limits as defined in context-management.md

set -e

MAX_SPEC=500
MAX_DESIGN=1000
MAX_CODE=300
MAX_DOCS=800
MAX_ADR=200

ERRORS=0

# Function to check file size
check_file() {
    local file=$1
    local max_lines=$2
    local file_type=$3
    
    if [ ! -f "$file" ]; then
        return 0
    fi
    
    lines=$(wc -l < "$file" 2>/dev/null | tr -d ' ' || echo "0")
    
    if [ "$lines" -gt "$max_lines" ]; then
        echo "❌ $file_type file '$file' exceeds $max_lines lines ($lines lines)"
        echo "   Please split this file into smaller sections"
        ERRORS=$((ERRORS + 1))
        return 1
    fi
    
    return 0
}

echo "📏 Checking file sizes..."

# Check spec files
find docs/SPEC -name "*.md" -type f 2>/dev/null | while read file; do
    check_file "$file" $MAX_SPEC "Spec"
done

# Check design files
find docs/DESIGN -name "*.md" -type f ! -path "*/ADRs/*" 2>/dev/null | while read file; do
    check_file "$file" $MAX_DESIGN "Design"
done

# Check ADRs
find docs/DESIGN/ADRs -name "*.md" -type f 2>/dev/null | while read file; do
    check_file "$file" $MAX_ADR "ADR"
done

# Check core files
check_file "SPEC.md" $MAX_SPEC "Spec"
check_file "DESIGN.md" $MAX_DESIGN "Design"

# Check code files (if any exist)
find src -name "*.ts" -o -name "*.js" -o -name "*.py" 2>/dev/null | while read file; do
    check_file "$file" $MAX_CODE "Code"
done

# Check documentation files
find docs -name "*.md" -type f ! -path "*/SPEC/*" ! -path "*/DESIGN/*" 2>/dev/null | while read file; do
    check_file "$file" $MAX_DOCS "Documentation"
done

if [ $ERRORS -eq 0 ]; then
    echo "✅ All files are within size limits"
    exit 0
else
    echo ""
    echo "❌ Found $ERRORS file(s) exceeding size limits"
    echo "   See .steering/context-management.md for splitting strategies"
    exit 1
fi

