#!/bin/bash
# Project Setup Script
# Creates directory structure and initializes project files

set -e  # Exit on error

echo "🚀 Setting up project..."

# Create directory structure
echo "📁 Creating directory structure..."
mkdir -p docs/SPEC docs/DESIGN/ADRs docs/MEMORY docs/GUIDES
mkdir -p src/{server,tools,resources,prompts,utils}
mkdir -p tests/{unit,integration,fixtures}
mkdir -p .steering .memory .diamond .github/{workflows,ISSUE_TEMPLATE}

# Initialize .diamond files if they don't exist
if [ ! -f .diamond/project-state.json ]; then
    echo "💎 Initializing project state..."
    # File already created, but ensure it exists
    touch .diamond/project-state.json
fi

# Initialize .memory files if they don't exist
if [ ! -f .memory/context.md ]; then
    echo "🧠 Initializing memory files..."
    touch .memory/context.md
fi

if [ ! -f .memory/debug-log.md ]; then
    echo "📝 Initializing debug log..."
    touch .memory/debug-log.md
fi

# Check for required tools
echo "🔍 Checking prerequisites..."
command -v node >/dev/null 2>&1 || { echo "❌ Node.js not found. Please install Node.js 18+"; exit 1; }
command -v npm >/dev/null 2>&1 || { echo "❌ npm not found. Please install npm"; exit 1; }

# Install dependencies if package.json exists
if [ -f package.json ]; then
    echo "📦 Installing dependencies..."
    npm install
else
    echo "⚠️  No package.json found. Run 'npm init' if needed."
fi

# Set up git hooks (if .git exists)
if [ -d .git ]; then
    echo "🪝 Setting up git hooks..."
    # Add pre-commit hook for file size checking
    cat > .git/hooks/pre-commit << 'EOF'
#!/bin/bash
# Pre-commit hook to check file sizes
./scripts/check-file-sizes.sh
EOF
    chmod +x .git/hooks/pre-commit
fi

# Validate setup
echo "✅ Validating setup..."
./scripts/validate.sh || echo "⚠️  Validation found issues. Review and fix."

echo "✨ Setup complete!"
echo ""
echo "Next steps:"
echo "1. Review SPEC.md and fill in project details"
echo "2. Review DESIGN.md and fill in design details"
echo "3. Populate TODO.md with initial tasks"
echo "4. Update .memory/context.md with current state"
echo "5. Read .steering/ documents for guidelines"

